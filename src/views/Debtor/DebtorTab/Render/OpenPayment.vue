<template>
    <div >


        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
        <feather-icon icon="InfoIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="showInfoPayment" />

        <vs-popup classContent="popup-example" title="Информация по платежу по договору займа" :active.sync="popupActiveInfoPayment">
            <h4><b>ID Реестра:</b> {{ reestr_info.id_reestr }}</h4>
            <h4 style="margin-top: 5px"><b>Реестр:</b> {{ reestr_info.reestr_name }}</h4>
            <h4 style="margin-top: 5px"><b>Дата реестра:</b> {{ reestr_info.reestr_date }}</h4>
        </vs-popup>

    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        name: 'OpenLink',
        data () {
            return {
                popupActiveInfoPayment: false,
                reestr_info: {}
            }
        },
        methods: {
            ...mapActions([
                'delPayment',
                'getInfoPayment'


            ]),
            showInfoPayment(){
                this.getInfoPayment(this.params.value).then((response)=> {
                    if (response.result){
                        this.reestr_info = response.reestr;
                        this.popupActiveInfoPayment = true;
                    }
                });
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
                /* Below two lines are just for demo purpose */
                this.delPayment(this.params.value).then((value)=> {
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
