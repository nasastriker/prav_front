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
        mounted(){

        },
        computed: {
            ...mapGetters([
                'StrategyPeremensActionArr','StatussArr'

            ]),
            parName(){
                for(let i=0;i<this.StrategyPeremensActionArr.length;i++)
                {
                    if(this.StrategyPeremensActionArr[i].id==this.params.value){
                        let str
                        str= this.StrategyPeremensActionArr[i].name
                        if(this.StrategyPeremensActionArr[i].id==0){

                                for(let k=0;i<this.StatussArr.length;i++)
                                {
                                    if(this.StatussArr[i].id==this.params.data.id_status){
                                        str=str+' на '+this.StatussArr[i].name
                                    }
                                }


                        }else{
                            str=str+' '+this.params.data.peremen+' на '+ this.params.data.value
                        }

                        return str
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
