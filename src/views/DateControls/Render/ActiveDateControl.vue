<template>
    <div style="display: flex">
      <vs-checkbox style="margin-bottom: 20px" v-model="active"></vs-checkbox>

        <template v-if="params.data.active==1">
            <vs-chip  class="ag-grid-cell-chip cursor-pointer" color="success" style="margin-top: 12px">
                <span style="padding-right: 30px;padding-left: 30px" >активен</span>
            </vs-chip>
        </template>

        <template v-else>
            <vs-chip  class="ag-grid-cell-chip cursor-pointer" color="warning" style="margin-top: 12px">
                <span  style="padding-right: 30px;padding-left: 30px" >не активен</span>
            </vs-chip>

        </template>


    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    export default {
      name: 'OpenLink',
      computed: {
        active: {
          get() { return this.params.data.active; },
          set(value) { this.changeActive(value); },
        },
      },
      methods: {
        changeActive(value){
          this.saveActiveDateControl({id_dc: this.params.data.id, active: value}).then((response) => {
            if (!response) {
              this.$vs.notify({  title:'Сообщение', text: 'Ошибка!!!', color: 'danger', position: 'top-center' })
            }
          }).catch(error => {
            this.$vs.notify({
              title: 'Ошибка',
              text: error.message,
              color: 'danger',
              position: 'top-center'
            })

          });
        },
        ...mapActions([
          'saveActiveDateControl'
        ]),
      },
    }
</script>
