<template>
    <div class="vx-breadcrumb ml-4 md:block hidden" style="cursor: pointer;">
        <ul class="flex flex-wrap items-center" style="cursor: pointer;">




            <li class="inline-flex items-center" style="cursor: pointer;" @click="close"><span class="text-primary cursor-default">   <arrow-left-icon  style="cursor: pointer;" size="1.5x" class="custom-class" ></arrow-left-icon></span><span
                    class="breadcrumb-separator mx-2 flex items-start"><span
                    class="feather-icon select-none relative"></span></span></li>

        </ul>
    </div>

</template>

<script>
    import { ArrowLeftIcon } from 'vue-feather-icons'
    import { mapActions,mapGetters, } from 'vuex'
    export default {
        props:['backstatus'],
        components: {
            ArrowLeftIcon

        },
        data () {
            return {

            }
        },
        mounted(){
        },

        computed: {


        },
        methods: {


            close(){

                this.backstatus=!this.backstatus
            },



        },
    }
</script>
