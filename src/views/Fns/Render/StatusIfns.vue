<template>
    <div>
        <template v-if="dat==0">
            <vs-chip class="ag-grid-cell-chip cursor-pointer" color="primary" style="margin-top: 12px; max-width: 100px">
                <span style="padding-right: 30px;padding-left: 30px" >не отправлен</span>
            </vs-chip>
        </template>

        <template v-if="dat==1">
            <vs-chip class="ag-grid-cell-chip cursor-pointer" color="warning" style="margin-top: 12px;max-width: 100px">
                <span style="padding-right: 30px;padding-left: 30px" >отправлен</span>
            </vs-chip>

        </template>
        <template v-if="dat==2">
            <vs-chip class="ag-grid-cell-chip cursor-pointer" color="danger" style="margin-top: 12px;max-width: 100px">
                <span style="padding-right: 30px;padding-left: 30px" >жалоба</span>
            </vs-chip>

        </template>
        <template v-if="dat==3">
            <vs-chip class="ag-grid-cell-chip cursor-pointer" color="success" style="margin-top: 12px;max-width: 100px">
                <span style="padding-right: 30px;padding-left: 30px" >получен ответ </span>
            </vs-chip>

        </template>
    </div>
</template>

<script>
    export default {
        name: 'StatusIfns',
        computed: {
            dat(){
                for(let i=0;i<this.$store.state.fns.data.length;i++){
                    if(this.$store.state.fns.data[i].id==this.params.data.id){
                        return this.$store.state.fns.data[i].status_ifns;
                    }
                }
            }
        },
    }
</script>
