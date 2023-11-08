<template>
    <div >

        <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
    </div>
</template>

<script>
    import r from '../../../route';
    import axios from '../../../axios'
    import { mapActions,mapGetters } from 'vuex'
    import { Trash2Icon,Edit3Icon } from 'vue-feather-icons'
    export default {
        components: {
            Trash2Icon,
            Edit3Icon,
        },
        computed:{
            ...mapGetters([
                'User'
            ])
        },
        methods: {
            ...mapActions([
                'getDataConditionVars'
            ]),
            editRecord () {
                this.params.edit(this.params.data.id)
            },
            confirmDeleteRecord () {
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
            deleteRecord () {
                axios.get(r("taskConditions.index"), {
                    params: {
                        method: 'deleteConditionVar',
                        param: this.params.value
                    }
                }).then((response) => {
                    if (response.data.result)
                        this.showDeleteSuccess()

                    else{
                        this.showDeleteDanger()
                    }
                    this.getDataConditionVars(this.$route.params.id)

                })
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
