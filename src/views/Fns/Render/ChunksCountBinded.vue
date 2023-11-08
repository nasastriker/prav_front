<template>
  <vs-chip class="ag-grid-cell-chip" :color="chipColor(params.value)">
    <span>
      {{ params.value }}
    </span>
  </vs-chip>
</template>

<script>
    export default {
        mounted(){},
        computed: {
          chipColor() {
            return (value) => {
              if (value > 0) return 'success'
              else return 'danger'
            }
          }
        },
    }
</script>

<style lang="scss" scpoped>
</style>
