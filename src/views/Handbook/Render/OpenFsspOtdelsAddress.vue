<template>
    <div >

        <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />

    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../route';
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    export default {
     //   name: 'OpenLink',
        computed: {

            ...mapGetters([
                'ShowTabFsspAddress'
            ]),


        },
        methods: {
            ...mapMutations([
                'setShowTabFsspAddress','setEditFsspAddress'



            ]),
            ...mapActions([
                'deleteFsspOtdelsAddress',



            ]),
            editRecord () {
                this.setShowTabFsspAddress(true);
                this.setEditFsspAddress(this.params.value)

                /*
                 Below line will be sssfor actual product
                 Currently it's commented due to demo purpose - Above url is for demo purpose

                 this.$router.push("/apps/user/user-edit/" + this.params.data.id).catch(() => {})
                 */
            },
            confirmDeleteRecord () {
                this.deleteRecord()
            },
            deleteRecord () {

                /* Below two lines are just for demo purpose */
                this.deleteFsspOtdelsAddress(this.params.value).then((value)=> {
                    if(value){
                        this.showDeleteSuccess()
                    }
                    else{
                        this.showDeleteDanger()

                    }
                });


                /* UnComment below lines for enabling true flow if deleting user */
                // this.$store.dispatch("userManagement/removeRecord", this.params.data.id)
                //   .then(()   => { this.showDeleteSuccess() })
                //   .catch(err => { console.error(err)       })
            },
            showDeleteSuccess () {
                this.$vs.notify({
                    color: 'success',
                    title: 'Сообщение',
                    text: 'Адрес удален!!!',
                    position: 'top-center'
                })
            },
            showDeleteDanger () {
                this.$vs.notify({
                    color: 'danger',
                    title: 'Сообщение',
                    text: 'Адрес удалить не удалось!!!',
                    position: 'top-center'
                })
            }
        }
    }
</script>
