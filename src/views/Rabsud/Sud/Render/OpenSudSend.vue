<template>
    <div >


        <template v-if="User.email=='amitx@list.ru'">

            <feather-icon icon="RefreshCwIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="refresh" />
            <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
        </template>


    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../../route';
    import axios from '../../../../axios';
    import { mapActions,mapGetters } from 'vuex'
    export default {
        data () {
            return {
                showDos:false,
            }
        },

        computed: {



            ...mapGetters([
                'User'

            ]),


        },
        methods: {
            confirmDeleteRecord(){
                this.$vs.loading({color: '#ff8000'})
                axios.delete(r("archSud.index")+'/'+this.params.value).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){
                        this.getDataArchSuds();
                        this.$vs.notify({  title:'Сообщение', text: 'Удаление выполнено успешно!!!', color: 'success', position: 'top-center' })
                        //  this.debtor=response.data.data
                    }else {
                        this.$vs.notify({  title:'Сообщение', text: 'Удаление не выполнено !!!', color: 'danger', position: 'top-center' })
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
            ...mapActions([
                'deleteShablonDocument','getDataArchSuds'



            ]),
            refresh(){
                if(this.params.data.isk){
                    this.refreshIsk()
                }
                else{
                    this.refreshSud()
                }


            },
            refreshIsk(){
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("archIsk.index"), {
                    params: {
                        method: 'refreshIsk',
                        param: this.params.value

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){

                        this.$vs.notify({  title:'Сообщение', text: 'Обновление выполнено успешно!!!', color: 'success', position: 'top-center' })
                        //  this.debtor=response.data.data
                    }else {
                        this.$vs.notify({  title:'Сообщение', text: 'Обновление не выполнено !!!', color: 'danger', position: 'top-center' })
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
            refreshSud(){
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("archSud.index"), {
                    params: {
                        method: 'refreshSud',
                        param: this.params.value

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){

                        this.$vs.notify({  title:'Сообщение', text: 'Обновление выполнено успешно!!!', color: 'success', position: 'top-center' })
                        //  this.debtor=response.data.data
                    }else {
                        this.$vs.notify({  title:'Сообщение', text: 'Обновление не выполнено !!!', color: 'danger', position: 'top-center' })
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
            downloadDocument(){
                axios.get(r("archSud.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getArch',
                        param:this.params.value
                    }
                }).then((response) => {


                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/zip;charset=UTF-8;' }));

                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', this.params.data.arch_name+'.zip');
                    document.body.appendChild(link);
                    link.click();
                    this.getDataArchSuds();


                }).catch(error => {
                    this.$vs.loading.close()
                    //   this.popupActive3=false;
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });
            },


        }
    }
</script>
