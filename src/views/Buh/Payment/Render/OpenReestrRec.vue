<template>
    <div>

                {{parName}}



    </div>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    export default {

        mounted(){

        },
        computed: {


                ...mapGetters([
                   'Organization'

                ]),



            parName(){
                if( this.params.value==0){
                    return this.params.data.name_recover
                }
                if( this.params.value==1){
                    return this.Organization.name
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
