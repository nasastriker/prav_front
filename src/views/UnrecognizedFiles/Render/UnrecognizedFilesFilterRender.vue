<template>
    <div>
     <template v-if="(params.type_f=='date')">
         <vs-input  type="date" style="max-width: 170px;margin-left: -25px" v-model="dateBegin"  @blur="onBlur"/>
      </template>
      <template v-else-if="(params.type_f=='list_record_status')">
        <Select2 v-model="listId" :modelValue="listId":options="UnrecognizedFilesRecordStatuses" :placeholder="params.placeholder"  style="margin-left: -25px" :settings="{ width: '162'}" @select="mySelectEvent($event)" />
      </template>
      <template v-else-if="(params.type_f=='list_from_type')">
        <Select2 v-model="listIdFt" :modelValue="listIdFt":options="UnrecognizedFilesFromTypes" :placeholder="params.placeholder" style="margin-left: -25px" :settings="{ width: '420'}" @select="mySelectEvent($event)" />
      </template>
       <template v-else>
       <vs-input  v-model="textFilter" style="margin-left: -30px"  :placeholder="params.placeholder" @blur="onInput"/>
      </template>
    </div>
</template>

<script>
    import Vue from "vue";
    import {mapGetters} from "vuex";
    import Select2 from 'vue3-select2-component';
    export default Vue.extend({
      components: {
        Select2
      },
      data() {
        return {
            listId:'all',
            listIdFt:'all',

            textFilter:'',
            dateBegin:'',
            popupDate:false,
        }
    },
    mounted(){
      if(this.params.emitFilter!='undefined')
        this.$root.$on(this.params.emitFilter,this.onClear)
    },
      computed: {
        ...mapGetters([
          'UnrecognizedFilesRecordStatuses','UnrecognizedFilesFromTypes'
        ]),
      },
    methods: {
      mySelectEvent(arr){
        this.params.updateSearchField(arr.id, this.params.field, this.params.type_f)
      },
    onInput(event){
        this.updateSearchField()
    },
    onBlur(event){
        this.params.updateSearchField(this.dateBegin, this.params.field, this.params.type_f)
    },
    onClear(){
      this.dateBegin=''
      this.textFilter=''
        this.listId='all'
      this.listIdFt='all'
      // this.params.updateSearchField(this.textFilter, this.params.field, this.params.type_f, true)
    },
    updateSearchField(){
        this.params.updateSearchField(this.textFilter, this.params.field, this.params.type_f)
    },
    }
    })
</script>

<style scoped>

</style>