<template>
    <vs-chip class="ag-grid-cell-chip" :color="chipColor(params.value)">
        <span>

                {{parName}}



        </span>
    </vs-chip>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    export default {
        name: 'CellRendererStatus',
        mounted(){

        },
        computed: {
            ...mapGetters([
              'StatussArr'

            ]),
            parName(){
                if( this.params.value!=null){
                    if(typeof this.StatussArr[this.params.value-1]!="undefined"){
                        return  this.StatussArr[this.params.value-1].name
                    }

                }
                else{
                    return 'нет статуса'
                }
            },
            chipColor () {
                return (value) => {
                    if (value == 0) return 'warning'
                    if (value == null) return 'warning'
                    if (value == 1 ) return 'success'
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
