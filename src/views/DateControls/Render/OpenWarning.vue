<template>
      <vs-chip class="ag-grid-cell-chip" :color="chipColor(params.data.error_flag)">
        <span v-if="params.data.error_flag == 1" @click="showErrors" class="hover:text-primary cursor-pointer">
                ! Внимание !
        </span>
        <span v-else>
                ОК
        </span>

        <vs-popup classContent="popup-example" title="Ошибки" :active.sync="showErrorsFlag">
          <div v-for="err in params.data.error_texts">
            <h4> - {{ err }}</h4>
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
              showErrorsFlag:false,
            }
        },

        computed: {
          chipColor() {
            return (value) => {
              if (value == 0) return 'success'
              if (value == 1) return 'danger'
            }
          },
        },
        methods: {
          showErrors(){
            this.showErrorsFlag = true;
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
