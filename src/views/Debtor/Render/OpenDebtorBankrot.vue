<template>
    <span>
        <template v-if="this.params.value==1">

    <vs-chip class="ag-grid-cell-chip" :color="chipColor(params.value)">
        <span>

                {{parName}}



        </span>
    </vs-chip>
        </template>
    </span>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    export default {
        name: 'CellRendererStatus',
        mounted(){

        },
        computed: {

            parName(){
                if( this.params.value==0){
                    return  ''
                }
                else{
                    return 'банкрот'
                }
            },
            chipColor () {
                return (value) => {
                    if (value == 1) return 'warning'

                    if (value == 0 ) return ''
                }
            }
        }
    }
</script>

<style lang="scss" scpoped>
    .ag-grid-cell-chip {
    &.vs-chip-success {
         background: rgba(var(--vs-success),.15);
         color: rgba(var(--vs-success),1) !important;
         font-weight: 500;
     }
    &.vs-chip-warning {
         background: rgba(var(--vs-warning),.15);
         color: rgba(var(--vs-warning),1) !important;
         font-weight: 500;
     }
    &.vs-chip-danger {
         background: rgba(var(--vs-danger),.15);
         color: rgba(var(--vs-danger),1) !important;
         font-weight: 500;
     }
    }
</style>
