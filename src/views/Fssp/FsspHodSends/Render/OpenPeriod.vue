<template>
  <vs-chip class="ag-grid-cell-chip" :color="chipColor(params.value)">
    <span :title="params.value">
      {{ params.value }}
    </span>
  </vs-chip>
</template>

<script>
    export default {
        data () {
            return {}
        },
        computed: {
          chipColor() {
            return (value) => {
              if (value.startsWith('Ежедневно')) return 'success'
              if (value.startsWith('Раз в два дня')) return '#556B2F'
              if (value.startsWith('Еженедельно')) return 'primary'
              if (value.startsWith('Ежемесячно')) return '#8B0000'
              if (value.startsWith('Раз в две недели')) return '#00008B'
            }
          },
        },
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
