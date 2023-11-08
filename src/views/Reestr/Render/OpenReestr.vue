<template>
    <div>
        <feather-icon icon="DownloadCloudIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer"
                      @click="downloadDocument"/>

        <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />

    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from "@/axios";
    export default {
        name: 'OpenLink',
        methods: {
            ...mapActions([
                'deleteReestr',



            ]),
            editRecord () {
                this.$router.push(`/reestr/`+this.params.value).catch(() => {})

                /*
                 Below line will be sssfor actual product
                 Currently it's commented due to demo purpose - Above url is for demo purpose

                 this.$router.push("/apps/user/user-edit/" + this.params.data.id).catch(() => {})
                 */
            },
            confirmDeleteRecord () {
                if(this.params.data.id_status!=2){

                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Ошибка удалить нельзя реестр не загружен полностью',
                        color: 'danger',
                        position: 'top-center'
                    })
                }else {
                    this.$vs.dialog({
                        type: 'confirm',
                        color: 'danger',
                        title: 'Удаление',
                        text: `Вы действительно хотите удалить? `,
                        accept: this.deleteRecord,
                        acceptText: 'Удалить',
                        cancelText: 'Отмена'
                    })
                }


            },
            deleteRecord () {
                /* Below two lines are just for demo purpose */
                this.$vs.loading({color: '#ff8000'})
                this.deleteReestr(this.params.value).then((value)=> {
                    this.$vs.loading.close()
                  if(value){
                      this.showDeleteSuccess()
                  }
                  else{
                      this.showDeleteDanger()

                  }
                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });

            },
            downloadDocument(){
              this.$vs.loading({color: '#ff8000'})
              axios.get(r("reestr.index"), {
                responseType: 'arraybuffer',
                params: {
                  method: 'getOneReestr',
                  param:this.params.value
                }
              }).then((response) => {
                this.$vs.loading.close()
                if(response){

                  const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/xls;charset=UTF-8;' }));
                  //   console.log(response.headers);
                  //  let filename=response.headers['content-disposition'].replace('attachment; filename=', '');
                  //  console.log(filename);
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', this.params.data.filename);
                  document.body.appendChild(link);
                  link.click();
                }
                else{

                  //   this.popupActive3=false;
                  this.$vs.notify({
                    title: 'Ошибка',
                    text: error.message,
                    color: 'danger',
                    position: 'top-center'
                  })
                }
              }).catch(error => {
                this.$vs.loading.close()
                //   this.popupActive3=false;
                this.$vs.notify({
                  title: 'Ошибка',
                  text: error.message,
                  color: 'danger',
                  position: 'top-center'
                })
              });
            },
            // downloadDocument() {
            //     let url='download/reestr/'+this.params.data.filename
            //     axios.get(url, { responseType: 'blob' })
            //         .then(response => {
            //             const blob = new Blob([response.data], { type: 'application/xls' })
            //             const link = document.createElement('a')
            //             link.href = URL.createObjectURL(blob)
            //             link.download = this.params.data.filename
            //             link.click()
            //             URL.revokeObjectURL(link.href)
            //         }).catch(console.error)
            //
            //
            // },

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
