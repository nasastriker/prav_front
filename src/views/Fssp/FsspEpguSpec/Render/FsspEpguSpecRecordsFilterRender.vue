<template>
  <div>
    <vs-input v-model="textFilter" style="margin-left: -29px;width: 1330px;" @input="onInput"/>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  components: {},
  data() {
    return {
      textFilter: '',
    }
  },
  mounted() {
    if (this.params.emitFilter != 'undefined')
      this.$root.$on(this.params.emitFilter, this.onClear)
  },
  methods: {
    onInput() {
      if ((this.textFilter.length > 3) || (this.textFilter.length == 0)) this.updateSearchField()
    },
    onClear() {
      this.textFilter = '';
      this.params.updateSearchField(this.textFilter, this.params.field, this.params.type_f, true);
    },
    updateSearchField() {
      this.params.updateSearchField(this.textFilter, this.params.field, this.params.type_f)
    },
  }
})
</script>

<style scoped>

</style>