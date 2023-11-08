<template>
    <div >
        <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />

    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        name: 'OpenLink',
        methods: {
            ...mapActions([
                'deletePochtaSettings',
            ]),
            editRecord () {
                this.$router.push(`/adm/pochtaSettings/`+this.params.value).catch(() => {})
            },
            confirmDeleteRecord () {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Удаление',
                    text: `Вы действительно настройки? `,
                    accept: this.deleteRecord,
                    acceptText: 'Удалить',
                    cancelText: 'Отмена'
                })
            },
            deleteRecord () {
                this.deletePochtaSettings(this.params.value).then((value)=> {
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
                    title: 'Настройки почты России',
                    text: 'Настройки удалены!!!',
                    position: 'top-center'
                })
            },
            showDeleteDanger () {
                this.$vs.notify({
                    color: 'danger',
                    title: 'Настройки почты России',
                    text: 'Настройки удалить не удалось!!!',
                    position: 'top-center'
                })
            }
        }
    }
</script>
