<template>
    <span>
        <feather-icon   title="Обязательный" style="background-color:beige;color: red" icon="ChevronsRightIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="add(1)" />
        <feather-icon  title="Необязательнный" style="background-color: beige;color: green" icon="ChevronsRightIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="add(2)" />
       <feather-icon style="background-color: beige;color:orange" icon="ChevronsRightIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="add(3)" />
        <feather-icon style="background-color: beige;color:cornflowerblue" icon="ChevronsRightIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="add(4)" />

    </span>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    export default {
        props:['index'],

        mounted(){

        },
        computed: {

        },
        methods:{
            add(button){
            this.$emit('add',this.index,button)
            },
        }
    }
</script>

<style lang="scss" scpoped>

</style>
