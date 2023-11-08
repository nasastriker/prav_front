<template>
    <div >
            <vs-checkbox style="margin-bottom: 15px" v-model="stat"  >автоматически </vs-checkbox>
    </div>
</template>

<script>
    import r from '@/route';
    import axios from '@/axios';
    import { mapActions,mapGetters } from 'vuex'
    export default {
        data () {
            return {

                showDos:false,
            }
        },

        computed: {

            stat: {
                get() { return this.params.value; },
                set(value) { this.saveSoglashenieStatus(value); },
            },
            ...mapGetters([
                'User'

            ]),
        },
        methods: {
          saveSoglashenieStatus(){
            let data=this.params.data
            axios.post(r('sogl.update'), {
              params: {
                method: 'saveSoglashenieStatus',
                param: {id_credit:data.id_credit,sogl:data}
              }
            }).then(res=>{
              if(res.data.result){
                this.$vs.notify({
                  title: 'Успешно!',
                  text: 'Статус обновлен',
                  color: 'success',
                  position: 'top-center'
                })
              }
              else{
                this.$vs.notify({
                  title: 'Ошибка',
                  text: 'Ошибка !!!',
                  color: 'danger',
                  position: 'top-center'
                })
              }
            }).catch(e=>{
              this.$vs.notify({
                title: 'Ошибка',
                text: 'Ошибка !!!',
                color: 'danger',
                position: 'top-center'
              })
            })
          },

            ...mapActions([
            ]),




        }
    }
</script>
