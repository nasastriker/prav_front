<template>
  <vs-chip class="ag-grid-cell-chip" :color="chipColor(params.value)">
        <span v-if="params.value == 3" class="hover:text-primary cursor-pointer" @click="popupSendInfo=!popupSendInfo">
          {{ statusName(params.value) }}
        </span>
        <span v-else>
          {{ statusName(params.value) }}
        </span>

    <vs-popup classContent="popup-example" title="Ошибка" :active.sync="popupSendInfo">
        <vs-textarea class="w-100" height="500px" v-model="params.data.send_error" > </vs-textarea>
    </vs-popup>
  </vs-chip>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'OpenDateControlTaskSendStatus',
  data () {
    return {
      popupSendInfo: false,
    }
  },
  mounted() {

  },
  computed: {
    ...mapGetters([

    ]),
    statusName() {
      return (value) => {
        if (value == 0) return 'В очереди'
        if (value == 1) return 'В процессе'
        if (value == 2) return 'Выполнена'
        if (value == 3) return 'Ошибка'
      }
    },
    chipColor() {
      return (value) => {
        if (value == 1) return 'primary'
        if (value == 2) return 'success'
        if (value == 3) return 'danger'
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