<template>
    <span>



        <fieldset class="f" style="margin-top: 4px;">
            <legend class="l">.    Группа документов</legend>
            <li class="li-border"
                v-for="(item, index) in items.documents"
                :key="index"
                tag="li"
                style="margin-left: 5px"

            >
                <template v-if="item.type==1">
                    <template v-if="item.rec==0">

                        <strong>
                                    <span style="cursor: pointer"  >
                                        <span style="color: #b57f1b">Документ заемщика</span>
                                        <span style="color: red" v-if="item.shab==1">Шаблон </span>
                                        {{ item.name }} <span><feather-icon  icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="deleteConfirm(index)" /></span>
                                    </span>
                        </strong>
                    </template>
                    <template v-if="item.rec==1">

                        <strong><span style="cursor: pointer"><span style="color: #b57f1b">Документ цессии</span> <span style="color: red" v-if="item.shab==1">Шаблон </span>{{ item.name }} <span><feather-icon  icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="deleteConfirm(index)" /></span></span> </strong>
                    </template>
                    <template v-if="item.rec==2">

                        <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ организации</span> <span style="color: red" v-if="item.shab==1">Шаблон </span>{{ item.name }} <span><feather-icon  icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="deleteConfirm(index)" /></span></span> </strong>
                    </template>

                </template>
                <template v-else>
                    <template v-if="item.typeVar==1">
                        <strong><span style="cursor: pointer"  ><span style="color: #185d02">Текст</span> {{ item.name }} <span><feather-icon  icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="deleteConfirm(index)" /></span></span> </strong>

                    </template>
                    <template v-if="item.group===true">
                        <strong><span style="cursor: pointer;color:blue"  > {{ item.name }} <span><feather-icon  icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="deleteConfirm(index)" /></span></span> </strong>
                    </template>
                    <template v-else>
                        <strong><span style="cursor: pointer"  ><span style="color: #185d02">Шаблон</span> {{ item.name }} <span><feather-icon  icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="deleteConfirm(index)" /></span></span> </strong>

                    </template>


                </template>

            </li>

            <!--<div class="vx-col " v-for="(condition,index) in item.condition"  style="margin-top: 5px;margin-bottom: 5px">-->

                <!--&lt;!&ndash;<legend class="l">.   {{item.name}}</legend>&ndash;&gt;-->

                <!--<div  class="vx-row"  style="margin-left: 5px;margin-top: 5px">-->

                    <!--<vs-input class="w-100"  size="small" style="width:100px;margin-left: 5px" v-model="condition.var" readonly></vs-input>-->
                    <!--<vs-input class="w-100"  size="small" style="width:100px;margin-left: 5px" v-model="condition.operator" readonly></vs-input>-->
                    <!--<vs-input class="w-100"  size="small" style="width:100px;margin-left: 5px" v-model="condition.value" readonly></vs-input>-->
                    <!--<feather-icon  icon="Edit2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="edit(condition,index)" />-->
                    <!--<feather-icon  icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="deleteConfirm(index)" />-->

                <!--</div>-->


            <!--</div>-->
            <feather-icon style="margin-left: 5px;margin-top: 5px" icon="PlusCircleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="add" />
        </fieldset>
        <vs-popup classContent="popup-example" title="Условие" :active.sync="popup">
            <h6 style="color: #0e84b5;margin-bottom: 5px">Добавте документ в группу двойным кликом левой клавиши мышки </h6>
            <h6 style="color:green;margin-bottom: 10px"> При формировании шаблона в формируемый документ будет добавлен первый существующий документ, если группа документов находится в разделе обязательных и ни одного документа не существует то шаблон перейдет в состояние ошибки</h6>
            <div style="height: 500px;overflow-y: scroll">
                <li class="li-border"
                    v-for="(item, index) in ShabAllArr"
                    v-if="item.type==1"
                    :key="index"
                    tag="li"
                    @dblclick="addToGroup(index)"
                >
                    <template v-if="item.type==1">
                        <template v-if="item.rec==0">

                            <strong>
                                    <span style="cursor: pointer"  >
                                        <span style="color: #b57f1b">Документ заемщика</span>
                                        <span style="color: red" v-if="item.shab==1">Шаблон </span>
                                        {{ item.name }}
                                    </span>
                            </strong>
                        </template>
                        <template v-if="item.rec==1">

                            <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ цессии</span> <span style="color: red" v-if="item.shab==1">Шаблон </span>{{ item.name }}</span> </strong>
                        </template>
                        <template v-if="item.rec==2">

                            <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ организации</span> <span style="color: red" v-if="item.shab==1">Шаблон </span>{{ item.name }}</span> </strong>
                        </template>

                    </template>
                    <!--<template v-else>
                        <template>
                        <template v-if="item.typeVar==1">
                            <strong><span style="cursor: pointer"  ><span style="color: #185d02">Текст</span> {{ item.name }}</span> </strong>

                        </template>
                        <template v-else>
                            <strong><span style="cursor: pointer"  ><span style="color: #185d02">Шаблон</span> {{ item.name }}</span> </strong>

                        </template>
                        </template>

                    </template>-->

                </li>


            </div>

        </vs-popup>
    </span>

</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    import vSelect from 'vue-select'
    import r from '../../../../route';
    import axios from '../../../../axios'
    export default {
        components:{
            'v-select': vSelect,
        },
        props:['items','index'],
        data(){
            return {
                popup:false,
            }
        },

        mounted(){
        },
        computed: {
            ...mapGetters([
                'ShabAllArr',
            ]),
        },
        methods: {
            ...mapActions([
                'getDataConditionVars', 'getDataConditionVarOnce', 'getDataConditionListVars'
            ]),


            addToGroup(index){
                this.items.documents.push(this.ShabAllArr[index])
                this.popup=false
            },

            add() {
                
                this.popup = true
            },
            deleteConfirm(index) {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Внимание',
                    text: 'Вы действительно хотите удалить этот документ из группы',
                    accept: this.deleLocal,
                    cancel:this.cancel,
                    acceptText: 'Да',
                    cancelText: 'Нет',
                    parameters: index
                })
            },

            deleLocal(index){
                this.items.documents.splice(index,1)
            },

            update(){
                this.$emit('updateItem',this.item)
            },
        }

    }
</script>

<style lang="scss" scpoped>

</style>
