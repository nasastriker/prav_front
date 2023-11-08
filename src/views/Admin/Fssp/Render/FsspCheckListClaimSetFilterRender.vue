<template>
  <div>
    <template v-if="(params.type_f=='date')">
      <vs-input type="date" style="max-width: 170px;margin-left: -25px" v-model="dateBegin" @blur="onBlur"/>
    </template>
    <template v-else>
      <vs-input v-model="textFilter" style="margin-left: -30px;width: 750px" :placeholder="params.placeholder"
                @blur="onInput"/>
    </template>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  components: {},
  data() {
    return {
      textFilter: '',
      dateBegin: '',
      popupDate: false,
    }
  },
  mounted() {
    if (this.params.emitFilter != 'undefined')
      this.$root.$on(this.params.emitFilter, this.onClear)
  },
  methods: {
    onInput(event) {
      this.updateSearchField()
    },
    onBlur(event) {
      this.params.updateSearchField(this.dateBegin, this.params.field, this.params.type_f)
    },
    onClear() {
      this.dateBegin = ''
      this.textFilter = ''
    },
    updateSearchField() {
      this.params.updateSearchField(this.textFilter, this.params.field, this.params.type_f)
    },
  }
})
</script>

<style scoped>
</style>