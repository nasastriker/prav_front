<template>
    <div >
        <template v-if="params.value==0">
            <vs-chip  class="ag-grid-cell-chip cursor-pointer" color="success" style="margin-top: 12px">
                <span style="padding-right: 30px;padding-left: 30px" >в очереди</span>
            </vs-chip>
        </template>
        <template v-if="params.value==1">
            <vs-chip  class="ag-grid-cell-chip cursor-pointer" color="success" style="margin-top: 12px">
                <span style="padding-right: 30px;padding-left: 30px" >загружается</span>
            </vs-chip>
        </template>
        <template v-if="params.value==2">
            <vs-chip  class="ag-grid-cell-chip cursor-pointer" color="success" style="margin-top: 12px">
                <span style="padding-right: 30px;padding-left: 30px" >загружен</span>
            </vs-chip>
        </template>

        <template v-else>
            <vs-chip  class="ag-grid-cell-chip cursor-pointer" color="warning" style="margin-top: 12px">
                <span  style="padding-right: 30px;padding-left: 30px" >ошибка</span>
            </vs-chip>

        </template>


    </div>
</template>

<script>
    import Vue from 'vue'

    import { mapActions,mapGetters,mapMutations } from 'vuex'
    export default {

    }
</script>
