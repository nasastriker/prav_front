<template>
    <vs-chip class="ag-grid-cell-chip" >
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
                'UsersArr'

            ]),
            parName(){
                for(let i=0;i<this.UsersArr.length;i++)
                {
                    if(this.UsersArr[i].id==this.params.value){
                        return  this.UsersArr[i].name
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
