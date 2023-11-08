<template>
  <div>
    <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />


  </div>
</template>

<script>

    import axios from "@/axios";
    import r from "@/route";

    export default {
        data () {
            return {
            }
        },

        computed: {

        },
        methods: {
          deleteOnly(){
            this.$vs.loading({color: '#ff8000'})
            axios.post(r("archSud.update"), {
              params: {
                method: 'deleteFromReestr',
                param: this.params.value
              }
            }).then((response) => {
              this.$vs.loading.close()
              if (response.data.result){
                this.params.update();

                this.$vs.notify({  title:'Сообщение', text: 'Удалено!!!', color: 'success', position: 'top-center' })
              }else {
                this.$vs.notify({  title:'Сообщение', text: 'Удалить не удалось !!!', color: 'danger', position: 'top-center' })
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
          confirmDeleteRecord(){
            this.$vs.dialog({
              type: 'confirm',
              color: 'primary',
              title: 'Удаление',
              text: `Вы действительно хотите удалить заемщика из архива, статус и данные изменены не будут? `,
              accept: this.deleteOnly,
              acceptText: 'Да',
              cancelText: 'Нет'
            })
          },
        }
    }
</script>
<style>


</style>