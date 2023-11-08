<template>
  <vs-chip class="ag-grid-cell-chip" :color="chipColor(params.value)">
    <span v-if="params.value > 0 && (params.data.status == 4 || params.data.status == 5)" class="hover:text-primary cursor-pointer" @click="showProblemStart">
      {{ params.value }}
    </span>
    <span v-else>
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
              if (value > 0) return 'danger'
              else return 'success'
            }
          }
        },
      methods: {
        showProblemStart(){
          this.params.showProblemChunks(this.params.data.id, 1);
        },
      },
    }
</script>

<style lang="scss" scpoped>
</style>
