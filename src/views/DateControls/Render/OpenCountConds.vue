<template>
      <vs-chip class="ag-grid-cell-chip" :color="chipColor(params.data.var_conditions)">
        <span v-if="params.data.var_conditions" @click="showConds" class="hover:text-primary cursor-pointer">
                Условий: {{ params.data.var_conditions.length }}
        </span>
        <span v-else class="hover:text-primary cursor-pointer">
                Условий нет
        </span>

        <vs-popup classContent="popup-example" title="Условия" :active.sync="showCondsFlag">
          <div v-for="cond in params.data.var_conditions">
            <h4>{{ cond.var }} {{ condOper(cond.var_condition) }} <span style="color: blue">{{ cond.value }}</span></h4>
          </div>
        </vs-popup>

      </vs-chip>
</template>

<script>
    import Vue from 'vue'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        data () {
            return {
              showCondsFlag:false,
            }
        },

        computed: {
          chipColor() {
            return (value) => {
              if (value) return 'success'
              if (!value) return 'danger'
            }
          },
          condOper() {
            return (value) => {
              if (value=='равно') return '='
              if (value=='содержит') return 'содержит'
              if (value=='больше или равно') return '>='
              if (value=='меньше или равно') return '<='
              if (value=='больше') return '>'
              if (value=='меньше') return '<'
            }
          }
        },
        methods: {
          showConds(){
            this.showCondsFlag = true;
          },
            ...mapActions([

            ]),
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
