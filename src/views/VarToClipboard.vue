<template>
    <h6 class="h6" v-if="User.pag.showPer" @dblclick="copy(name)"><span v-if="!copied" style="color: orange ">{{name}}</span><span v-if="copied" style="color:green">Скопировано в буфер обмена</span></h6>
</template>

<script>
import Vue from 'vue'
import {  mapGetters } from 'vuex'
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
export default {
  components: {},
  props:['name'],
  data () {
    return {
      copied: false
    }
  },
  computed:{
    ...mapGetters(['User'])
  },
  // mounted: {},
  methods: {
    copy (data) {
      data = `\${${  data  }}`
      this.$copyText(data)
      this.copied = true
      setTimeout(() => { this.copied = false }, 750)

    }
  }
}
</script>

<style scoped>

</style>
