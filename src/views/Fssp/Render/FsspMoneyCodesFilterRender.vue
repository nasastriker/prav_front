<template>
  <div>
    <template v-if="(params.type_f=='date')">
      <vs-input type="date" style="max-width: 150px" v-model="dateBegin" @blur="onBlur"/>
    </template>
    <template v-else-if="(params.type_f=='chbox')">
      <vs-checkbox v-model="chBoxChange" @input="chBoxInput">
        Пусто
      </vs-checkbox>
    </template>
    <template v-else>
      <vs-input v-model="textFilter" style="margin-left: -30px;" @blur="onInput"/>
    </template>
  </div>
</template>

<script>
import Vue from "vue"

export default Vue.extend({
  components: {},
  data() {
    return {
      textFilter: '',
      dateBegin: '',
      chBoxChange: 0,
      popupDate: false,
    }
  },
  mounted() {
    if(this.params.emitFilter!='undefined')
      this.$root.$on(this.params.emitFilter,this.onClear)
    if(this.params.emitSet!='undefined')
      this.$root.$on(this.params.emitSet,this.onSet)
  },
  computed: {},
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
              this.dateBegin=fields[this.params.field].find
              break;
            }
            case 'chbox': {
              this.chBoxChange=fields[this.params.field].find
              break;
            }
          }
        }

      }
    },
    onInput(event) {
      if((this.textFilter.length>3)||(this.textFilter.length==0))this.updateSearchField()
    },
    chBoxInput(){
      this.params.updateSearchField(this.chBoxChange, this.params.field, this.params.type_f)
    },
    onBlur(event) {
      this.params.updateSearchField(this.dateBegin, this.params.field, this.params.type_f)
    },
    onClear() {
      this.textFilter = '';
      this.dateBegin = '';
      this.chBoxChange = 0;

      let valClear;
      switch(this.params.type_f){
        case 'string':{
          valClear=''
          break;
        }
        case 'date': {
          valClear=''
          break;
        }
        case 'chbox': {
          valClear=0
          break;
        }
      }
      this.params.updateSearchField(valClear, this.params.field, this.params.type_f, true);
    },
    updateSearchField() {
      this.params.updateSearchField(this.textFilter, this.params.field, this.params.type_f)
    },
  }
})
</script>

<style scoped>

</style>