<template>
    <div>
        <vs-chip v-if="showerr" class="ag-grid-cell-chip cursor-pointer" color="primary" style="margin-top: 12px; max-width: 100px" >
            <span style="padding-right: 30px;padding-left: 30px"  @click="ShowError">Посмотреть</span>
        </vs-chip>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                showerr:false,
            }
        },
        mounted(){
            this.showerr=(this.params.data.error)?this.params.data.error.length||0!==0:false
        },
        methods:{
            ShowError(){
                this.params.ShowError(this.params.data.error)
            },
        },
    }
</script>

<style scoped>

</style>