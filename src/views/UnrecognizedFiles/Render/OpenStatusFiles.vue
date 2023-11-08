<template>
  <vs-chip class="ag-grid-cell-chip" :color="chipColor(params.value)">
        <span>
                {{ statusName(params.value) }}
        </span>
  </vs-chip>
</template>

<script>
export default {
  name: 'OpenStatusFiles',
  computed: {
    statusName() {
      return (value) => {
        if (value == 0) {
          if (this.params.data.hand == 0) return 'Получен'
          if (this.params.data.hand == 1) return 'Загружен вручную'
        }
        if (value == 1) return 'Перенесен'
        if (value == 2) return 'Удален'
      }
    },
    chipColor() {
      return (value) => {
        if (value == 1) return 'success'
        if (value == 2) return 'danger'
      }
    }
  }
}
</script>

<style lang="scss" scpoped>
.ag-grid-cell-chip {
  &.vs-chip-success {
    background: rgba(var(--vs-success), .15);
    color: rgba(var(--vs-success), 1) !important;
    font-weight: 500;
  }

  &.vs-chip-warning {
    background: rgba(var(--vs-warning), .15);
    color: rgba(var(--vs-warning), 1) !important;
    font-weight: 500;
  }

  &.vs-chip-danger {
    background: rgba(var(--vs-danger), .15);
    color: rgba(var(--vs-danger), 1) !important;
    font-weight: 500;
  }
}
</style>