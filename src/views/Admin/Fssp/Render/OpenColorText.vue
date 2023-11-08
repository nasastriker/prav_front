<template>
  <div>
    <span v-if="params.data.active">
      {{ params.value }}
    </span>
    <span v-else style="color: #c2c2c2">
      {{ params.value }}
    </span>
  </div>
</template>

<script>
    export default {
        data () {
            return {
            }
        },
    }
</script>
