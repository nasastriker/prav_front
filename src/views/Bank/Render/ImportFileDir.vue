<template>
<span>
      <feather-icon icon="ArrowUpCircleIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer"
                    @click="goImport"/>
    <input type="file" ref="fileDirInput" class="hidden" accept=".xlsx, .xls" @change="changeFileDir($event)">
    <vs-popup classContent="popup-example" title="Загрузить ответа банка" :active.sync="showAns">


            <vs-row vs-type="flex" vs-justify="center">

                <vs-button color="primary" type="filled"  @click="saveReturn">Нет ответа</vs-button>

                <vs-button color="success" type="filled" style="margin-left: 50px " @click="goImportStart">Загрузить</vs-button>

            </vs-row>



        </vs-popup>
</span>

</template>

<script>
import {mapActions} from 'vuex'
import axios from "@/axios";
import r from "@/route";

export default {
    components: {
    },
    props: {
        dataid: {},
        chekNo:false,
        onSuccess: {
            type: Function,
            required: true
        },
        dir:''
    },
    data() {
        return {
            id_recover: 0,
            status: 2,
            showAns:false,
            count: 1,
            dirFileData: {
                id_recover: 0,
                results: [],
                status: 0
            }
        }
    },
    computed: {},
    mounted() {

    },
    methods: {
      saveReturn(){
        this.showAns=false
        this.$vs.loading({color: '#ff8000'})

        axios.post(r("archBank.index"), {
          params: {
            method: 'exportDataNoAnswer',
            param: this.dataid

          }
        }).then((response) => {
          this.$vs.loading.close()
          if (response.data.result){
            this.getDataArchBanks()
            this.$vs.notify({  title:'Сообщение', text: 'Импорт выполнен успешно!!!', color: 'success', position: 'top-center' })
            //  this.debtor=response.data.data
          }else {
            this.$vs.notify({  title:'Сообщение', text: 'Импорт не выполнен !!!', color: 'danger', position: 'top-center' })

          }

          this.showAns=false


        }).catch(error => {
          this.showAns=false
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Ошибка',
            text: error.message,
            color: 'danger',
            position: 'top-center'
          })

        });
      },
        ...mapActions([
            'getDataArchBanks', 'saveFileForImportServDir'
        ]),
        goImportStart() {
            this.$refs.fileDirInput.click()

        },
        goImport() {
          if(!this.chekNo){
            this.goImportStart()
          }else{
            this.showAns=true
          }

        },
        changeFileDir(evt) {
            this.saveFileForImportServDir({files: evt.target.files, dir: this.dir}).then((response) => {
                if (response.result) {
                    this.generateData(response)
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
          this.$refs['fileDirInput'].value = null
        },
        generateData (response) {
            this.dirFileData.results = response
            this.dirFileData.id_recover = this.id_recover;
            this.dirFileData.status = this.status;
            if (this.onSuccess) this.onSuccess(this.dirFileData)
        },
    }
}
</script>
<style lang="scss">

.vs-popup--content {
    min-height: 100px !important;
    margin-top: 20px;
}

.dropdown-button-container {
    display: flex;
    align-items: center;

    .btnx {
        border-radius: 5px 0px 0px 5px;
    }

    .btn-drop {
        border-radius: 0px 5px 5px 0px;
        border-left: 1px solid rgba(255, 255, 255, .2);
    }
}
</style>
