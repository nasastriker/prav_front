<template>
    <div>
     <template v-if="(params.type_f=='date')">
         <vs-input  type="date" style="max-width: 120px;margin-left: -25px" v-model="dateBegin"  @blur="onBlur"/>
      </template>
      <template v-else-if="(params.type_f=='status_list')">
        <Select2 v-model="listIdStat" :options="FsspHodCreditStatusList" style="margin-left: -25px" :settings="{ width: '138'}" @select="mySelectEvent($event)" />
      </template>
       <template v-else>
       <vs-input  v-model="textFilter" style="margin-left: -30px" @blur="onInput"/>
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
          listIdStat: 'all',
          textFilter: '',
          dateBegin: '',
          popupDate: false,
        }
      },
      mounted() {
        if (this.params.emitFilter != 'undefined')
          this.$root.$on(this.params.emitFilter, this.onClear)
      },
      computed: {
        ...mapGetters([
          'FsspHodCreditStatusList'
        ]),
      },
      methods: {
        mySelectEvent(arr) {
          this.params.updateSearchField(arr.id, this.params.field, this.params.type_f)
        },
        onInput(event) {
          this.updateSearchField()
        },
        onBlur(event) {
          this.params.updateSearchField(this.dateBegin, this.params.field, this.params.type_f)
        },
        onClear() {
          this.dateBegin = '';
          this.textFilter = '';
          this.listIdStat = 'all';
        },
        updateSearchField() {
          this.params.updateSearchField(this.textFilter, this.params.field, this.params.type_f)
        },
      }
    })
</script>

<style scoped>

</style>