<template>
  <div v-if="params.data.show_info && !FsspGetOrderInfoDataLoadingFlag" style="display: flex">
    <feather-icon icon="InfoIcon" title="Техническая информация по обращению"
                  svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="questGetInfoStart"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'FsspGetOrderInfoDataLoadingFlag'
    ]),
  },
  methods: {
    questGetInfoStart() {
      this.params.questGetInfoData({id_credit: this.params.data.id_credit, number: this.params.data.number});
    },
  }
}
</script>
