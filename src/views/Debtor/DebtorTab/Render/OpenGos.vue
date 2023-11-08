<template >

    <div >

        <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="editGosPoshlina" />
        <feather-icon icon="PrinterIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="printGosPoshlina" />
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
        <feather-icon icon="FileTextIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="printFns" />
      <feather-icon icon="DatabaseIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="clone" />

    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapActions,mapGetters } from 'vuex'
    import r from '../../../../route'
    import axios from '../../../../axios'
    import { Trash2Icon,Edit3Icon,ArchiveIcon } from 'vue-feather-icons'
    export default {
        name: 'Open',
        components: {
            Trash2Icon,
            Edit3Icon,
            ArchiveIcon,
        },
        methods: {
            ...mapActions([
                'deleteSudPps','getDataDebtorsById','getDataSudPps','printSudPGosPoshlina','cloneSudPps'



            ]),
            clone(){
              let id_credit=this.params.data.id_debcredit
              this.cloneSudPps(this.params.value).then((value)=> {
                this.getDataDebtorsById(id_credit)
                this.getDataSudPps(id_credit)

                if(value){
                }
                else{

                }
              });
            },
            printFns(){
                this.$vs.loading({color: '#ff8000'})

                axios.get(r("sudPp.index"), {
                    responseType: 'arraybuffer',
                    params: {
                        method: 'printFnsGosPoshlina',
                        param: this.params.data.id

                    }
                }).then((response) => {
                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/zip;charset=UTF-8;' }))

                    let filename=response.headers['content-disposition'].replace('attachment; filename=', ' ')

                    filename = filename.split('; filename*=utf')[0]
                    const link = document.createElement('a')
                    link.href = url
                    link.setAttribute('download', filename)
                    document.body.appendChild(link)
                    link.click()

                    this.$vs.loading.close()


                }).catch(error => {
                    this.$vs.loading.close()
                    //   this.popupActive3=false;
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'

                    })
                })

            },
            editGosPoshlina(){
                this.params.editGosPoshlina(this.params.data)
              //  console.log(this.params.data)
            },
            printGosPoshlina(){
                this.$vs.loading({color: '#ff8000'})

                axios.get(r("sudPp.index"), {
                    responseType: 'arraybuffer',
                    params: {
                        method: 'printSudPGosPoshlina',
                        param: this.params.data.id

                    }
                }).then((response) => {
                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/zip;charset=UTF-8;' }))

                    let filename=response.headers['content-disposition'].replace('attachment; filename=', '')

                    filename = filename.split('; filename*=utf')[0]
                    const link = document.createElement('a')
                    link.href = url
                    link.setAttribute('download', filename)
                    console.log(filename)
                    document.body.appendChild(link)
                    link.click()

                    this.$vs.loading.close()


                }).catch(error => {
                    this.$vs.loading.close()
                    //   this.popupActive3=false;
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'

                    })
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
                let id_credit=this.params.data.id_debcredit
                /* Below two lines are just for demo purpose */
                this.deleteSudPps(this.params.value).then((value)=> {
                    this.getDataDebtorsById(id_credit)
                    this.getDataSudPps(id_credit)

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
