<template>
    <vx-card no-shadow>
        <div class="mt-5">
           <Back></Back>
            <template v-if="credits.length>0">
            <vs-tabs>

                    <vs-tab :label="' №'+item.number_dog" v-for="item in credits" :key="item.id"  >
                      <DebtorID :idDep="item.id"></DebtorID>
                    </vs-tab>


            </vs-tabs>
            </template>
        </div>



    </vx-card>
</template>

<script>
    import Vue from 'vue'
    import AsyncComputed from 'vue-async-computed'
    import r from '../../route';
    import Back from '../../components/Back.vue'
    import { mapActions,mapGetters } from 'vuex'
    import DebtorID from './DebtorID.vue'
    import axios from '../../axios'
    import vSelect from 'vue-select'
    Vue.use(AsyncComputed)

    export default {
        components: {
            'v-select': vSelect,Back,
            DebtorID
        },

        props: {
            idDep: {
                default: '',
                // type: Number
            },

        },
        data () {
            return {

                credits:[],
            }
        },
        mounted(){
            if (this.$route.params.id){
                if(this.idDep){

                    this.getData(this.idDep);
                }
                else{
                    this.getData(this.$route.params.id);
                }




            }


        },
        asyncComputed: {

        },
        computed: {

            ...mapGetters([
                'StatussDebtorArr'

            ]),


        },
        methods: {
            getData(id){

                axios.get(r("debtors.index"), {
                    params: {
                        method: 'getDebtorAndAllCredit',
                        param: id
                    }
                }).then((response) => {
                    if(response.data.result){
                        this.credits=response.data.credit
                    }




                })
            },
            close(){

                this.$router.back()
            },
            ...mapActions([
                'saveDebtor','getDataStatuss','getDataDebtorsById'
            ]),


        },
    }
</script>

<style lang="scss">
    .address-component {
        flex: 1 1 auto;
        width: 1%;

    input {
        height: auto;
        width: 100%;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;

    &:focus {
         color: #495057;
         background-color: #fff;
         border-color: #80bdff;
         outline: 0;
         box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
     }
    }
    }
</style>
