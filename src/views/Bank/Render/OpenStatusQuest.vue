<template>
    <div >
        <template v-if="params.value==0">
            <vs-chip  class="ag-grid-cell-chip cursor-pointer" color="warning" style="margin-top: 12px;max-width: 120px;">
                <span style="padding-right: 30px;padding-left: 30px" >нет ответа</span>
            </vs-chip>
        </template>

        <template v-else>
            <vs-chip  class="ag-grid-cell-chip cursor-pointer" color="success" style="margin-top: 12px;max-width: 120px;">
                <span  style="padding-right: 30px;padding-left: 30px" >ответ получен</span>
            </vs-chip>

        </template>


    </div>
</template>

<script>
    import Vue from 'vue'

    import { mapActions,mapGetters,mapMutations } from 'vuex'
    export default {
        name: 'OpenLink',

    }
</script>
