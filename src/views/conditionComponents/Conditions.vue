<template>
   <div>
       <fieldset class="f" style="margin-top: 10px">
           <legend class="l">Условия для выборки кредитов:</legend>
           <div class="vx-row">
               <div class="vx-col m-1/5">
                    <vs-button color="success"  style="margin-left: 5px;margin-top: 5px" @click="addCondition">Добавить условие</vs-button>
               </div>
           <div class="vx-col m-1/5">
               <div class="dropdown-button-container">
                   <vs-dropdown>
                       <vs-button class="btn-drop"  style="margin-top: 5px" type="gradient" icon="more_horiz">Список условий</vs-button>
                       <vs-dropdown-menu>
                           <vs-dropdown-item>
                               <vs-button  @click="popListLoad=true">Загрузить условия из списка</vs-button>
                           </vs-dropdown-item>
                           <vs-dropdown-item>
                               <vs-button @click="popListSave=true"> Сохранить условия в список</vs-button>
                           </vs-dropdown-item>
                       </vs-dropdown-menu>
                   </vs-dropdown>
               </div>
           </div>

           </div>
           <ag-grid-vue
                   style="height: 200px;margin-left: 10px;margin-right: 10px"
                   ref="agGridTable"
                   :components="components"
                   :gridOptions="gridOptions"
                   class="ag-theme-material w-100 my-4 ag-grid-table"
                   :columnDefs="columnDefs"
                   :defaultColDef="defaultColDef"
                   :rowData="ConditionVarsArr"
                   rowSelection="multiple"
                   colResizeDefault="shift"
                   :animateRows="true"
                   @rowDoubleClicked="onrowDoubleClicked"
                   :floatingFilter="false"
                   :pagination="false"
                   :enableRtl="$vs.rtl"
                   :overlayNoRowsTemplate="'Нет условий'"
                   :rowClassRules="rowClassRules">
           </ag-grid-vue>
       </fieldset>
       <vs-popup classContent="popup-example" title="Сохранить" :active.sync="popListSave">
               <div>
                   <h6 style="color: deepskyblue;">Сохранить список условия как ...</h6>
                   <vs-input style="margin-top: 10px" v-model="nameList"></vs-input>
                   <div style="margin-top: 10px;text-align: center">
                       <vs-button @click="saveList">Сохранить</vs-button>
                   </div>
               </div>
       </vs-popup>
       <vs-popup classContent="popup-example" title="Загрузить условия из списка" :active.sync="popListLoad">
           <div>
               <ConditionVarList @load="copyConditionFromList"></ConditionVarList>
           </div>
       </vs-popup>
       <vs-popup classContent="popup-example" title="Условие" :active.sync="popAdd">
           <div style="height: 300px">
               <!--<div>-->
                   <!--<vs-radio vs-value="0" v-model="formulaVarRatio" @input="clearFormulaVar">Переменная</vs-radio>-->
                   <!--<vs-radio vs-value="1" v-model="formulaVarRatio" @input="clearVar">Формула</vs-radio>-->
               <!--</div>-->
               <!--<div v-if="formulaVarRatio==0">-->
               <div>
               <span v-if="status.newVar" style="color:blue"> Введите название переменной (например <span style="color:green"> ${dc_number_dog}</span>) и нажмите Enter</span>
               <span v-if="status.checkVar" style="color:green">Переменная распознана <span v-if="ConditionVar.description!==''">({{ConditionVar.description}})</span></span>
               <span v-if="status.errVar" style="color:red">{{ConditionVar.Var.error}}</span>
               <vs-input v-model="ConditionVar.var"  @keyup.enter="addVar" @input="inputVar"></vs-input>
               <div v-if="status.conVar" style="margin-top: 10px;">
                   <span  style="color:blue">Выберите условие</span>
               <v-select  v-if="ConditionVar.   type==='int'||ConditionVar.type==='decimal'||ConditionVar.type==='bigint'"  style="margin-bottom: 10px"  :options="Con.intAndDecimalValue"   v-model="ConditionVar.var_condition"  @input="changeCondition"></v-select>
               <v-select  v-if="ConditionVar.   type==='tinyint'"  style="margin-bottom: 10px"  :options="Con.tinyintValue"   v-model="ConditionVar.var_condition" @input="changeCondition" ></v-select>
               <v-select  v-if="ConditionVar.   type==='varchar'||ConditionVar.type==='text'"  style="margin-bottom: 10px"  :options="Con.varcharAndNextValue"   v-model="ConditionVar.var_condition" @input="changeCondition" ></v-select>
               <v-select  v-if="ConditionVar.   type==='date'"  style="margin-bottom: 10px"  :options="Con.dateValue"   v-model="ConditionVar.var_condition" @input="changeCondition" ></v-select>
               </div>
               <div v-if="status.valueVar" style="margin-top: 10px">
                   <span  style="color:blue">Установите значение переменной</span>
                   <vs-input v-if="ConditionVar.type==='int'||ConditionVar.type==='bigint'" v-model="ConditionVar.value" @keypress="validateNumberInt"></vs-input>
                   <vs-input v-if="ConditionVar.type==='decimal'" v-model="ConditionVar.value" @keypress="validateNumberDecimal"></vs-input>
                   <vs-input v-if="ConditionVar.type==='varchar'||ConditionVar.type==='text'" v-model="ConditionVar.value" ></vs-input>
                   <vs-input v-if="ConditionVar.type==='date'" type="date" v-model="ConditionVar.value"></vs-input>
                   <div v-if="ConditionVar.type==='tinyint'">
                       <vs-radio vs-value="1" v-model="ConditionVar.value">Да</vs-radio>
                       <vs-radio vs-value="0" v-model="ConditionVar.value">Нет</vs-radio>
                    </div>
               </div>
               </div>
               <!--<div v-if="formulaVarRatio==1">-->
                   <!--<span v-if="status.newVar" style="color:blue"> Введите формулу (формула начинается со знака "="например <span style="color:green"> =${date}</span>) и нажмите Enter</span>-->
                   <!--<textarea class="w-full" rows="3" v-model="ConditionVar.formula_var" @keyup.enter="addFormula(ConditionVar.formula_var)"></textarea>-->

               <!--</div>-->
               <div style="margin-top: 10px;text-align: center">
                   <vs-button v-if="status.valueVar" size="normal" @click="save">Сохранить </vs-button>
               </div>
           </div>
       </vs-popup>
   </div>
</template>

<script>
    import r from '../../route';
    import axios from '../../axios'
    import { mapActions,mapGetters } from 'vuex'
    import operationConditionVars from './Render/operationConditionVars.vue'
    import ConditionVarList from './ConditionVarList.vue'
    export default {
        components:{
            operationConditionVars,ConditionVarList
        },
        props:[],
        data(){
            return {
                formulaVarRatio:1,
                formulaValueRation:1,
                nameList:'',
                listConditions:[],
                status: {
                    newVar: true,
                    checkVar: false,
                    errVar: false,
                    conVar: false,
                    valueVar: false,
                    checkVarFormula:false,
                },
                Con:{
                    intAndDecimalValue:['равно','больше','меньше','больше или равно','меньше или равно','не равно'],
                    varcharAndNextValue:['равно','содержит','больше или равно','меньше или равно','не равно'],
                    tinyintValue:['равно','не равно'],
                    dateValue:['равно','больше','меньше','больше или равно','меньше или равно','не равно'],
                },
                ConditionVar:{
                    id:'new',
                    idtask:0,
                    var:'',
                    var_condition:'',
                    value:'',
                    type:'',
                    description:'',
                },
                popAdd:false,
                popListSave:false,
                popListLoad:false,
                gridApi: null,
                gridOptions: {},
                rowClassRules: null,
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [
                    {
                        headerName: 'Переменная',
                        field: 'var',
                        width: 200
                    },
                    {
                        headerName: 'Условие',
                        field: 'var_condition',
                        width: 150
                    },
                    {
                        headerName: 'Значение',
                        field: 'value',
                        width: 200
                    },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        width: 100,
                        cellRendererFramework: 'operationConditionVars',
                        cellRendererParams: {
                            edit: this.edit.bind(this),
                        },
                    },


                ],
                components: {
                    operationConditionVars
                }
            }
        },
        computed: {
            ...mapGetters([
                'ConditionVarsArr',
            ]),
        },
        methods:{
            ...mapActions([
                'getDataConditionVars','getDataConditionVarOnce','getDataConditionListVars'
            ]),
            copyConditionFromList(name){
                this.getDataConditionListVars(name).then(res=>{
                    if(res.result){
                        axios.post(r('taskConditions.update'), {
                            params: {
                                method: 'addConditionFromList',
                                param: {id_task:this.$route.params.id,data:res.data}
                            }
                        }).then(res=>{
                            if(res.data.result){
                                this.getDataConditionVars(this.$route.params.id)
                                this.popListLoad=false
                            }
                        })
                    }
                })
            },

            saveList(){
                axios.post(r('taskConditions.update'), {
                    params: {
                        method: 'saveList',
                        param: {name:this.nameList, data:this.ConditionVarsArr}
                    }
                }).then(res=>{
                    if(res.data.result){
                         this.$vs.notify({
                                                         title: 'Успешно',
                                                         text: 'Список сохранен!!!',
                                                         color: 'success',
                                                         position: 'top-center'
                                                     })
                    }
                    else{
                        this.$vs.notify({
                                                        title: 'Ошибка',
                                                        text: 'Ошибка !!! '+res.data.error||'',
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
            save(){

                axios.post(r('taskConditions.update'), {
                    params: {
                        method: 'saveVar',
                        param: this.ConditionVar
                    }
                }).then(res=>{
                    if(res.data.result){
                         this.$vs.notify({
                                                         title: 'Успешно',
                                                         text: 'Успешно!!!',
                                                         color: 'success',
                                                         position: 'top-center'
                                                     })
                        this.popAdd=false
                        this.getDataConditionVars(this.$route.params.id)
                    }
                    else{
                        this.$vs.notify({
                                                        title: 'Ошибка',
                                                        text: 'Ошибка '+res.data.error||''+'!!!',
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
            changeCondition(){
                if(this.ConditionVar.var_condition!==null&&this.ConditionVar.var_condition!==''){
                  this.status.valueVar=true
              }
              else {
                  this.status.valueVar=false
              }
            },

            clearVar(){
                this.ConditionVar.var=''
                this.status.newVar=true
                this.status.checkVar=false
                this.status.errVar=false
                this.status.conVar=false
                this.status.valueVar=false

            },
            clearFormulaVar(){
                this.ConditionVar.formula_var=''
            },
            onrowDoubleClicked(event){
                this.edit(event.data.id)

            },
            validateNumberInt: event => {
                const charCode = String.fromCharCode(event.keyCode);
                if (!/[0-9\-]/.test(charCode)) {
                    event.preventDefault();
                }
            },
            validateNumberDecimal: event => {
                const charCode = String.fromCharCode(event.keyCode);
                if (!/[0-9,.\-]/.test(charCode)) {
                    event.preventDefault();
                }
            },
            edit(id){
                if(id==='new'){
                    this.ConditionVar= {
                        id:'new',
                        id_task:this.$route.params.id,
                        var:'',
                        var_condition:'',
                        value:'',
                        type:'',
                        description:'',
                    }
                    this.status.newVar=true
                    this.status.errVar=false
                    this.status.checkVar=false
                    this.status.conVar=false
                    this.status.valueVar=false
                    this.popAdd=true
                }
                else {
                    this.getDataConditionVarOnce(id).then(res=>{
                        if(res.result){
                            this.ConditionVar=res.data
                            this.ConditionVar.type=res.data.type
                            this.ConditionVar.description=res.data.description
                            this.status.newVar=false
                            this.status.errVar=false
                            this.status.checkVar=true
                            this.status.conVar=true
                            this.status.valueVar=true
                            this.popAdd=true
                        }
                    })
                }

            },
            addVar(){

                axios.get(r('taskConditions.index'), {
                    params: {
                        method: 'checkVar',
                        param: this.ConditionVar.var
                    }
                }).then(res=>{
                    if(res.data.result){
                    this.ConditionVar.varWithoutPrefix=res.data.name
                    this.ConditionVar.type=res.data.type
                    this.ConditionVar.description=res.data.description
                    this.status.newVar=false
                    this.status.errVar=false
                    this.status.checkVar=true
                    this.status.conVar=true
                    }
                    else {
                        this.ConditionVar.Var.error=res.data.error
                        this.status.newVar=false
                        this.status.errVar=true
                        this.status.checkVar=false
                        this.status.conVar=false
                        this.status.valueVar=false

                    }
                })
            },
            addFormula(formula){
                axios.get(r('taskConditions.index'), {
                    params: {
                        method: 'checkFormula',
                        param: formula
                    }
                }).then(res=>{
                    if(res.data.result){
                      this.status.checkVarFormula=true
                    }
                    else {
                        this.status.checkVarFormula=false
                        this.$vs.notify({
                                                        title: 'Ошибка',
                                                        text: res.data.error,
                                                        color: 'danger',
                                                        position: 'top-center'
                                                    })
                    }
                })
            },
            addCondition(){

                this.edit('new')
            },
            inputVar(){
                this.status.newVar=true
                this.status.errVar=false
                this.status.checkVar=false
                this.status.conVar=false
                this.status.valueVar= false
                delete this.ConditionVar.type
            }

        },
        mounted(){
            this.getDataConditionVars(this.$route.params.id)
        },
    }
</script>

<style>
    .l {
        color: #a00;
        padding: 0 10px;
    }
</style>
