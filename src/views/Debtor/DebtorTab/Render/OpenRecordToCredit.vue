<template>
    <vs-chip class="ag-grid-cell-chip">
        <span class="hover:text-primary cursor-pointer" @click="questBinding">
          Привязать
        </span>
    </vs-chip>
</template>

<script>
    export default {
      name: 'OpenRecordToCredit',
      methods: {
        questBinding(){
          this.params.questBinding(this.params.data)
        },
      }
    }
</script>

<style lang="scss" scpoped>
    .ag-grid-cell-chip {
    &.vs-chip-success {
         background: rgba(var(--vs-success),.15);
         color: rgba(var(--vs-success),1) !important;
         font-weight: 500;
     }
    &.vs-chip-warning {
         background: rgba(var(--vs-warning),.15);
         color: rgba(var(--vs-warning),1) !important;
         font-weight: 500;
     }
    &.vs-chip-danger {
         background: rgba(var(--vs-danger),.15);
         color: rgba(var(--vs-danger),1) !important;
         font-weight: 500;
     }
    }
</style>
