<template>
    <span>
<template v-if="parName=='Ошибка'">

    <vs-chip class="ag-grid-cell-chip" color="warning">
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
              //  console.log(this.params.value)
                if( this.params.value==null){
                    return  'Ошибка'
                }
                else{
                    if( typeof this.params.value.street_fias_id=='undefined'){

                        return  'Ошибка'
                    }
                }


            },

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
