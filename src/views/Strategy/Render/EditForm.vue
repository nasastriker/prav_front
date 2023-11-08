<template>
    <div style="padding: 0 15px 0 10px; font-size: 14px; width: 200px; margin-top: 2em">
        <div>
            <strong>Редактирование:</strong>
        </div>
        <hr/>
        <div v-if="cellData && cellData.value">
            <div style="display: block;padding-top: 5px; align-items: baseline">
                <div style="width: 150px; ">
                    Статус:
                </div>
                <div style="flex: auto">
                    <v-select  class="w-50 " :reduce="label => label.id" label="name" v-model="cellData.value.name"  @input="debounce_change" :options="StatussArr"  ></v-select>
                 <!--   <input @focus="$event.target.select()" type="text" @input="debounce_change"
                           v-model="cellData.value.name"/> -->
                </div>
            </div>
            <div style="display: block;padding-top: 5px; align-items: baseline">
                <div style="width: 150px;">
                    Функции:
                </div>
                <div style="flex: auto">
                    <v-select  class="w-50 " :reduce="label => label.id" label="name"  v-model="cellData.value.type"  @input="debounce_change":options="funcStatus(cellData.value.name)"  ></v-select>
                   <!-- <input @focus="$event.target.select()" type="text" @input="debounce_change"
                           v-model="cellData.value.type"/> -->
                </div>
            </div>
        </div>
        <div v-else>

        </div>
        <hr/>
    </div>
</template>

<script>
    import debounce from '../helpers/debounce'
    import { mapActions,mapGetters } from 'vuex'
    import r from '../../../route';
    import axios from '../../../axios'
    import vSelect from 'vue-select'
    export default {
        components: {
            'v-select': vSelect,

        },
        data () {
            return {

                count:0,
                shablon:'',
                action:0,
                status:0,
                type:0,

                data:{
                    setting:[]
                },

            }
        },
        computed: {

            ...mapGetters([
               'StatussArr','TotalStatuss','FuncsArr','TotalFuncs',

            ]),

        },
        name: 'EditForm',
        props: {
            cellData: {
                type: Object
            }
        },
        methods: {
            funcStatus(id_status){
                let arr=[]
                for(let a=0;a<this.FuncsArr.length;a++){
                    if(this.FuncsArr[a].id_status==id_status){
                        arr.push(this.FuncsArr[a])
                    }
                }
                return arr
            },
            // устраняем частые запросы
            debounce_change: debounce(function () {
                // сообщаем об изменениях
                this.$emit('change', this.cellData.value);
            }, 200)
        }
    }
</script>
