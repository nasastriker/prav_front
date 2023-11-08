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
              'UsersArrAllMenu'

            ]),
            parName(){
                for(let i=0;i<this.UsersArrAllMenu.length;i++)
                {
                    if(this.UsersArrAllMenu[i].id==this.params.value){
                        return  this.UsersArrAllMenu[i].fio
                    }
                    if(this.params.value==0){
                        return  'Система'
                    }
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
