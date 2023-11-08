<template>
    <div>
     <template v-if="(params.type_f=='date')">
         <vs-input type="date" style="width: 180px;margin-left: -25px" v-model="dateBegin" @blur="onBlur"/>
      </template>
      <template v-else-if="(params.type_f=='list_status_send')">
        <Select2 v-model="listId" :options="FsspHodRecordsFsspStatuses" style="margin-left: -13px" :settings="{ width: '220'}" @select="mySelectEvent($event)" />
      </template>
      <template v-else-if="(params.type_f=='list_recovers')">
        <Select2 v-model="listIdRec" :options="FsspHodRecordRecovererList" style="margin-left: -13px" :settings="{ width: '263'}" @select="mySelectEvent($event)" />
      </template>
       <template v-else>
       <vs-input v-model="textFilter" style="margin-left: -29px;width: 330px;" @input="onInput"/>
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
          listId: 'all',
          listIdRec: 'all',
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
          'FsspHodRecordsFsspStatuses','FsspHodRecordRecovererList'
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
          this.listId = 'all';
          this.listIdRec = 'all';
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