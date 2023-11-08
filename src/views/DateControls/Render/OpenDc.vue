<template>
    <div >
      <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="questDelete" />
      <feather-icon icon="PlayIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="startDateControl" />
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        data () {
            return {
            }
        },

        computed: {
        },
        methods: {
          startDateControl(){
            this.$vs.dialog({
              type: 'confirm',
              color: 'green',
              title: 'Запуск '+this.params.data.name,
              text: 'Вы действительно хотите запустить '+this.params.data.name+'?',
              accept: ()=>{
                this.startOneDateControl(this.params.value).then((response)=>{
                  if (response.result){
                    this.$vs.notify({
                      color: 'success',
                      title: 'Запуск '+this.params.data.name,
                      text: this.params.data.name+' запущен',
                      position: 'top-center'
                    })
                  }
                  else{
                    this.$vs.notify({
                      color: 'danger',
                      title: 'Запуск '+this.params.data.name,
                      text: 'Запустить НЕ получилось!!!',
                      position: 'top-center'
                    })
                  }
                }).catch(()=>{
                  this.$vs.notify({
                    color: 'error',
                    title: 'Запуск '+this.params.data.name,
                    text: 'ОШИБКА!!!',
                    position: 'top-center'
                  })
                })
              },
              acceptText: 'Запуск',
              cancelText: 'Отмена'
            })
          },

          questDelete(){
            this.$vs.dialog({
              type: 'confirm',
              color: 'red',
              title: 'Удаление '+this.params.data.name,
              text: 'Вы действительно хотите удалить '+this.params.data.name+'?',
              accept: ()=>{
                this.deleteDateControl(this.params.value).then((response) => {
                  if (response){
                    this.$vs.notify({  title:'Сообщение', text: 'Удаление выполнено успешно!!!', color: 'success', position: 'top-center' })
                  }else {
                    this.$vs.notify({  title:'Сообщение', text: 'Удаление не выполнено !!!', color: 'danger', position: 'top-center' })
                  }
                }).catch(error => {
                  this.$vs.notify({
                    title: 'Ошибка',
                    text: error.message,
                    color: 'danger',
                    position: 'top-center'
                  })
                });
              },
              acceptText: 'Удалить',
              cancelText: 'Отмена'
            })
          },

            ...mapActions([
                'deleteDateControl','startOneDateControl'
            ]),
        }
    }
</script>
