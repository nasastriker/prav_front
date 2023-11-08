<template>
    <div>

    <ZalogTable :data="ZalogCarDebtorArr" :columnDefs="carColumnDefs" @add="addCarClick" @edit="editCar"></ZalogTable>



        <ZalogTable :data="ZalogRealEstateDebtorArr" :columnDefs="realEstateColumnDefs" @add="addRealEstateClick" @edit="editRealEstate"></ZalogTable>

        <vs-popup class="popup-example" title="Предмет залога: автомобиль" :active.sync="popupCar">
            <div class="vx-row">
                <div class="vx-col w-1/2">
                    <h6 class="h6" style="margin-top: 10px;">Тип автомобиля:<VarToClipboard name="zc_type"></VarToClipboard></h6>
                    <vs-input  class="w-100" v-model="car.type"></vs-input>
                    <h6 class="h6" style="margin-top: 10px;">Модель автомобиля:<VarToClipboard name="zc_model"></VarToClipboard></h6>
                    <vs-input  class="w-100" v-model="car.model" ></vs-input>
                    <h6 class="h6" style="margin-top: 10px;">№двигателя а/м:<VarToClipboard name="zc_number_engine"></VarToClipboard></h6>
                    <vs-input  class="w-100" v-model="car.number_engine" ></vs-input>
                    <h6 class="h6" style="margin-top: 10px;">Госномер а/м:<VarToClipboard name="zc_reg_number"></VarToClipboard></h6>
                    <vs-input  class="w-100" v-model="car.reg_number" ></vs-input>
                    <h6 class="h6" style="margin-top: 10px;">VIN а/м:<VarToClipboard name="zc_vin"></VarToClipboard></h6>
                    <vs-input  class="w-100" v-model="car.vin" ></vs-input>
                    <h6 class="h6" style="margin-top: 10px;">Год выпускаа/м:<VarToClipboard name="zc_year_issue"></VarToClipboard></h6>
                    <vs-input type="number" class="w-100" v-model="car.year_issue" ></vs-input>
                </div>
                <div class="vx-col w-1/2">
                    <h6 class="h6" style="margin-top: 10px;">№ уведомления в реестре залогов ФНП:<VarToClipboard name="zc_number_uved_fnp"></VarToClipboard></h6>
                    <vs-input  class="w-100" v-model="car.number_uved_fnp"></vs-input>
                    <h6 class="h6" style="margin-top: 10px;">Дата уведомления о возникновении залога ФНП:<VarToClipboard name="zc_date_begin_uved_fnp"></VarToClipboard></h6>
                    <vs-input  type="date" class="w-100" v-model="car.date_begin_uved_fnp"></vs-input>
                    <h6  class="h6" style="margin-top: 10px;">Дата уведомления о прекращении залога ФНП:<VarToClipboard name="zc_date_end_uved_fnp"></VarToClipboard></h6>
                    <vs-input  type="date" class="w-100" v-model="car.date_end_uved_fnp"></vs-input>
                    <h6 class="h6" style="margin-top: 10px;">Доп.сведения о залоге:<VarToClipboard name="zc_dop_info_car"></VarToClipboard></h6>
                    <vs-textarea  class="w-100" v-model="car.dop_info_car"></vs-textarea>

                </div>
            </div>

            <div style="text-align: center">
                <vs-button style="margin-top: 15px" color="success" class="pull-right" type="filled"  @click="addCar">Сохранить</vs-button>
            </div>


        </vs-popup>
        <vs-popup class="popup-example" title="Предмет залога: недвижимое имущество" :active.sync="popupRealEstate">

            <h6 class="h6" style="margin-top: 10px;">Тип недвижимого имущества:<VarToClipboard name="zre_type"></VarToClipboard></h6>
            <vs-input  class="w-100" v-model="realEstate.type"></vs-input>
            <h6 class="h6" style="margin-top: 10px;">Площадь:<VarToClipboard name="zre_square"></VarToClipboard></h6>
            <vs-input  class="w-100" v-model="realEstate.square" @keypress="validateNumberDecimal"></vs-input>
            <h6 class="h6" style="margin-top: 10px;">Кадастровый номер: <VarToClipboard name="zre_number_kadastr"></VarToClipboard></h6>
            <vs-input  class="w-100" v-model="realEstate.number_kadastr" ></vs-input>
            <h6 class="h6" style="margin-top: 10px;">Адрес объекта:<VarToClipboard name="zre_address"></VarToClipboard></h6>
            <vs-input  class="w-100" v-model="realEstate.address" ></vs-input>
            <div style="text-align: center">
                <vs-button style="margin-top: 15px" color="success" class="pull-right" type="filled"  @click="addRealEstate">Сохранить</vs-button>
            </div>


        </vs-popup>
    </div>
</template>

<script>
    import ZalogTable from './ZalogTable.vue'
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../../../axios'
    import r from '../../../../route'
    import VarToClipboard from './../../../VarToClipboard.vue'
    export default {
        components:{
            ZalogTable,VarToClipboard
        },
        data(){
            return{
                popupCar:false,
                popupRealEstate:false,
                car:{},
                realEstate:{},
                carColumnDefs: [
                    {
                        headerName: 'Тип автомобиля',
                        field: 'type',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Модель автомобиля',
                        field: 'model',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: '№двигателя а/м',
                        field: 'number_engine',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Госномер а/м',
                        field: 'reg_number',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'VIN а/м',
                        field: 'vin',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Год выпуска а/м',
                        field: 'year_issue',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 100,
                        cellRendererFramework: 'OperationZalogTable',
                        cellRendererParams: {
                            editValue: this.editCar.bind(this),
                            deleteValue:this.deleteCar.bind(this)
                        },
                    },
                ],
                realEstateColumnDefs:[
                    {
                        headerName: 'Тип недвижимого имущества',
                        field: 'type',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Площадь',
                        field: 'square',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Кадастровый номер',
                        field: 'number_kadastr',
                        filter: true,
                        width: 300
                    },
                    {
                        headerName: 'Адрес объекта',
                        field: 'address',
                        filter: true,
                        width: 300
                    },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 100,
                        cellRendererFramework: 'OperationZalogTable',
                        cellRendererParams: {
                            editValue: this.editRealEstate.bind(this),
                            deleteValue:this.deleteRealEstate.bind(this),
                        },

                    },
                ],
            }
        },

        computed:{
            ...mapGetters([
                'ZalogCarDebtorArr','ZalogRealEstateDebtorArr','Deb','User'

            ]),
        },
        methods:{
            ...mapActions([
                'getDataZalogDebtorArr',

            ]),

            deleteCar(id){
                axios.get(r("zalog.index"), {
                    params: {
                        method: 'deleteZalogCar',
                        param: id
                    }
                }).then(res => {
                    if (res.data.result) {
                        this.getDataZalogDebtorArr(this.Deb.debtorCredit.id)
                        this.$vs.notify({
                                                         title: 'Успешно',
                                                         text: 'Успешно удален предмет залога!!!',
                                                         color: 'success',
                                                         position: 'top-center'
                                                     })
                    }
                    else{
                        this.$vs.notify({
                                                        title: 'Ошибка',
                                                        text: 'Ошибка !!!',
                                                        color: 'danger',
                                                        position: 'top-center'
                                                    })
                    }

                }).catch(e=>{
                    this.$vs.notify({
                                                    title: 'Ошибка',
                                                    text: 'Ошибка !!!',
                                                    color: 'danger',
                                                    position: 'top-center'
                                                })
                })
            },
            deleteRealEstate(id){
                axios.get(r("zalog.index"), {
                    params: {
                        method: 'deleteZalogRealEstate',
                        param: id
                    }
                }).then(res => {
                    if (res.data.result) {
                        this.getDataZalogDebtorArr(this.Deb.debtorCredit.id)
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Успешно удален предмет залога!!!',
                            color: 'success',
                            position: 'top-center'
                        })
                    }
                    else{
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Ошибка !!!',
                            color: 'danger',
                            position: 'top-center'
                        })
                    }

                }).catch(e=>{
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Ошибка !!!',
                        color: 'danger',
                        position: 'top-center'
                    })
                })
            },
            editCar(id){
                axios.get(r("zalog.index"), {
                    params: {
                        method: 'getZalogCarDebtorOnce',
                        param: id
                    }
                }).then(res => {
                    if (res.data.result) {
                        this.car=res.data.data
                        this.popupCar=true
                    }

                })
            },
            editRealEstate(id){
                axios.get(r("zalog.index"), {
                    params: {
                        method: 'getZalogRealEstateDebtorOnce',
                        param: id
                    }
                }).then(res => {
                    if (res.data.result) {
                        this.realEstate=res.data.data
                        this.popupRealEstate=true
                    }

                })
            },
            addCarClick(){
                this.car={}
                this.popupCar=true
            },
            addRealEstateClick(){
                this.realEstate={}
                this.popupRealEstate=true
            },
            addCar(){

                let err=''
                if(typeof this.car.type==='undefined'||this.car.type==='')err+='Введите Тип автомобиля;'
                if(typeof this.car.model==='undefined'||this.car.model==='')err+='Введите Модель автомобиля;'
                if(typeof this.car.number_engine==='undefined'||this.car.number_engine==='')err+='Введите №двигателя а/м;'
                if(typeof this.car.reg_number==='undefined'||this.car.reg_number==='')err+='Введите Госномер а/м;'
                if(typeof this.car.vin==='undefined'||this.car.vin==='')err+='Введите VIN а/м;'
                if(typeof this.car.year_issue==='undefined'||this.car.year_issue==='')err+='Введите Год выпускаа/м;'
                if(err!==''){
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Ошибка !!!  '+err,
                        color: 'danger',
                        position: 'top-center'
                    })
                }
                else {
                    this.car.id_credit = this.Deb.debtorCredit.id
                    this.car.id = 'new'

                    axios.post(r("zalog.update"), {
                        params: {
                            method: 'saveCar',
                            param: this.car
                        }
                    }).then(res => {
                        if (res.data.result) {
                            this.getDataZalogDebtorArr(this.Deb.debtorCredit.id)
                            this.popupCar = false

                            this.$vs.notify({
                                title: 'Успешно',
                                text: 'Успешно!!!',
                                color: 'success',
                                position: 'top-center'
                            })
                        }
                        else {
                            this.$vs.notify({
                                title: 'Ошибка',
                                text: 'Ошибка !!!',
                                color: 'danger',
                                position: 'top-center'
                            })
                        }
                    }).catch(error => {
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Ошибка !!!',
                            color: 'danger',
                            position: 'top-center'
                        })
                    })
                }
            },
            addRealEstate(){

                let err=''
                if(typeof this.realEstate.type==='undefined'||this.realEstate.type==='')err+='Введите Тип недвижимого имущества;'
                if(typeof this.realEstate.square==='undefined'||this.realEstate.square==='')err+='Введите Площадь;'
                if(typeof this.realEstate.number_kadastr==='undefined'||this.realEstate.number_kadastr==='')err+='Введите Кадастровый номер;'
                if(typeof this.realEstate.address==='undefined'||this.realEstate.address==='')err+='Введите Адрес объекта;'
                if(err!==''){
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Ошибка !!!  '+err,
                        color: 'danger',
                        position: 'top-center'
                    })
                }
                else {
                    this.realEstate.id_credit = this.Deb.debtorCredit.id
                    this.realEstate.id = 'new'
                    this.popupRealEstate = false
                    axios.post(r("zalog.update"), {
                        params: {
                            method: 'saveRealEstate',
                            param: this.realEstate
                        }
                    }).then(res => {
                        if (res.data.result) {
                            this.getDataZalogDebtorArr(this.Deb.debtorCredit.id)
                            this.$vs.notify({
                                title: 'Успешно',
                                text: 'Успешно!!!',
                                color: 'success',
                                position: 'top-center'
                            })
                        }
                        else {
                            this.$vs.notify({
                                title: 'Ошибка',
                                text: 'Ошибка !!!',
                                color: 'danger',
                                position: 'top-center'
                            })
                        }
                    }).catch(error => {
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Ошибка !!!',
                            color: 'danger',
                            position: 'top-center'
                        })
                    })
                }
            },
            validateNumberDecimal: event => {
                const charCode = String.fromCharCode(event.keyCode);
                if (!/[0-9,.]/.test(charCode)) {
                    event.preventDefault();
                }
            },
        },
        mounted(){
             this.getDataZalogDebtorArr(this.Deb.debtorCredit.id)
        },
    }
</script>

<style scoped>

</style>