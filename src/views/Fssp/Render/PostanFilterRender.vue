<template>
    <div>

     <template v-if="(params.type_f=='date')">
         <vs-input  type="date" style="max-width: 150px" v-model="dateBegin"  @blur="onBlur"/>
      </template>
      <template v-else-if="(params.type_f=='list')">
        <Select2 v-model="listId" :modelValue="listId" :options="PostanDocTypes" style="margin-left: -26px" :settings="{ width: '280'}" @select="mySelectEvent($event)" />
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
    mounted() {
      if (typeof this.params.emitFilter != 'undefined') {
        if (typeof this.$root._events.clear_filter_postan_filter != 'undefined') {
          if (this.$root._events.clear_filter_postan_filter.length === 0) {
            this.$root.$on(this.params.emitFilter, this.onClear);
          } else {
            this.$root._events.clear_filter_postan_filter.pop();
            this.$root.$on(this.params.emitFilter, this.onClear);
          }
        } else {
          this.$root.$on(this.params.emitFilter, this.onClear);
        }
      }
      this.$root.$once(this.params.newVal,this.newValListId);
        //this.textFilter=this.params.title
      // console.log(this.$root)
    },
      computed: {
        ...mapGetters([
          'PostanDocTypes'
        ]),
      },
    methods: {
      newValListId(new_val){
        this.listId = new_val;
        // console.log('newValListId ',this.listId)
      },
      mySelectEvent(arr){
        this.$root._events.clear_filter_postan_filter.pop();
        this.$root.$on(this.params.emitFilter, this.onClear);
        this.params.updateSearchField(arr.id, this.params.field, this.params.type_f)
      },
    onInput(event){
        if((this.textFilter.length>3)||(this.textFilter.length==0))this.updateSearchField()
    },
    onBlur(event){
        this.params.updateSearchField(this.dateBegin, this.params.field, this.params.type_f)
    },
    onClear(){
      this.params.updateSearchField('all', this.params.field, this.params.type_f);
      this.listId='all';
    },
    updateSearchField(){
        this.params.updateSearchField(this.textFilter, this.params.field, this.params.type_f)
    },
    }
    })
</script>

<style scoped>

</style>