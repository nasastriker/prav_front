<template>
    <div  style="margin-bottom: 30px; ">
        <label class="text-sm">Статус исполнительного листа:</label>
        <vx-input-group class="w-100 ">
            <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="StatusSudsArr"  v-model="statusLast"  @input="change" ></v-select>
            <template >
                <div class="append-text btn-addon">
                    <vs-button color="warning" type="border" @click="showHis=!showHis">История</vs-button>
                </div>
            </template>
        </vx-input-group>
        <vs-popup class="holamundo" title="История Статусов:" :active.sync="showHis">
            <json-viewer
                    :value="status"
                    :expand-depth=5
                    copyable
                    sort></json-viewer>

        </vs-popup>
    </div >
</template>
<script>
    import vSelect from 'vue-select'
    import { mapActions,mapGetters } from 'vuex'
    import r from '../route';
    import JsonViewer from 'vue-json-viewer'
    import axios from '../axios'
    export default {
        props: {
            id_credit: {
                default: '',
                // type: Number
            },

        },

        components: {
            'v-select': vSelect,
            JsonViewer
        },
        data () {
            return {
                status:{},
                statusLast:0,
                showHis:false,
            }
        },

        computed: {
            ...mapGetters([
                'StatusSudsArr','Deb'

            ]),

        },
        methods: {
            setStatus(id_stat){
                this.statusLast= id_stat;
                this.change();
            },
            change(){

                axios.post(r("sudOrderStatus.index"), {
                    params: {
                        method: 'setSudOrderStatus',
                        param: {
                            id_credit:this.id_credit,
                            id_status:this.statusLast,
                        }

                    }
                }).then((response) => {
                       // this.getDataDebtorRefines()
                        this.getData();

                })

            },
            ...mapActions([
                'getDataStatusSuds','getDataDebtorRefines'
            ]),

            getData(){
                if(this.id_credit!=null ){
                    axios.get(r("sudOrderStatus.index"), {
                        params: {
                            method: 'getSudOrderStatus',
                            param: this.id_credit

                        }
                    }).then((response) => {
                        this.$vs.loading.close()
                        if (response.data.data) {
                            this.status = response.data.data;
                            this.statusLast=response.data.status;
                            this.Deb.sudOrder.id_status=this.statusLast

                        }


                    })}


            }

        },
        mounted () {
            this.getDataStatusSuds()
            this.getData()

        }
    }


</script>

<style lang="scss">

</style>
