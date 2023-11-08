<template>
    <div>
      <div v-if="params.data.show_opers" style="display: flex">
      <vs-checkbox style="margin-bottom: 20px" v-model="active"></vs-checkbox>
        <template v-if="params.data.active==1">
            <vs-chip class="ag-grid-cell-chip cursor-pointer" color="success" style="margin-top: 12px">
                <span style="padding-right: 30px;padding-left: 30px">активен</span>
            </vs-chip>
        </template>
        <template v-else>
            <vs-chip class="ag-grid-cell-chip cursor-pointer" color="warning" style="margin-top: 12px">
                <span style="padding-right: 30px;padding-left: 30px">не активен</span>
            </vs-chip>
        </template>
      </div>
      <div v-else style="display: flex">
        <vs-checkbox disabled style="margin-bottom: 20px" v-model="active"></vs-checkbox>
        <template v-if="params.data.active==1">
          <vs-chip class="ag-grid-cell-chip cursor-pointer" color="success" style="margin-top: 12px">
            <span style="padding-right: 30px;padding-left: 30px">активен</span>
          </vs-chip>
        </template>
        <template v-else>
          <vs-chip class="ag-grid-cell-chip cursor-pointer" color="warning" style="margin-top: 12px">
            <span style="padding-right: 30px;padding-left: 30px">не активен</span>
          </vs-chip>
        </template>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'ActiveFsspHodRecords',
      computed: {
        active: {
          get() { return this.params.data.active; },
          set(value) { this.changeActive(value); },
        },
      },
      methods: {
        changeActive(value){
          this.params.setActive(this.params.data.id, value);
        },
      },
    }
</script>
