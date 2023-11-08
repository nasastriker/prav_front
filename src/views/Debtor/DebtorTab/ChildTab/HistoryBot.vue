<template>
    <vx-card no-shadow>
        <component :is="scrollbarTag"
                   class="chat-content-scroll-area border border-solid d-theme-border-grey-light"
                   style="    max-height: 450px;"
                   :settings="settings" ref="chatLogPS" :key="$vs.rtl">
            <div class="chat__log" ref="chatLog">
                <chat-log :userId="id_debtor" v-if="id_debtor" :mess="messages"></chat-log>
            </div>
        </component>
        <div class="chat__input flex mt-4 bg-white">
            <vs-input class="flex-1" placeholder="Напишите сообщение" v-model="typedMessage"
                      @keyup.enter="sendMsg"/>
            <vs-button class="bg-primary-gradient ml-4" type="filled" @click="sendMsg">Отправить</vs-button>
        </div>
    </vx-card>
</template>

<script>
    import Vue from 'vue'
    import AsyncComputed from 'vue-async-computed'
    import JsonViewer from 'vue-json-viewer'
    import VueDadata from 'vue-dadata'
    import { mapActions,mapGetters } from 'vuex'
    import VueSuggestions from 'vue-suggestions'
    import vSelect from 'vue-select'
    import r from '../../../../route';
    import axios from '../../../../axios'
    import ChatLog             from './../../../apps/chat/ChatLog.vue'
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    Vue.use(AsyncComputed)
    export default {
        components: { VueSuggestions,ChatLog,VuePerfectScrollbar
        },
        props:['id_debtor'],
        data () {
            return {
                messages:[],
                active               : true,
                isHidden             : false,
                searchContact        : '',
                activeProfileSidebar : false,
                activeChatUser       : null,
                userProfileId        : -1,
                typedMessage         : '',
                isChatPinned         : false,
                settings             : {
                    maxScrollbarLength : 60,
                    wheelSpeed         : 0.70
                },
                clickNotClose        : true,
                isChatSidebarActive  : true,
                isLoggedInUserProfileView: false,
                data:[],

            }
        },
        mounted(){
            this.getData()
            console.log(this.id_debtor);
            this.$echo.private("chat-"+this.id_debtor).listen(".Message", (e) => this.newMessage(e));
        },
        asyncComputed: {

        },
        computed: {
            scrollbarTag () {
                return this.$store.getters.scrollbarTag
            },
            ...mapGetters([
                'Deb'

            ]),


        },
        methods: {
            newMessage(data){
                var audio = new Audio('/mess.mp3'); // path to file
                audio.play();
                   console.log(data);
                let replyMessage = {
                    ...data.data
                }

                this.messages.push(replyMessage)
            },
            sendMsg () {
                axios.post(r("historyBot.index"), {
                    params: {
                        method: 'newMess',
                        param: {
                            id:this.id_debtor,
                            mess:this.typedMessage
                        }

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result) {
                        this.data = response.data.data;
                        let arr=response.data.data
                        this.messages=[];
                        this.typedMessage='';
                        for(let i=0;i<arr.length;i++){
                            let replyMessage = {
                                ...arr[i].mess
                            }

                            this.messages.push(replyMessage)
                        }

                    }


                })

            },

            getData(){
                    axios.get(r("historyBot.index"), {
                        params: {
                            method: 'getHistorys',
                            param: this.id_debtor

                        }
                    }).then((response) => {
                        this.$vs.loading.close()
                        if (response.data.data) {
                            this.data = response.data.data;
                            let arr=response.data.data
                            for(let i=0;i<arr.length;i++){
                                let replyMessage = {
                                    ...arr[i].mess
                                }
                                this.messages.push(replyMessage)
                            }

                        }


                    })


            },
            close(){

                this.$router.back()
            },
            ...mapActions([

            ]),


        },
    }
</script>

<style lang="scss">
    .h6{
        font-size: 12px;
        color: cadetblue;
    }
</style>
