<template>
    <div>
        <template v-if="item.type==1">
            <template v-if="item.rec==0">

                <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ заемщика</span>
                                            <span style="color: red" v-if="item.shab==1">Шаблон</span>  {{ item.name }}
                                               </span>

                </strong>
            </template>
            <template v-if="item.rec==1">

                <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ цессии</span> <span style="color: red" v-if="item.shab==1">Шаблон</span> {{ item.name }}</span> </strong>
            </template>
            <template v-if="item.rec==2">

                <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ организации</span><span style="color: red" v-if="item.shab==1">Шаблон</span>  {{ item.name }}</span> </strong>
            </template>

        </template>
        <template v-if="item.group===true">
            <strong><GroupDocuments :items="item" :index="index"></GroupDocuments> </strong>
        </template>
        <template v-if="item.type!=1&&item.typeVar!=1&&item.group!==true">
            <strong ><span style="cursor: pointer"  ><span style="color: #185d02">Шаблон</span> {{ item.name }}</span> </strong>

        </template>
        <template v-if="item.typeVar===1">
            <strong ><span style="cursor: pointer"  ><span style="color: #185d02">Текст</span> {{ item.name }}</span> </strong>

        </template>
        <vs-button size="small" @click="changeOperationItem">Тип условия "{{operation_item}}"</vs-button>
        <fieldset class="f" style="margin-top: 4px">
        <legend class="l">.   Условие</legend>
        <div class="vx-col " v-for="(condition,index) in item.condition"  style="margin-top: 5px;margin-bottom: 5px">

            <!--<legend class="l">.   {{item.name}}</legend>-->

            <div  class="vx-row"  style="margin-left: 5px;margin-top: 5px">

            <vs-input class="w-100"  size="small" style="width:100px;margin-left: 5px" v-model="condition.var" readonly></vs-input>
            <vs-input class="w-100"  size="small" style="width:100px;margin-left: 5px" v-model="condition.operator" readonly></vs-input>
            <template v-if="(typeof condition.formula!=='undefined')&&(condition.formula!=='')&&(condition.formula!==null)">
                <vs-input  class="w-100"  size="small" style="width:100px;margin-left: 5px" v-model="condition.formula" readonly></vs-input>
            </template>
            <template v-else>
                <vs-input class="w-100"  size="small" style="width:100px;margin-left: 5px" v-model="condition.value" readonly></vs-input>
            </template>
            <feather-icon  icon="Edit2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="edit(condition,index)" />
            <feather-icon  icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="deleteConfirm(index)" />

        </div>


        </div>
            <feather-icon style="margin-left: 5px;margin-top: 5px" icon="PlusCircleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="add" />
        </fieldset>
        <vs-popup classContent="popup-example" title="Условие" :active.sync="popup">
            <div style="height: 300px">
                <span v-if="status.newVar" style="color:blue"> Введите название переменной (например <span style="color:green"> ${dc_number_dog}</span>) и нажмите Enter</span>
                <span v-if="status.checkVar" style="color:green">Переменная распознана <span v-if="ConditionVar.description!==''">({{ConditionVar.description}})</span></span>
                <span v-if="status.errVar" style="color:red">{{ConditionVar.Var.error}}</span>
                <vs-input v-model="ConditionVar.var"  @keyup.enter="addVar" @input="inputVar"></vs-input>
                <div v-if="status.conVar" style="margin-top: 10px;">
                    <span  style="color:blue">Выберите условие</span>
                    <v-select  v-if="ConditionVar.type==='int'||ConditionVar.type==='decimal'||ConditionVar.type==='bigint'"  style="margin-bottom: 10px"  :options="Con.intAndDecimalValue"   v-model="ConditionVar.var_condition"  @input="changeCondition"></v-select>
                    <v-select  v-if="ConditionVar.type==='tinyint'"  style="margin-bottom: 10px"  :options="Con.tinyintValue"   v-model="ConditionVar.var_condition" @input="changeCondition" ></v-select>
                    <v-select  v-if="ConditionVar.type==='varchar'||ConditionVar.type==='text'"  style="margin-bottom: 10px"  :options="Con.varcharAndNextValue"   v-model="ConditionVar.var_condition" @input="changeCondition" ></v-select>
                    <v-select  v-if="ConditionVar.type==='date'"  style="margin-bottom: 10px"  :options="Con.dateValue"   v-model="ConditionVar.var_condition" @input="changeCondition" ></v-select>
                </div>
                <div v-if="status.valueVar" style="margin-top: 10px">
                    <span  style="color:blue">{{zfxNad}} <span style="color: green" @click="changeZfx">({{zfxname}})</span></span>
                        <div v-if="zfx" style="margin-left:20px">
                            <vs-input v-if="ConditionVar.type==='int'||ConditionVar.type==='bigint'" v-model="ConditionVar.value" @keypress="validateNumberInt"></vs-input>
                            <vs-input v-if="ConditionVar.type==='decimal'" v-model="ConditionVar.value" @keypress="validateNumberDecimal"></vs-input>
                            <vs-input v-if="ConditionVar.type==='varchar'||ConditionVar.type==='text'" v-model="ConditionVar.value" ></vs-input>
                            <vs-input v-if="ConditionVar.type==='date'" type="date" v-model="ConditionVar.value"></vs-input>
                            <div v-if="ConditionVar.type==='tinyint'">
                                <vs-radio vs-value="1" v-model="ConditionVar.value">Да</vs-radio>
                                <vs-radio vs-value="0" v-model="ConditionVar.value">Нет</vs-radio>
                            </div>
                        </div>
                        <vs-textarea v-if="!zfx" v-model="ConditionVar.formula"></vs-textarea>
                        <div style="margin-left: 20px;margin-top:15px;text-align: center">
                            <vs-button @click="save">Сохранить</vs-button>
                        </div>
                    </div>
            </div>
        </vs-popup>
    </div>

</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    import vSelect from 'vue-select'
    import r from '../../../../route';
    import axios from '../../../../axios'
    import GroupDocuments from './GroupDocuments.vue'
    export default {
        components:{
            'v-select': vSelect,GroupDocuments
        },
        props:['item','index'],
        data(){
            return {
                operation:[{id:'or',name:'ИЛИ'},{id:'and',name:'И'}],
                popup:false,
                nameList:'',
                zfx:true,
                zfxname:'Нажмите на надпись если хотите задать формулу',
                zfxNad:'Установите значение переменной',
                status: {
                    newVar: true,
                    checkVar: false,
                    errVar: false,
                    conVar: false,
                    valueVar: false,
                },
                ind:'new',
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
                    formula:'',
                },
                // operators:['меньше или равно','больше или равно','меньше','больше','равно','содержит'],
            }
        },

        mounted(){
            if(typeof this.item.operation_condition==='undefined')this.item.operation_condition='and';
            if(this.item.operation_condition!=='or')this.item.operation_condition='and'
            if(this.ind==='new'){
                this.zfx=true
                this.ConditionVar={
                    id:'new',
                        idtask:0,
                    var:'',
                        var_condition:'',
                        value:'',
                        type:'',
                        description:'',
                        formula:'',
                }
            }
            else {
                if(typeof this.item.condition.formula !=='undefined'&&this.item.condition.formula!=''){
                    this.zfx=false
                    this.ConditionVar.value=''
                }
            }

        },
        computed: {
            ...mapGetters([
                'ConditionVarsArr',
            ]),
            operator_con(){
                return this.item.operation_condition
            },
            operation_item(){
                 return (this.operation.find((el,index)=>{
                    return el.id===this.item.operation_condition
                })).name
            }
        },
        methods: {
            ...mapActions([
                'getDataConditionVars', 'getDataConditionVarOnce', 'getDataConditionListVars'
            ]),

            changeZfx(){
                this.zfx=!this.zfx
                this.zfxname=this.zfx?'Нажмите на надпись если хотите задать формулу':'Нажмите на надпись если хотите задать значением'
                this.zfxNad=this.zfx?'Установите значение переменной':'Введите формулу'
                if(this.zfx)this.ConditionVar.value=''
                else this.ConditionVar.formula=''
            },
            save(){
                if(this.ind==='new')this.item.condition.push({var:this.ConditionVar.var,operator:this.ConditionVar.var_condition,value:this.ConditionVar.value,type:this.ConditionVar.type,formula:this.ConditionVar.formula})
                else this.item.condition[this.ind]={var:this.ConditionVar.var,operator:this.ConditionVar.var_condition,value:this.ConditionVar.value,type:this.ConditionVar.type,formula:this.ConditionVar.formula}
                // this.$emit('updateItem',this.item,this.index)
                this.popup=false
            },

            changeOperationItem(){
                this.item.operation_condition=(this.item.operation_condition==='and')?'or':'and'
            },

            edit(condition,index) {
                this.ind=index
                this.ConditionVar.var=condition.var
                this.ConditionVar.var_condition=condition.operator
                this.ConditionVar.value=condition.value
                this.ConditionVar.type=condition.type
                this.status.newVar=false
                this.status.errVar=false
                this.status.checkVar=true
                this.status.conVar=true
                this.status.valueVar=true
                this.popup = true
            },
            add() {
                this.ind='new'
                this.ConditionVar.var=''
                this.ConditionVar.var_condition=''
                this.ConditionVar.value=''
                this.ConditionVar.type=''
                this.status.newVar=true
                this.status.errVar=false
                this.status.checkVar=false
                this.status.conVar=false
                this.status.valueVar=false
                this.popup = true
            },
            deleteConfirm(index) {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Внимание',
                    text: 'Вы действительно хотите удалить это условие',
                    accept: this.deleLocal,
                    cancel:this.cancel,
                    acceptText: 'Да',
                    cancelText: 'Нет',
                    parameters: index
                })
            },

            deleLocal(index){
                this.item.condition.splice(index,1)
            },

            validateNumberInt: event => {
                const charCode = String.fromCharCode(event.keyCode);
                if (!/[0-9\-nul]/.test(charCode)) {
                    event.preventDefault();
                }
            },
            validateNumberDecimal: event => {
                const charCode = String.fromCharCode(event.keyCode);
                if (!/[0-9,.\-nul]/.test(charCode)) {
                    event.preventDefault();
                }
            },
           /* edit(id){
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

            },*/
            changeCondition(){
                if(this.ConditionVar.var_condition!==null&&this.ConditionVar.var_condition!==''){
                    this.status.valueVar=true
                }
                else {
                    this.status.valueVar=false
                }
            },
            update(){
              this.$emit('updateItem',this.item)
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
                        this.$vs.notify({
                                                        title: 'Ошибка',
                                                        text: res.data.error,
                                                        color: 'danger',
                                                        position: 'top-center'
                                                    })

                        this.status.newVar=false
                        this.status.errVar=true
                        this.status.checkVar=false
                        this.status.conVar=false
                        this.status.valueVar=false

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


        }

    }
</script>

<style lang="scss" scpoped>

</style>
