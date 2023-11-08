<template>
  <div >
    <div v-if="params.value != null">
      <span style="color: blue" class="hover:text-primary cursor-pointer" @click="showPopupDataIpOne">Данные</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showText:false,
    }
  },
  methods: {
    showPopupDataIpOne() {
      this.params.showPopupDataIp(this.params.value)
    },
  },
}
</script>
