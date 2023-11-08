<template>
    <div>
        <template v-for="item in settings">
            <div class="vx-row" style="margin-bottom: 10px">
                <span style="margin-left: 20px;margin-right: 10px;margin-top: 10px; color: #0e84b5">{{item.name}}</span>

                <v-select  class="w-50 " style="margin-bottom: 10px;width:200px" :reduce="label => label.id" label="name" :options="OrganizationList"   v-model="item.value" @input="changeSetting" ></v-select>

            </div>
        </template>
        <div style="height: 100px">

        </div>
    </div>
</template>

<script>
    import axios from '../../axios'
    import r from '../../route'
    import vSelect from 'vue-select'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        components: { vSelect,
        },
        data(){
            return{
                settings:[],
            }
        },

        computed:{
            ...mapGetters([
                'OrganizationList',
            ]),
        },
        mounted(){
            this.getOrganizationList()
            axios.get(r('organization.index'), {
                params: {
                    method: 'getRequestEDOSettings',
                    param: this.$route.params.id
                }
            }).then(res=>{
                if(res.data.result){
                    this.settings=res.data.data
                }
            })
        },
        methods:{

            ...mapActions([
                'getOrganizationList',
            ]),
            changeSetting(){
                this.$vs.loading({ color: '#ff8000' })
                axios.post(r('organization.update'), {
                    params: {
                        method: 'saveRequestEDOSettings',
                        param: this.settings
                    }
                }).then(res=>{
                    if(res.data.result){
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Успешно!!!',
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
                    this.$vs.loading.close()
                }).catch(e=>{
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Ошибка !!!',
                        color: 'danger',
                        position: 'top-center'
                    })
                    this.$vs.loading.close()
                })
            }
        },
    }
</script>

<style scoped>

</style>