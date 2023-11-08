<template>
    <div>
      <feather-icon icon="DownloadCloudIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer"
                    @click="downloadDocument"/>
      <span title="Просмотреть содержимое реестра ПП">
        <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />
      </span>
      <span title="Удалить реестр ПП, можно только на статусе Загружен, или Ошибка">
       <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
      </span>
      <span v-if="User.email=='amitx@list.ru'">
            <feather-icon icon="XCircleIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="showError" />
        </span>
    </div>
</template>

<script>
    import r from '@/route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from "@/axios";
    export default {
      name: 'OpenLink',
      computed: {
        ...mapGetters([
          'User'

        ]),
      },
      methods: {
        ...mapActions([
          'deleteReestrPayment',
        ]),
        showError() {
          this.params.showPop(this.params.data.error);

        },
        editRecord() {
          this.$router.push(`/payment_reestr/` + this.params.value).catch(() => {
          })

        },
        confirmDeleteRecord() {
          this.$vs.dialog({
            type: 'confirm',
            color: 'danger',
            title: 'Удаление',
            text: `Вы действительно хотите удалить? `,
            accept: this.deleteRecord,
            acceptText: 'Удалить',
            cancelText: 'Отмена'
          })
        },
        downloadDocument() {
          this.$vs.loading({color: '#ff8000'})
          axios.get(r("reestrPayment.index"), {
            responseType: 'arraybuffer',
            params: {
              method: 'getOneReestr',
              param: this.params.value
            }
          }).then((response) => {
            this.$vs.loading.close()
            if (response) {

              const url = window.URL.createObjectURL(new File([(response.data)], {type: 'application/xls;charset=UTF-8;'}));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', this.params.data.file);
              document.body.appendChild(link);
              link.click();
            } else {
              this.$vs.notify({
                title: 'Ошибка',
                text: error.message,
                color: 'danger',
                position: 'top-center'
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
        deleteRecord() {
          this.deleteReestrPayment(this.params.value).then((value) => {
            this.$vs.notify({
              color: 'success',
              title: 'Сообщение',
              text: value.mess,
              position: 'top-center'
            })
          });

        },

      }
    }
</script>
