<template>
    <div>
    <div class="vs-row">
        <div class="vs-col" style="width: 90%">
            <json-viewer
                    v-if="element!=null"
                    :value="element"
                    :expand-depth=5
                    copyable
                    sort></json-viewer>
        </div>
            <div class="vs-col" style="width: 25px; float:right">
            <feather-icon icon="Trash2Icon" style="float:right" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="deleteElement"/>
        </div>
    </div>
    </div>
</template>

<script>
    import JsonViewer from 'vue-json-viewer'
    export default {
    components:{JsonViewer},
    props:{
        element:{}
    },
    methods:{
      deleteElement(){
        this.$emit('delete_element', this.element)
      }
    }
    }
</script>

<style scoped>

</style>