<template>
    <vx-card no-shadow>
        <Back></Back>
        <vs-tabs>

            <vs-tab label="Проверить подсудность">
                <div style="margin-bottom: 30px">
                    <h6 class="h6">Адрес регистрации:</h6>

                    <vx-input-group class="w-100">



                        <VueSuggestionsChange v-if="Deb.debtor.data_reg==null"
                                        :model.sync="Deb.debtor.address_reg"
                                        :fias.sync="Deb.debtor.data_reg"
                                        :options="SuggestionOptionsAddress"
                                        style="color:red" >

                        </VueSuggestionsChange>
                        <VueSuggestionsChange v-else
                                        :model.sync="Deb.debtor.address_reg"
                                        :fias.sync="Deb.debtor.data_reg"
                                        :options="SuggestionOptionsAddress"
                                        style="color:black" >

                        </VueSuggestionsChange>
                        <template slot="append">
                            <div class="append-text btn-addon">
                                <vs-button color="warning" type="border" @click="utchAdd()">Утч. адрес</vs-button>
                            </div>
                        </template>
                        <template slot="append">

                        </template>
                    </vx-input-group>




                </div>

                <div class="mt-8 ">
                    <h6 class="h6">Подсудность:</h6>

                    <vx-input-group class="w-100 ">
                        <vs-input  v-model="Deb.debtor.jud_number" />

                        <template slot="append">
                            <div class="append-text btn-addon">
                                <vs-button color="warning" type="border" @click="showJud=!showJud">ИНФО</vs-button>
                            <!--    <vs-button color="warning" type="border" @click="setJud">Установить</vs-button>
                            !-->
                            </div>
                        </template>

                    </vx-input-group>
                    <template v-if="showJud">
                        <Jud :number="Deb.debtor.jud_number" ></Jud>
                    </template>

                    <template v-if="Deb.debtor.jud_number_geo!=null">
                        <label class="text-sm">
                            Гео подсудность:
                        </label>
                        <span v-for="(item, index) in Deb.debtor.jud_number_geo" :key="item">
                                                <vx-input-group class="w-100 "  >
                                                    <template v-if="Deb.debtor.jud_number_geo_pri==Deb.debtor.jud_number_geo[index]">
                                                            <vs-input v-model="Deb.debtor.jud_number_geo[index]"  style="color: green"/>
                                                    </template>
                                                    <template v-else>
                                                        <vs-input v-model="Deb.debtor.jud_number_geo[index]"  />
                                                    </template>

                                                    <template slot="append">
                                                        <div class="append-text btn-addon">
                                                       <!--     <vs-button color="warning" type="border" @click="setJudLocal(item)">Установить</vs-button>
                                                       !-->
                                                            <vs-button color="warning" type="border" @click="showDat(item) ">
                                                               ДАННЫЕ

                                                            </vs-button>
                                                            <vs-button color="warning" type="border" @click="showPodsud(item) ">
                                                               ОТКРЫТЬ

                                                            </vs-button>
                                                            <vs-button color="warning" type="border" @click="showIndexProc(index) ">
                                                                <template v-if="showIndex === index">
                                                                    СКРЫТЬ
                                                                </template>
                                                                <template v-else>
                                                                ИНФО
                                                                </template>

                                                            </vs-button>
                                                        </div>
                                                    </template>
                                                </vx-input-group>
                                     <template v-if="typeof showIndex !='undefined'">
                                                <template v-if="showIndex === index">
                                                    <Jud :number="Deb.debtor.jud_number_geo[index]" ></Jud>
                                                </template>
                                     </template>

                                            </span>

                    </template>


                    <template v-if="Deb.debtor.jud_yandex!=null">
                        <label class="text-sm">
                            Яндекс подсудность:
                        </label>
                        <span v-for="(item, index) in Deb.debtor.jud_yandex" >
                                                <vx-input-group class="w-100 "  >
                                                    <template v-if="Deb.debtor.jud_number_geo_pri==Deb.debtor.jud_yandex[index].number">
                                                            <vs-input v-model="Deb.debtor.jud_yandex[index].number"  style="color: green"/>
                                                    </template>
                                                    <template v-else>
                                                         <template v-if="findIn(Deb.debtor.jud_yandex[index].number)">
                                                          <vs-input v-model="Deb.debtor.jud_yandex[index].number"  style="color: red"/>
                                                         </template>
                                                         <template v-else>
                                                             <vs-input v-model="Deb.debtor.jud_yandex[index].number"  />
                                                         </template>

                                                    </template>

                                                    <template slot="append">
                                                        <div class="append-text btn-addon">
                                                         <!--    <vs-button color="warning" type="border" @click="setJudLocal(item.number)">Установить</vs-button>
                                                         !-->
                                                            <vs-button color="warning" type="border" >
                                                               {{Deb.debtor.jud_yandex[index].proc}}

                                                            </vs-button>
                                                            <vs-button color="warning" type="border" @click="showDat(item.number) ">
                                                               ДАННЫЕ

                                                            </vs-button>
                                                            <vs-button color="warning" type="border" @click="showPodsud(item.number) ">
                                                               ОТКРЫТЬ

                                                            </vs-button>
                                                            <vs-button color="warning" type="border" @click="showIndexProc(index) ">
                                                                <template v-if="showIndex === index">
                                                                    СКРЫТЬ
                                                                </template>
                                                                <template v-else>
                                                                ИНФО
                                                                </template>

                                                            </vs-button>
                                                        </div>
                                                    </template>
                                                </vx-input-group>
                                     <template v-if="typeof showIndex !='undefined'">
                                                <template v-if="showIndex === index">
                                                    <Jud :number="Deb.debtor.jud_yandex[index].number" ></Jud>
                                                </template>
                                     </template>

                                            </span>

                    </template>

                    <template v-if="showDatSite">
                        <h3 style="color: #00b0e8">{{sudName}}</h3>
                        <span v-html="highlight(datSite)" ></span>
                    </template>
                <div style="margin-top: 20px">
                    <template v-if="editAddressTab">
                    <judicial :buttonNew=false @editAddress="editJudicialAddress" @linkJudAddress="linkJudAddress"> </judicial>
                    </template>
                    <template v-else>
                        <div class="vx-breadcrumb ml-4 md:block hidden" style="cursor: pointer;">
                            <ul class="flex flex-wrap items-center" style="cursor: pointer;">
                                <li class="inline-flex items-center" style="cursor: pointer;" @click="editAddressTab=!editAddressTab"><span class="text-primary cursor-default">   <arrow-left-icon  style="cursor: pointer;" size="1.5x" class="custom-class" ></arrow-left-icon></span><span
                                        class="breadcrumb-separator mx-2 flex items-start"><span
                                        class="feather-icon select-none relative"></span></span></li>
                            </ul>
                        </div>
                        <judicialIDAdresses :jud_id="editAddressData" style="margin-top: 15px;"></judicialIDAdresses>
                    </template>
                </div>
                </div>

            </vs-tab>
            <vs-tab label="Заемщик">
                <Debtor></Debtor>
            </vs-tab>
            <template v-if="credits!=null">
            <template v-if="credits.length>0">


                <vs-tab :label="' №'+item.number_dog" v-for="item in credits" :key="item.id"  >
                    <DebtorID :idDep="item.id"></DebtorID>
                </vs-tab>



            </template>
            </template>

        </vs-tabs>


    </vx-card>
</template>

<script>

    import { ArrowLeftIcon } from 'vue-feather-icons'
    import r from '../../route';
    import judicial from '../Handbook/Judicial.vue'
    import judicialIDAdresses from '../Handbook/JudicialIDAdresses.vue'
    import { mapActions,mapGetters, } from 'vuex'
    import VueSuggestionsChange from '../../components/vue-suggestions/vue-suggestionsChange.vue'
    import axios from '../../axios'
    import DebtorID from '../Debtor/DebtorID.vue'
    import Status from '../../components/Status.vue'
    import Jud from '../Debtor/Jud.vue'
    import Debtor from '../Debtor/DebtorTab/Debtor.vue'
    import VueSuggestions from 'vue-suggestions';
    import JsonViewer from 'vue-json-viewer'
    import Back from '../../components/Back.vue'
    import vSelect from 'vue-select'
    export default {
        components: {
            VueSuggestions,
            DebtorID,
            Debtor,
            Jud,
            Back,
            Status,
            JsonViewer,
            ArrowLeftIcon,
            VueSuggestionsChange,
            vSelect,
            judicial,
            judicialIDAdresses
        },
        props:['id_deb'],
        data () {
            return {
                editAddressTab:true,
                editAddressData:null,
                datSite:'',
                showDatSite:false,
                keywords:'',
                credits:[],
                jud:[],
                sudName:'',
                labelPop:'Подсудность',
                ispl:[],
                myJsonString:{},
                popupActive:false,
                popupActive2:false,
                showJud:false,
                showIndex: null,
                showIndexYandex:null,

            }
        },
        mounted(){
            if(typeof this.id_deb=='undefined' ){

                this.getJud(this.$route.params.id)
                this.getDebtorOnly(this.$route.params.id)
            }
            else{
                this.getJud(this.id_deb)
                this.getDebtorOnly(this.id_deb)
            }

            if (this.$route.params.id){

                this.getData(this.$route.params.id);
            }

        },

        computed: {
//            findIn: function (number) {
//                let flag=false;
//                for (let i = 0; i < this.Deb.debtor.jud_number_geo.legth; i++) { // выведет 0, затем 1, затем 2
//                    if(this.Deb.debtor.jud_number_geo[i]==number){
//                        flag=true
//                    }
//
//                }
//
//                return flag;
//            },
            labl: function () {
              //  console.log(this.Deb)
              if(this.Deb.debtor.id_status==1){
                  return "Уточнить адрес"
              }
                if(this.Deb.debtor.id_status==2){
                    return "Уточнить подсудность"
                }
                return ''
            },
            ...mapGetters([
                'StatussDebtorArr','Deb','DebtorRefinesArr','User', 'SuggestionOptionsAddress'

            ]),

        },
        methods: {
            linkJudAddress(data){
                this.Deb.debtor.jud_number=data.number
                this.setJud()
            },

            editJudicialAddress(id){
                this.editAddressTab=false
                this.editAddressData=id
            },


            findIn(number){
                let flag=false;
                if(this.Deb.debtor.jud_number_geo!=null){
                    for (let i = 0; i < this.Deb.debtor.jud_number_geo.length; i++) { // выведет 0, затем 1, затем 2
                        if(this.Deb.debtor.jud_number_geo[i]==number){
                            flag=true
                        }

                    }
                }

                return flag;
            },
            highlight(text) {

                if(typeof this.Deb.debtor.data_reg!='undefined' ){
                    if(typeof this.Deb.debtor.data_reg.settlement!='undefined' ){
                        text=text.replace(new RegExp(this.Deb.debtor.data_reg.settlement, 'gi'), '<span class="highlighted">$&</span>');
                    }

                    text=text.replace(new RegExp(this.Deb.debtor.data_reg.city, 'gi'), '<span class="highlighted">$&</span>');
                    text=text.replace(new RegExp(this.Deb.debtor.data_reg.street, 'gi'), '<span class="highlighted">$&</span>');
                    text=text.replace(new RegExp(this.Deb.debtor.data_reg.house, 'gi'), '<span class="highlighted">$&</span>');
                }

                return text
            },
            ...mapActions([
                'saveDebtor','getDataStatuss','getDataDebtorsById','getBanksNameAndId','changeDeb','getDataJudicials',
            ]),
            showEditFormAddres(){
                 this.myJsonString = Object.assign({}, this.Deb.debtor.data_reg);
                this.popupActive2=true;
            },
            showDat(item){
                this.sudName='';
                this.showDatSite=false;
                this.datSite='';
                axios.get(r("judicial.index"), {
                    params: {
                        method: 'getJudicialSite',
                        param: item

                    }
                }).then((response) => {

                    if (response.data.result) {
                        this.datSite=response.data.data.site;
                        this.showDatSite=true;
                        this.sudName=response.data.name;


                    }
                    else{
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Ошибка',
                            color: 'danger',
                            position: 'top-center'
                        })

                    }


                })
            },
            showPodsud(item){
                axios.get(r("judicial.index"), {
                    params: {
                        method: 'getJudicialByNumber',
                        param: item

                    }
                }).then((response) => {

                    if (response.data.data) {
                        this.judi = response.data.data;
                        window.open(this.judi.podsupnost, '_blank');

                    }
                    else{
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Ошибка',
                            color: 'danger',
                            position: 'top-center'
                        })

                    }


                })

            },
            showIndexProc(index){
                if(this.showIndex!=index){
                    this.showIndex = index
                }
                else{
                    this.showIndex = null
                }

            },
            getJud(id){

                axios.get(r("debtors.index"), {
                    params: {
                        method: 'getDebtorAndAllCreditAndJud',
                        param: id
                    }
                }).then((response) => {
                    if(response.data.result){
                        this.jud=response.data.jud
                    }




                })
            },
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
            checkBankrot(){
                let flag=false;

                if (this.Deb.debtor.inn == null) {

                    this.checkInn(true);
                    flag=true;

                }
                if (this.Deb.debtor.inn == "") {
                    this.checkInn(true);
                    flag=true;
                }
                if(!flag) {
                    this.getBankrot();
                }

            },
            getBankrot(){
                this.$vs.loading({color: '#ff8000'})
                axios.post(r("debtors.index"), {
                    params: {
                        method: 'getBankrot',
                        param: this.Deb.debtor

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result) {
                        this.Deb.debtor.bankrot = 1;
                        this.Deb.debtor.bankrot_delo = 'https://bankrot.fedresurs.ru/PrivatePersonCard.aspx?ID=' + response.data.data
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Банкротство определено!!!',
                            color: 'success',
                            position: 'top-center'
                        })
                    }
                    else {
                        this.Deb.debtor.bankrot = 0;
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Не банкрот !!!',
                            color: 'success',
                            position: 'top-center'
                        })
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
            checkInn(fla){
                let flag=false;
                if (this.Deb.debtor.name==''){
                    flag=true;
                    this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Имя  !!!', color: 'danger', position: 'top-center' })
                }
                if (this.Deb.debtor.name_family==''){
                    flag=true;
                    this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Фамилия  !!!', color: 'danger', position: 'top-center' })
                }
                if (this.Deb.debtor.name_patronymic==''){
                    flag=true;
                    this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Отчество  !!!', color: 'danger', position: 'top-center' })
                }
                if (this.Deb.debtor.birthdate==''){
                    flag=true;
                    this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Дата рождения  !!!', color: 'danger', position: 'top-center' })
                }
                if (this.Deb.debtor.series==''){
                    flag=true;
                    this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Серия паспорта  !!!', color: 'danger', position: 'top-center' })
                }
                if (this.Deb.debtor.number==''){
                    flag=true;
                    this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Номер паспорта  !!!', color: 'danger', position: 'top-center' })
                }
                this.$vs.loading({ color: '#ff8000' })
                if(!flag){
                    axios.post(r("debtors.index"), {
                        params: {
                            method: 'getInn',
                            param: this.Deb.debtor

                        }
                    }).then((response) => {

                        this.$vs.loading.close()
                        if (response.data.result){
                            this.Deb.debtor.inn=response.data.data;
                            if(fla){
                                this.getBankrot();
                            }
                            this.$vs.notify({  title:'Успешно', text: 'Инн определен!!!', color: 'success', position: 'top-center' })
                        }
                        else{
                            this.$vs.notify({  title:'Ошибка', text: 'Инн определить не удалось !!!', color: 'danger', position: 'top-center' })
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

                }

            },
            openBankrot(){
                window.open(this.debtor.bankrot_delo, '_blank');
            },

            utchAdd(){
                axios.post(r("debtors.index"), {
                    params: {
                        method: 'setUtchAddressIns',
                        param: this.Deb.debtor.id

                    }
                }).then((response) => {

                    this.$vs.loading.close()
                    if (response.data.result){
                        this.getDataDebtorRefines(this.User.pag.refine);
                        this.$router.back()
                        this.$vs.notify({  title:'Успешно', text: 'Успешно!!!', color: 'success', position: 'top-center' })
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Ошибка !!!', color: 'danger', position: 'top-center' })
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
            showEditForm(e){
                axios.get(r("jurisdiction.index"), {
                    params: {
                        method: 'getJurisdictionsByStreetFias',
                        param: e

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.popupActive=true;
                        this.labelPop='Адреса в базе данных по данному коду'
                        this.ispl=response.data.data
                    }



                })
            },

            setPodsud(jud_number){

                axios.post(r("jurisdiction.index"), {
                    params: {
                        method: 'setJurisdictions',
                        param: {
                            jud_number:jud_number,
                            address_reg:this.Deb.debtor.address_reg,
                            data_reg:this.Deb.debtor.data_reg,
                            id_debtor:this.Deb.debtor.id,
                        }

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.getDataDebtorRefines(this.User.pag.refine);
                        this.$router.back()
                        this.$vs.notify({  title:'Успешно', text: response.data.mess , color: 'success', position: 'top-center' })
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: response.data.mess , color: 'danger', position: 'top-center' })
                    }



                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                })
            },
            setJudLocal(number){
                this.Deb.debtor.jud_number=number;
                this.setJud();
            },
            setJud(){
                axios.post(r("jurisdiction.index"), {
                    params: {
                        method: 'setJurisdictions',
                        param: {
                            jud_number:this.Deb.debtor.jud_number,
                            address_reg:this.Deb.debtor.address_reg,
                            data_reg:this.Deb.debtor.data_reg,
                            id_debtor:this.Deb.debtor.id,
                        }

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$router.back()
                        this.$vs.notify({  title:'Успешно', text: response.data.mess , color: 'success', position: 'top-center' })
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: response.data.mess , color: 'danger', position: 'top-center' })
                    }



                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                })
            },
            close(){

                this.$router.back()
            },

            ...mapActions([
                'saveDebtor','getDataStatuss','getDataDebtorsById','getDebtorOnly','getDataDebtorRefines'
            ]),

        },
    }
</script>
<style>
    .highlighted { color: red }
    .terr-item .right {
        margin-left: 32%;
    }
    .terr-item .left {
        width: 30%;
        float: left;
    }
    .address-note {
        font-size: 13px;
        color: #444;
        padding-top: 5px;
    }
    .table{
        border-collapse: collapse; /* Убираем двойные линии между ячейками */
    }
    .tdd{
        padding: 3px; /* Поля вокруг содержимого таблицы */
        border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .standart{
        color: #a9a7f0
    }
</style>
