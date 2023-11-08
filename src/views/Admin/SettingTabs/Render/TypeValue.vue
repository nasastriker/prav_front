<template>
    <div >
        <template v-if="params.data.type==0">
        <vs-chip  class="ag-grid-cell-chip cursor-pointer" color="#00FA9A" style="margin-top: 12px; color: black;">
            <span style="padding-right: 30px;padding-left: 30px" >boolean</span>
        </vs-chip>
        </template>
        <template v-if="params.data.type==1">
            <vs-chip  class="ag-grid-cell-chip cursor-pointer" color="#FFD700" style="margin-top: 12px; color: black;">
                <span style="padding-right: 30px;padding-left: 30px" >Int</span>
            </vs-chip>
        </template>
        <template v-if="params.data.type==2">
            <vs-chip  class="ag-grid-cell-chip cursor-pointer" color="#EE82EE" style="margin-top: 12px; color: black;">
                <span style="padding-right: 30px;padding-left: 30px" >String</span>
            </vs-chip>
        </template>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        methods: {
            ...mapActions([
          //      'getSelPortsAll','DeleteSelPortsOnes'



            ]),

        }
    }
</script>
