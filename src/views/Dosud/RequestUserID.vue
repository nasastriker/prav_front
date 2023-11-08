<template>
    <vx-card no-shadow>


        <template v-if="requestUser.request_name=='Уведомление о банкротстве'">

            <RequestUserBankrotID :req="requestUser"></RequestUserBankrotID>
        </template>

        <template v-if="requestUser.request_name=='Уведомление о смене адреса'">

            <RequestUserAddressID :req="requestUser"></RequestUserAddressID>
        </template>

        <template v-if="requestUser.request_name=='Вопрос от заёмщика'">

            <RequestUserQuestID :req="requestUser"></RequestUserQuestID>
        </template>
        <template v-if="requestUser.request_name=='Доступ в личный кабинет'">

            <RequestUserLkID :req="requestUser"></RequestUserLkID>
        </template>
    </vx-card>
</template>

<script>
    import r from '../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../axios'
    import RequestUserBankrotID from './RequestUserBankrotID.vue'
    import RequestUserLkID from './RequestUserLkID.vue'
    import RequestUserQuestID from './RequestUserQuestID.vue'
    import RequestUserAddressID from './RequestUserAddressID.vue'
    export default {
        components: {
            RequestUserLkID,
            RequestUserBankrotID,
            RequestUserAddressID,
            RequestUserQuestID,
        },
        data () {
            return {
                label:'Запрос пользователя:',
                requestUser:{

                },
            }
        },
        mounted(){
            if (this.$route.params.id){
                if (this.$route.params.id!='new') {
                    this.getData(this.$route.params.id);

                }
                else{

                }


            }

        },

        computed: {


        },
        methods: {

            ...mapActions([

            ]),
            getData(id){
                axios.get(r("requestUser.index"), {
                    params: {
                        method: 'getRequestUser',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.requestUser=response.data.data
                    }



                })
            },


        },
    }
</script>
