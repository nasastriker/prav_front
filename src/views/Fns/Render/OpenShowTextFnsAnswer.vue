<template>
  <vs-chip class="ag-grid-cell-chip">
    <span class="hover:text-primary cursor-pointer" @click="showTextStart">
      Показать текст
    </span>
  </vs-chip>
</template>

<script>
    export default {
        mounted(){},
        computed: {

        },
      methods: {
        showTextStart(){
          this.params.showTextStartAnswerFns(this.params.data, 0);
        },
      },
    }
</script>

<style lang="scss" scpoped>
</style>
