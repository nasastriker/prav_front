<template>
  <vs-chip class="ag-grid-cell-chip" :color="chipColor(params.data.task_status)">
    <span :title="params.value" v-if="params.data.task_status === 4 || params.data.task_status === 5" class="hover:text-primary cursor-pointer" @click="showErrorStart">
      {{ params.value }}
    </span>
    <span :title="params.value" v-else>
      {{ params.value }}
    </span>
  </vs-chip>
</template>

<script>
export default {
  name: 'OpenTaskStatus',
  computed: {
    chipColor() {
      return (value) => {
        if (value == 1) return '#008B8B'
        if (value == 2) return 'primary'
        if (value == 3) return 'success'
        if (value == 4) return 'danger'
        if (value == 5) return 'warning'
        if (value == 6) return '#000080'
      }
    }
  },
  methods: {
    showErrorStart(){
      this.params.showError(this.params.data.task_error);
    },
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