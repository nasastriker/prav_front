<template>
    <div>
        <template v-if="judi.number!=''">
              <span style="margin-bottom: 5px">
                                Сайт:
                              </span>
            <vx-input-group class="w-100 mb-base">
                <vs-input disabled v-model="judi.site"  />

                <template slot="append">
                    <div class="append-text btn-addon">
                        <vs-button color="warning" type="border"  @click="openUrl(judi.site)">Открыть</vs-button>
                    </div>
                </template>
            </vx-input-group>
            <span style="margin-bottom: 5px">
                                Страница терр. подсудности:
                              </span>
            <vx-input-group class="w-100 mb-base">
                <template v-if="judi.podsupnost!=null">
                    <vs-input disabled v-model="judi.podsupnost"  />
                </template>
                <template v-else>
                    <vs-input  v-model="judi.podsupnost"  v-on:change="changePodsupnost" />
                </template>


                <template slot="append">
                    <div class="append-text btn-addon">
                        <vs-button color="warning" type="border"  @click="openUrl(judi.podsupnost)">Открыть</vs-button>
                    </div>
                </template>
            </vx-input-group>
        <vs-input class="w-full mb-base"  label-placeholder="Название" v-model="judi.name"  @change="changeJud"></vs-input>
        <vs-input class="w-full mb-base"  label-placeholder="Адрес" v-model="judi.address"  @change="changeJud"></vs-input>

        <vs-input class="w-full mb-base"  label-placeholder="Бик Банка" v-model="judi.bankBic"  @change="changeJud"></vs-input>
        <vs-input class="w-full mb-base"  label-placeholder="Название банка" v-model="judi.bankName"  @change="changeJud"></vs-input>


        <vs-input class="w-full mb-base"  label-placeholder="ОКТМО" v-model="judi.oktmmf"  @change="changeJud"></vs-input>

        <vs-input class="w-full mb-base"  label-placeholder="Номер счета" v-model="judi.payeeAcc"  @change="changeJud"></vs-input>
        <vs-input class="w-full mb-base"  label-placeholder="ИНН" v-model="judi.payeeInn"  @change="changeJud"></vs-input>

        <vs-input class="w-full mb-base"  label-placeholder="КПП" v-model="judi.payeeKpp"  @change="changeJud"></vs-input>
        <vs-input class="w-full mb-base"  label-placeholder="Получатель" v-model="judi.payeeName" @change="changeJud" ></vs-input>
        </template>

    </div>
</template>

<script>
    import r from '../../route';
    import axios from '../../axios'
    export default {
        props:['number'],
        components: {
        },
        data () {
            return {
                data:[],
                judi:{},
            }
        },
        methods: {
            openUrl(url){
                window.open(url, '_blank');
            },
            changePodsupnost(){
                    if(this.number!=null ){
                        axios.post(r("judicial.index"), {
                            params: {
                                method: 'setJudicialPodsupnost',
                                param: this.judi

                            }
                        }).then((response) => {
                            this.$vs.loading.close()
                            if (response.data.data) {
                             //   this.judi = response.data.data;


                            }


                        })}


            },
            changeJud(){
                axios.post(r("judicial.index"), {
                    params: {
                        method: 'saveJudicial',
                        param: this.judi

                    }
                }).then((response) => {

                    if (response.data.result) {
                     //   this.judi = response.data.data;


                    }


                })
            },
            getData(){
                if(this.number!=null ){
                axios.get(r("judicial.index"), {
                    params: {
                        method: 'getJudicialByNumber',
                        param: this.number

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.data) {
                        this.judi = response.data.data;


                    }


                })}


            }

        },
        mounted () {
            this.getData()

        }
    }


</script>

<style lang="scss">

</style>
