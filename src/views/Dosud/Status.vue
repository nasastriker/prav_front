<template>
     <div class="mt-4">

        <div class="centerx">
            <vs-tooltip text="Статус:" position="top" >
                <h6 class="h6Blue mb-1">Статус:</h6>
            </vs-tooltip>
        </div>
        <vSelect  :reduce="label => label.id" label="name" :options="RequestStatussArr" class="w-100 mb-4"  v-model="stat" style="width: 200px;" @input="change"  ></vSelect>

     </div>
</template>

<script>
    import vSelect from 'vue-select'
    import r from '../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../axios'
    export default {
        props:['status','req'],
        components: {

            vSelect,
        },
        data () {
            return {

                stat:null,
            }
        },
        mounted(){
            this.stat=this.status
            this.getDataRequestStatuss();

        },

        computed: {
            ...mapGetters([
                'User','RequestStatussArr'
            ]),

        },
        methods: {


            ...mapActions([
                'getDataRequestStatuss',
            ]),

            change(){
                axios.post(r("requestUser.index"), {
                    params: {
                        method: 'setStatus',
                        param: {
                            id:this.req.id,
                            status:this.stat
                        }

                    }
                }).then((response) => {





                })


            },


        },
    }
</script>
