<template>
    <div >

        <feather-icon icon="DownloadCloudIcon" title="Скачать" svgClasses="h-5 w-5 mr-1 hover:text-primary cursor-pointer" @click="downloadDocument" />

       <!-- <feather-icon icon="ExcelIcon" title="Скачать XLS" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="" />-->

        <span title="Скачать в формате XLS" class="icon icon-btn mr-1">

            <svg class="w-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" @click="startDownload"><defs></defs><path d="M19 19.67V23H1V5.86L7 1h12v3M10 16 5 9M5 16l5-7" class="cls-1"/><path d="M13 9v7h4M23 10s0-1-2-1a1.81 1.81 0 0 0-1.87 1.35C19 11.1 19.48 12 21 12.5s2 1.26 2 2a1.88 1.88 0 0 1-2 1.5c-2 0-2-1-2-1M1 6h6V1" class="cls-1"/></svg>
        </span>

        <feather-icon icon="Trash2Icon" title="Удалить" svgClasses="h-5 w-5 mr-1 hover:text-danger cursor-pointer" @click="showSob=!showSob" />
        <template v-if="User.email=='amitx@list.ru'">

            <feather-icon icon="RefreshCwIcon" svgClasses="h-5 w-5 mr-1 hover:text-danger cursor-pointer" @click="refresh" />
        </template>
      <feather-icon icon="ChromeIcon" title="Посмотреть" svgClasses="h-5 w-5 mr-1 hover:text-primary cursor-pointer"
                    @click="$router.push('/fssp/arhiv/fssp/'+params.data.id)"/>
        <vs-popup classContent="popup-example" title="Удаление реестра" :active.sync="showSob">

            <label class="text-sm">Вернуть на статус</label>
            <v-select   class="w-50 " :reduce="label => label.id" label="name" :options="StatussArr"  v-model="statusOld"  ></v-select>
            <vs-checkbox style="margin-top: 15px;margin-bottom: 15px" v-model="delPochta" >Удалить почтовый рееестр если есть</vs-checkbox>
            <div c style="text-align: center">
                <vs-button   color="primary" type="filled"  @click="deleteRecord">Удалить</vs-button>
            </div>
        </vs-popup>

    </div>
</template>

<style>
    .icon-btn svg .cls-1 {
        fill:none;
        stroke:currentColor;
        stroke-linecap:round;
        stroke-miterlimit:10;
        stroke-width:1.5px
    }

    .icon-btn:hover {
        color: rgb(115, 103, 240);
    }
</style>

<script>
    import r from '../../../route';
    import axios from '../../../axios';
    import { mapActions,mapGetters } from 'vuex'
    export default {
        components: {
        },
        data () {
            return {
                stop:false,
                showSob:false,
                statusOld:30,
                delPochta:true,

            }
        },
        computed: {



            ...mapGetters([
                'User','StatussArr'

            ]),


        },
        methods: {
          getAns(id){
            if(!this.stop){
              axios.post(r("taskTemp.update"), {
                params: {
                  method: 'getAns',
                  param:id,

                }
              }).then((response) => {
                if(response.data.result){
                  this.stop=true
                  this.getFile(response.data.filename,'отчет.xlsx')
                }

              }).catch(error => {
                this.stop=true
                this.$vs.loading.close()
                this.$vs.notify({
                  title: 'Ошибка',
                  text: error.message,
                  color: 'danger',
                  position: 'top-center'
                })

              });
            }
          },
          startDownload(){
            this.stop=false
            this.$vs.loading({color: '#ff8000'})
            axios.post(r("taskTemp.update"), {
              params: {
                method: 'generate',
                param:this.params.value,
                name:'fssp'
              }
            }).then((response) => {
              if(response.data.result){
                var self = this;
                var refreshId = setInterval(function() {
                  self.getAns(response.data.data);
                  if (self.stop) {
                    clearInterval(refreshId);
                    self.$vs.loading.close()
                  }
                }, 10000);
              }
              else{
                this.$vs.loading.close()
                this.$vs.notify({
                  title: 'Ошибка',
                  text: 'Ошибка!!!',
                  color: 'danger',
                  position: 'top-center'
                })
              }
            }).catch(error => {
              this.popupActive2=false;
              this.$vs.loading.close()
              this.$vs.notify({
                title: 'Ошибка',
                text: 'Ошибка!!!',
                color: 'danger',
                position: 'top-center'
              })

            });
          },
          getFile(file,name){
            this.$vs.loading({color: '#ff8000'})
            axios.get(r("taskTemp.index"), {
              responseType: 'arraybuffer',

              params: {
                method: 'getFile',
                param:file,




              }
            }).then((response) => {
              this.$vs.loading.close()
              //console.log(response.data);
              const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/doc;charset=UTF-8;' }));
              //  console.log(url);
              const link = document.createElement('a');
              link.href = url;

              let filename=response.headers['content-disposition'].replace('attachment; filename=', '');
              //console.log(filename);
              filename= filename.replace('_', '');
              filename = filename.split('; filename*=utf')[0];

              link.setAttribute('download', filename);
              document.body.appendChild(link);
              link.click();


            }).catch(error => {

              this.$vs.loading.close()
              this.$vs.notify({
                title: 'Ошибка',
                text: 'Ошибка!!!',
                color: 'danger',
                position: 'top-center'
              })

            });

          },
            ...mapActions([
                    'getDataArchFssps','deleteArchFssp','refreshFsspSa'


            ]),
            refresh(){
                this.refreshFsspSa(this.params.value).then((value)=> {

                });
            },

            deleteRecord () {
                this.showSob=false
                if(this.User.pag==null){
                    this.User.pag={
                        bankFsspDate:'',
                    }
                }

                this.$vs.loading({color: '#ff8000'})
                axios.post(r("archFssp.update"), {
                    params: {
                        method: 'deleteArchFssp',
                        param: {
                            id:this.params.value,
                            delPochta:this.delPochta,
                            statusOld:this.statusOld,
                        }
                    }
                }).then((response) => {

                    this.$vs.loading.close()
                    if (response.data.result){
                        this.getDataArchFssps(this.User.pag.bankFsspDate)
                        this.$vs.notify({  title:'Сообщение', text: 'Удаление выполнено успешно!!!', color: 'success', position: 'top-center' })

                    }else {
                        this.$vs.notify({  title:'Сообщение', text: 'Удалить не удалось !!!', color: 'danger', position: 'top-center' })
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
                if(this.User.pag==null){
                    this.User.pag={
                        bankFsspDate:'',
                    }
                }

                axios.get(r("archFssp.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getArch',
                        param:this.params.value


                    }
                }).then((response) => {


                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/zip;charset=UTF-8;' }));

                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', this.params.data.arch_name+'.zip');
                    document.body.appendChild(link);
                    link.click();
                    this.getDataArchFssps(this.User.pag.bankFsspDate);


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


        }
    }
</script>
