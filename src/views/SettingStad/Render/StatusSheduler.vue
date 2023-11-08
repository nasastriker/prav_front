<template>
    <div style="display: flex">
      <vs-checkbox style="margin-right: 5px;margin-bottom: 20px" v-model="id_status"></vs-checkbox>

        <template v-if="params.data.status==1">
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
        id_status: {
          get() { return this.params.data.status; },
          set(value) { this.changeStatus(value); },
        },
      },
      methods: {
        changeStatus(value){
          this.saveStatusSheduler({id_shed: this.params.data.id, id_status: value}).then((response) => {
            if (response) {
              this.params.go_refresh_shed();
            } else {
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
          'saveStatusSheduler'
        ]),
      },
    }
</script>
