<template>
  <vs-chip class="ag-grid-cell-chip" :color="chipColor(params.value)">
        <span>
                {{ statusName(params.value) }}
        </span>
  </vs-chip>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'OpenStatusControlTaskStatus',
  mounted() {

  },
  computed: {
    ...mapGetters([

    ]),
    statusName() {
      return (value) => {
        if (value == 0) return 'В очереди'
        if (value == 1) return 'Формируется'
        if (value == 2) return 'Ожидает'
        if (value == 3) return 'Работает'
        if (value == 4) return 'Выполнена'
        if (value == 5) return 'Ошибка'
      }
    },
    chipColor() {
      return (value) => {
        if (value == 2) return 'warning'
        if (value == 3) return 'primary'
        if (value == 4) return 'success'
        if (value == 5) return 'danger'
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