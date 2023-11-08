<template >

    <div >
        <span title="Редактировать" class="mr-2">
            <feather-icon icon="Edit3Icon" title="Редактировать" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="editReestrGosPoshlina" />
        </span>
        <span title="Удалить" class="mr-2">
            <feather-icon icon="Trash2Icon" title="Удалить" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
        </span>


    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapActions,mapGetters } from 'vuex'
    import r from '../../../route'
    import axios from '../../../axios'
    export default {
        name: 'Open',
        computed: {
            ...mapGetters([
                'User',
            ]),
        },
        methods: {
            ...mapActions([
                'getDataReestrsGosposhlina',



            ]),
            editReestrGosPoshlina(){
                this.$router.push('/gosposhlina_reestr/'+this.params.data.id)
            },

            confirmDeleteRecord () {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Удаление',
                    text: `Вы действительно хотите удалить реестр? `,
                    accept: this.deleteRecord,
                    acceptText: 'Удалить',
                    cancelText: 'Отмена'
                })
            },
            deleteRecord () {

                axios.get(r('SudPpReestr.index'), {
                    params: {
                        method: 'deleteReestr',
                        param:this.params.data.id
                    }
                }).then((value)=> {
                    this.getDataReestrsGosposhlina();

                    if(value){
                        this.showDeleteSuccess()
                    }
                    else{
                        this.showDeleteDanger()

                    }
                });

            },
            showDeleteSuccess () {
                this.$vs.notify({
                    color: 'success',
                    title: 'Сообщение',
                    text: 'Удален!!!',
                    position: 'top-center'
                })
            },
            showDeleteDanger () {
                this.$vs.notify({
                    color: 'danger',
                    title: 'Сообщение',
                    text: 'Удалить не удалось!!!',
                    position: 'top-center'
                })
            }
        }
    }
</script>
