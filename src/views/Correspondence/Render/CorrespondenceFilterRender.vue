<template>
    <div>

        <template v-if="(params.type_f=='date')">
            <vs-input  type="date" style="margin-left: -30px; min-width: 210px" v-model="dateBegin"  @blur="onBlur" @keyup.enter="onBlur"/>
        </template>
        <template v-if="params.type_f=='string'">
            <vs-input  style="margin-left: -30px;min-width: 300px;margin-top: 2px" v-model="textFilter" :placeholder="params.placeholder" @blur="onInput" @keyup.enter="onInput"/>
        </template>




    </div>
</template>

<script>
    import Vue from "vue"
    import vSelect from 'vue-select'
    export default Vue.extend({
        //   name: 'DebtorFilterRender',
        components: {
            vSelect,
        },
        data() {
            return {
                textFilter:'',
                dateBegin:'',
                id_checkbox:'',
                popupDate:false,
            }
        },
        mounted(){
            if(this.params.emitFilter!='undefined')
                this.$root.$on(this.params.emitFilter,this.onClear)
            if(this.params.emitSet!='undefined')
                this.$root.$on(this.params.emitSet,this.onSet)
        },
        methods: {
            onSet(fields){

                if(typeof fields[this.params.field]!='undefined'){
                    if (fields[this.params.field].find!=''){
                        switch(this.params.type_f){
                            case 'string':{
                                this.textFilter=fields[this.params.field].find
                                break;
                            }
                            case 'date': {
                                this.dateBegin==fields[this.params.field].find
                                break;
                            }
                        }
                    }

                }
            },
            onInput(event){
                if((this.textFilter.length>3)||(this.textFilter.length==0))this.updateSearchField()
            },
            onBlur(event){
                this.params.updateSearchField(this.dateBegin, this.params.field, this.params.type_f)
            },
            onClear(){
                this.dateBegin=''
                this.textFilter=''
                this.params.updateSearchField(this.textFilter, this.params.field, this.params.type_f, true)
            },
            updateSearchField(){

                this.params.updateSearchField(this.textFilter, this.params.field, this.params.type_f)
            },
        }
    })
</script>




<style scoped>

</style>