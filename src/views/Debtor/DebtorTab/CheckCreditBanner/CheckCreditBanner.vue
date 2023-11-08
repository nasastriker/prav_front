<template>
  <div v-if="typeof Deb.checkCreditData != 'undefined' && Deb.checkCreditData.result"
       class="check-credit-status-banner">
    <div style="display:flex;">
      <div style="margin-left: 5px">
        <feather-icon icon="AlertCircleIcon" svgClasses="h-10 w-10"/>
      </div>
      <div style="margin-left: 25px">
        <div>По статусу {{ Deb.checkCreditData.status_name }} не будет дальнейших действий по причине:</div>
        <div v-for="(item, index) in Deb.checkCreditData.data">
          {{ index + 1 }}. Поле <b>{{ item.var_comment }}</b> {{ item.var_condition }} <b>{{ checkValue(item) }}</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  components: {},
  data() {
    return {}
  },
  mounted() {


  },
  computed: {
    ...mapGetters([
      'User', 'Deb'
    ]),
  },
  methods: {
    checkValue(item) {
      if (item.value == null) {
        return 'Пусто'
      }
      if (item.var_type == 'tinyint') {
        if (item.value == 0) {
          return 'Выключено'
        } else {
          return 'Включено'
        }
      }
      return item.value
    },
  },
}
</script>

<style lang="scss">
.check-credit-status-banner {
  background-color: red;
  padding: 15px;
  margin-top: 10px;
  margin-bottom: 20px;
  color: white;
  border-radius: 10px;
}
</style>
