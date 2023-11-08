<template>
  <div>
    <span v-if="params.data.status == 0">{{ params.value }}</span>
    <span v-else style="color: #c2c2c2">{{ params.value }}</span>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scpoped>
</style>
