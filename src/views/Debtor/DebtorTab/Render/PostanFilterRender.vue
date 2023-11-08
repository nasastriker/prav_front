<template>
    <div>

     <template v-if="(params.type_f=='date')">
         <vs-input  type="date" style="max-width: 150px" v-model="dateBegin"  @blur="onBlur"/>
      </template>
      <template v-else-if="(params.type_f=='list')">
        <Select2 v-model="listId" :options="PostanDocTypes" style="margin-left: -24px" :settings="{ width: '280'}" @select="mySelectEvent($event)" />
      </template>
       <template v-else>
       <vs-input  v-model="textFilter"  @blur="onInput"/>
      </template>




    </div>
</template>

<script>
    import Vue from "vue"
    import vSelect from 'vue-select'
    import {mapGetters} from "vuex";
    import Select2 from 'vue3-select2-component';
    export default Vue.extend({
   //   name: 'DebtorFilterRender',
      components: {
        vSelect,Select2
      },
      data() {
        return {
            listId:'all',
            textFilter:'',
            dateBegin:'',
            popupDate:false,
        }
    },
    mounted(){
    if(this.params.emitFilter!='undefined')
    this.$root.$on(this.params.emitFilter,this.onClear)
        //this.textFilter=this.params.title
    },
      computed: {
        ...mapGetters([
          'PostanDocTypes'
        ]),
      },
    methods: {
      mySelectEvent(arr){
        this.params.updateSearchField(arr.id, this.params.field, this.params.type_f)
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
      this.listId='Все'
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