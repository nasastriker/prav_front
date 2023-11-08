<template>
    <vx-card no-shadow>
        <div>
            <label style="margin-bottom: 10px">Email: </label>
            <span v-html="messData"></span>
        </div>
        <div>
            <vs-button v-if="downloadButton" @click="downloadFile">Скачать вложенный файл</vs-button>
        </div>
        <div>
            <json-viewer :value="email"></json-viewer>
        </div>
        <div>
          {{emailResult}}
        </div>
    </vx-card>
</template>

<script>
    import JsonViewer from 'vue-json-viewer'
    import r from '../../../route';
    import g from '../../../routeGo';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../../axios'
    export default {
        components: {
            JsonViewer
        },
        data () {
            return {
                emailResult:'',
                messData:'',
                downloadButton:false,
                email:{
                id:0
                },
                dataEmail:{},
            }
        },
        mounted(){
            if (this.$route.params.id){
                    this.getData(this.$route.params.id);
            }
        },

        computed: {
        },
        methods: {
            downloadFile(){
                axios.get(r('email.index'),{
                        responseType: 'arraybuffer',
                    params: {
                        method: 'getEmailOnceFile',
                        param: this.email.id
                    }
                }
                ).then((response) => {
                        const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/xls;charset=UTF-8;' }));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download',this.dataEmail.filename);
                        document.body.appendChild(link);
                        link.click();
                })
            },
            close(){
                this.$router.back()
            },
            ...mapActions([

            ]),
            getData(id){
                axios.get(r('email.index'),{
                    params: {
                        method: 'getEmailOnce',
                        param: id
                    }
                }
                ).then((response) => {
                   if (response.data.result){
                       this.dataEmail=response.data.data
                       this.messData=response.data.data.mess;
                       //this.email.mess='';
                       if((typeof this.dataEmail.id != 'undefined'))this.email.id=this.dataEmail.id
                       if((typeof this.dataEmail.send_result != 'undefined'))this.emailResult=this.dataEmail.send_result
                       if((typeof this.dataEmail.sender != 'undefined'))this.email['Отправитель']=this.dataEmail.sender
                       if((typeof this.dataEmail.email != 'undefined'))this.email.Получатель=this.dataEmail.email
                       if((typeof this.dataEmail.filename != 'undefined'))if(this.dataEmail.filename)this.email.Имя_файла=this.dataEmail.filename
                       if((typeof this.dataEmail.type != 'undefined'))if(this.dataEmail.type)this.email.Тип_файла=this.dataEmail.type
                       if((typeof this.dataEmail.subject != 'undefined'))if(this.dataEmail.subject)this.email.Тема_сообщения=this.dataEmail.subject
                       if((typeof this.dataEmail.status != 'undefined'))this.email.status=this.dataEmail.status
                       if((typeof this.dataEmail.status_show != 'undefined'))this.email.status_show=this.dataEmail.status_show
                       if((typeof this.dataEmail.name != 'undefined'))if(this.dataEmail.name)this.email.Имя=this.dataEmail.name
                       if((typeof this.dataEmail.created_at != 'undefined'))this.email.Создано=this.dataEmail.created_at

                       if(this.dataEmail.id_file!=null){
                           this.downloadButton=true;
                       }

                   }
                })
            },


        },
    }
</script>
