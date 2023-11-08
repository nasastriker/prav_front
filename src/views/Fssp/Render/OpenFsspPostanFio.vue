<template>
  <div>
    <span v-if="params.data.id_credit != null">{{ params.value }}</span>
    <span v-else class="hover:text-primary cursor-pointer" style="color:blue;text-decoration: underline;" @click="bindToCreditStart">{{ params.value }}</span>
  </div>
</template>

<script>
export default {
  methods: {
    bindToCreditStart(){
      this.params.bindToCredit(this.params.data.id)
    },
  }
}
</script>

<style lang="scss" scpoped>
</style>
