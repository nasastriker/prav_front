<template>
    <div >
        <span title="Редактировать" class="mr-2">
            <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 hover:text-primary cursor-pointer" @click="editRecord" />
        </span>
        <span title="Удалить">
            <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
        </span>
    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../route';
    import axios from '../../../axios'
    import { mapActions,mapGetters } from 'vuex'
    import { Trash2Icon,Edit3Icon,ArchiveIcon } from 'vue-feather-icons'
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
                'getDataCorrespondence'


            ]),
            editRecord () {
                this.$router.push(`/Correspondence-Journal/`+this.params.value).catch(() => {})

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
                axios.get(r("correspondence.index"), {
                    params: {
                        method: 'deleteCorrespondence',
                        param: this.params.value

                    }
                }).then((response) => {
                    if (response.data.result)
                        this.showDeleteSuccess()

                    else{
                        this.showDeleteDanger()
                    }
                    this.getDataCorrespondence(this.User.pag.correspondence)

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
