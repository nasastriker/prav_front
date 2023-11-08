<template>
    <div>
     <div v-if="value!=null">
            <div v-for="elementArr in value">
                <ObjFromJsonViewButtonElement :element="elementArr" @delete_element="deleteElement"></ObjFromJsonViewButtonElement>
            </div>
     </div>
    </div>
</template>

<script>
    import ObjFromJsonViewButtonElement from './ObjFromJsonViewButtonElement.vue'
    export default {
        components:{ObjFromJsonViewButtonElement},
        props: {
            value: {}
        },
        methods: {
            deleteElement(val){
            this.Arr=this.value;
            let index=this.Arr.indexOf(val)
            if(index>-1) this.Arr.splice(index,1)
            this.$emit('update_arr',this.Arr)
            },
        },
        data() {
            return {
            Arr:{},
            }
        },
    }
</script>

<style scoped>

</style>