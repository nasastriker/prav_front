<template>
    <div >
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
        <template v-if="this.params.data.error">
            <feather-icon  icon="AlertCircleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="showError=!showError" />
            <vs-popup classContent="popup-example" title="Ошибка" :active.sync="showError">
                <vs-textarea class="w-100" height="600px" v-model="this.params.data.error" > </vs-textarea>
            </vs-popup>
        </template>

    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../route';
    import axios from '../../../axios'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        data () {

            return {

                showError:false,




            }
        },

        methods: {
            ...mapActions([
                'getDataImportTasks'



            ]),

            confirmDeleteRecord () {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Удаление',
                    text: 'Вы действительно хотите удалить импорт?',
                    accept: this.deleteRecord,
                    acceptText: 'Удалить',
                    cancelText: 'Отмена'
                })
            },
            deleteRecord () {

                axios.post(r("importTask.update"), {
                    params: {
                        method: 'deleteFiles',
                        param:this.params.value

                    }
                }).then((response) => {
                    if (response.data.result){

                        this.$vs.notify({  title:'Сообщение', text: 'Выполнено!!!', color: 'success', position: 'top-center' })
                        this.getDataImportTasks()

                    }else {
                        this.$vs.notify({  title:'Сообщение', text: 'Ошибка!!!', color: 'danger', position: 'top-center' })
                        this.getDataImportTasks()
                    }
                }).catch(error => {
                    this.getDataImportTasks()
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
