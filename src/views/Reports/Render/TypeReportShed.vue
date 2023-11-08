<template>
    <div >
        <template v-if="params.data.system==1">
            <vs-chip  class="ag-grid-cell-chip cursor-pointer" color="primary" style="margin-top: 12px; max-width: 100px">
                <span style="padding-right: 30px;padding-left: 30px" >системный</span>
            </vs-chip>
        </template>

        <template v-if="params.data.system==0">
            <vs-chip  class="ag-grid-cell-chip cursor-pointer" color="warning" style="margin-top: 12px;max-width: 100px">
                <span  style="padding-right: 30px;padding-left: 30px" >пользователь</span>
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



        },

    }
</script>
