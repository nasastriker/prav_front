<template>
    <div>
        <feather-icon title="Скачать" icon="DownloadCloudIcon" svgClasses="h-5 w-5 mr-2 hover:text-primary cursor-pointer"
                      @click="downloadDocument"/>
        <template v-if="params.data.bank==='pochta_bank'">
            <ImportTxtFile title="Загрузить файл ответа банка"  :onSuccess="loadDataTxtFileInTable" :dataid="params.data"></ImportTxtFile>
        </template>
        <template v-else-if="params.data.bank==='alfa'">
            <ImportFileDir title="Загрузить файл ответа банка" :onSuccess="loadDataTxtFileInTable" :dataid="params.data" :dir="'app/answer_alfa/'"></ImportFileDir>
        </template>
        <template v-else-if="params.data.bank==='uralsib'">
            <ImportFileDir title="Загрузить файл ответа банка" :onSuccess="loadDataTxtFileInTable" :dataid="params.data" :dir="'app/answer_uralsib/'"></ImportFileDir>
        </template>
        <template v-else-if="params.data.bank==='yoomoney'">
          <ImportFileDir title="Загрузить файл ответа банка" :onSuccess="loadDataTxtFileInTable" :chekNo="true" :dataid="params.data" :dir="'app/answer_yoomoney/'"></ImportFileDir>
        </template>
        <template v-else>
            <ImportExcel title="Загрузить файл ответа банка" :onSuccess="loadDataInTable" :dataid="params.data"></ImportExcel>
        </template>
      <feather-icon style="margin-left: -5px;" icon="CompassIcon" svgClasses="h-5 w-5 mr-2 hover:text-danger cursor-pointer"
                    @click="$router.push('/bank/sber_alfa/'+params.value)"/>

      <feather-icon title="Удалить" icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer"
                    @click="confirmDeleteRecord"/>


    </div>


</template>

<script>
import Vue from 'vue'
import r from '../../../route';
import axios from '../../../axios';
import {mapActions, mapGetters} from 'vuex'
import ImportExcel from './ImportExcel.vue'
import ImportTxtFile from './ImportTxtFile.vue'
import ImportFileDir from "./ImportFileDir.vue";

export default {
    components: {

        ImportExcel,ImportTxtFile,ImportFileDir

    },
    computed: {


        ...mapGetters([
            'User'

        ]),


    },
    methods: {

        confirmDeleteRecord() {
            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: 'Удаление',
                text: `Будет удален только файл никаких изменений в заемщиках не произойдет. Вы действительно хотите удалить ? `,
                accept: this.deleteRecord,
                acceptText: 'Удалить',
                cancelText: 'Отмена'
            })
        },
        deleteRecord() {
            /* Below two lines are just for demo purpose */
            this.deleteArchBank(this.params.value).then((value) => {
                 this.getDataArchBanks(this.User.pag.bankArch);

            });


        },
        loadDataInTable({results, header, meta, name, id_recover, status}) {
            this.$vs.loading({color: '#ff8000'})
            this.header = header

            // console.log(this.header);
            this.tableData = results
            this.sheetName = meta.sheetName
            // console.log(this.sheetName);
            this.exportData(results, name, id_recover, status)
            this.$vs.loading.close()

        },
        loadDataTxtFileInTable({results, id_recover, status}) {
            this.$vs.loading({color: '#ff8000'})
            this.exportData(results, '', id_recover, status)
            this.$vs.loading.close()
        },
        exportData(data, name, id_recover, status) {
            this.$vs.loading({color: '#ff8000'})

            axios.post(r("archBank.index"), {
                params: {
                    method: 'exportData',
                    param: {data: data, name: name, id_file: this.params.value, status: status}

                }
            }).then((response) => {
                this.$vs.loading.close()
                if (response.data.result) {
                  this.getDataArchBanks(this.User.pag.bankArch);
                    this.$vs.notify({
                        title: 'Сообщение',
                        text: 'Импорт выполнен успешно!!!',
                        color: 'success',
                        position: 'top-center'
                    })
                    //  this.debtor=response.data.data
                } else {
                    this.$vs.dialog({
                        title: 'Ошибка при загрузке',
                        text: response.data.err_mess,
                        color: 'danger',
                        accept: this.acceptError,
                        acceptText: 'OK'
                    })
                }


            }).catch(error => {
                this.$vs.loading.close()
                this.$vs.notify({
                    title: 'Ошибка',
                    text: error.message,
                    color: 'danger',
                    position: 'top-center'
                })

            });
        },
        acceptError() {

        },
        ...mapActions([
            'getDataArchBanks', 'deleteArchBank',


        ]),
        downloadDocument() {
            let url='download/sber_alfa/'+this.params.data.arch_name
            axios.get(url, { responseType: 'blob' })
                .then(response => {
                    const blob = new Blob([response.data], { type: 'application/xls' })
                    const link = document.createElement('a')
                    link.href = URL.createObjectURL(blob)
                    link.download = this.params.data.arch_name
                    link.click()
                    URL.revokeObjectURL(link.href)
                }).catch(console.error)


        },


    }
}
</script>
