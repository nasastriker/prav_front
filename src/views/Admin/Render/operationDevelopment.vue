<template>
    <div >

        <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
        <ArchiveIcon v-if="params.arcCheck" size="1.5x" class="hover:text-primary cursor-pointer" @click="SendToArchive"></ArchiveIcon>
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
            ArchiveIcon,
        },
        computed:{
            ...mapGetters([
                'User'
            ])
        },

        methods: {
            ...mapActions([
            'getDevelopmentArr'


            ]),
            editRecord () {
                this.$router.push(`/development/`+this.params.value).catch(() => {})

            },
            SendToArchive(){
                axios.get(r("development.index"), {
                    params: {
                        method: 'sendToArchive',
                        param: this.params.value

                    }
                }).then((response) => {
                    if (response.data.result)
                        this.$vs.notify({
                            color: 'success',
                            title: 'Сообщение',
                            text: 'Отправлено в архив',
                            position: 'top-center'
                        })
                    else{
                        this.this.$vs.notify({
                            color: 'danger',
                            title: 'Сообщение',
                            text: 'Не удалось!!!',
                            position: 'top-center'
                        })()
                    }
                    this.getDevelopmentArr(this.User.pag.development)

                })
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
                axios.get(r("development.index"), {
                    params: {
                        method: 'deleteDevelopment',
                        param: this.params.value

                    }
                }).then((response) => {
                    if (response.data.result)
                            this.showDeleteSuccess()
                        else{
                            this.showDeleteDanger()
                        }
                    this.getDevelopmentArr()

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
