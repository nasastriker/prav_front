<template>
    <div >

        <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />

    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../../route';
    import axios from '../../../../axios'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        name: 'OpenLink',
        methods: {
            ...mapActions([
                'getDadataSettingsArr'


            ]),
            editRecord () {
                this.params.editValue(this.params.value)
                this.getDadataSettingsArr()
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
                axios.get(r("dadata.index"), {
                    params: {
                        method: 'deleteDadataSettings',
                        param: this.params.value

                    }
                }).then((response) => {
                    if (response.data.result)
                        this.showDeleteSuccess()
                    else{
                        this.showDeleteDanger()
                    }
                    this.getDadataSettingsArr()

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
