<!-- =========================================================================================
    File Name: Main.vue
    Description: Main layout
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div >
        <VueBotUI
                ref="bot"
                id="bot"
                :messages="messages"
                :isOpen="isOpen"
                :options="botOptions"
            @msg-send="msgSend"
        />



    </div>
</template>


<script>
    import { mapGetters, mapActions } from 'vuex'
    import r from '../route';
    import axios from '../axios'
    import { VueBotUI } from 'vue-bot-ui'

    export default {
        components: {

            VueBotUI,

        },
        data () {
            return {
                showBot:true,
                isOpen:false,
                dailog:false,
                dialogData:{},
                messages: [],
                botOptions: {
                    botTitle:'Чат-бот',
                    colorScheme:'#7367F0',
                    inputPlaceholder:'Сообщение',
                    botAvatarImg:'https://bain.design/wp-content/uploads/2014/08/People-Avatar-Set-Rectangular-12.jpg'


                },


            }
        },
        watch: {

        },
        mounted() {
            this.channelUved.listen(".UpdateUved", () => this.reloadUved());
            this.channel.listen(".ChatBot", (e) => this.reload(e));

        },
        computed: {
            ...mapGetters([
               'User'
            ]),
            channelUved(){
              return this.$echo.join("updateUved-channel");
            },
            channel(){
                return this.$echo.join("chatBot-channel");
            },
        },
        methods: {
            ...mapActions([
              'getUvedUsersAudio'
            ]),
            reloadUved(){
              this.getUvedUsersAudio(this.User.id);
            },
            reload(e){

                if(e.id_user==this.User.id){

                    this.dailog=false;

                    const replyMessage = {
                        agent: "bot",
                        disableInput: false,
                        text: e.data,
                        type: "text"
                    }

                    this.inputDisable =false
                    this.messages.push(replyMessage)
                    this.isOpen=true

                    //console.log(this.$refs)
                    //this.$refs.bot.botOpen()
                 //   this.showBot=true;
                    if(typeof this.$refs.bot!='undefined'){
                        this.$refs.bot.botOpen()
                    }
                   // console.log(this.isOpen)
                }
                //console.log(this.$refs)

            },
            msgSend (value) {
                // Push the user's message to board

                if(this.dailog){

                    const mes={
                        agent: 'user',
                        type: 'text',
                        quest:this.messages[this.messages.length-1].text,
                        dailogStatus:true,
                        text: value.text
                    }
                    console.log(mes)
                    this.messages.push(mes)
                    this.doDailog(this.messages)
                }
                else{
                    this.messages.push({
                        agent: 'user',
                        type: 'text',
                        dailogStatus:false,
                        text: value.text
                    })
                    this.getResponse(this.messages)
                }



            },
            getResponse (value) {
                // Loading

                this.botTyping = true

                    axios.post(r("chatbot.index"), {
                        params: {
                            method: 'createMessage',
                            param: value

                        }
                    }).then((response) => {
                        if(response.data.type=='dailog'){
                            this.beginDailog(response.data)

                        }
                        else{
                            this.dailog=false;

                            const replyMessage = {
                                ...response.data
                            }

                            this.inputDisable = response.data.disableInput
                            this.messages.push(replyMessage)
                            // finish
                        }

                        this.botTyping = false



                    })



            },
            doDailog(value){
                let quest=value[value.length-1].quest
                let next;
                let flag=true;

                for (var a = 0; a < this.dialogData.quest.length; a++) {
                    if(this.dialogData.quest[a].quest==quest){
                        this.dialogData.quest[a].answer=value[value.length-1].text
                        next=a+1;
                //        console.log('next '+next);
                  //      console.log(this.dialogData.quest);


                    }
                }
                if(next==this.dialogData.quest.length){
                    this.sendDailog(this.dialogData)
                    flag=false;
                }

                console.log('next '+next);
                console.log('flag '+flag);

                if(flag){
                    const replyMessage = {
                    agent:'bot',
                    type:'text',
                    text:this.dialogData.quest[next].quest,
                }
                    this.messages.push(replyMessage)
                }



            },
            sendDailog(data){
                this.botTyping = true
                this.dailog=false;
                axios.post(r("chatbot.index"), {
                    params: {
                        method: 'sendDailog',
                        param: data

                    }
                }).then((response) => {
                    if(response.data.type=='dailog'){
                        this.beginDailog(response.data)

                    }
                    else{
                        const replyMessage = {
                            ...response.data
                        }

                        this.inputDisable = response.data.disableInput
                        this.messages.push(replyMessage)
                        // finish
                    }

                    this.botTyping = false



                })



            },
            beginDailog(data){
                this.dailog=true;
                this.dialogData=data;
                const replyMessage = {
                    ...data,
                    text:data.quest[0].quest,
                }
                this.messages.push(replyMessage)
               // console.log(dailog);
            }

        },

    }

</script>

