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
    import r from '../route';

    import Vue from 'vue';
    import { mapActions,mapGetters, } from 'vuex'
    import axios from '../axios'
    export default {
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
//
//                if (this.$route.name=='DebtorID'){
//                    let $arr = this.$history.routes.filter((item, index) => {
//                        return this.$history.routes.indexOf(item) === index
//                    });
//                    let $arrnew=[];
//                    for (let i = 0; i < $arr.length; i++) {
//                        if($arr[i].startsWith('/pages/login?')==false&&$arr[i].startsWith('/debtors/')==false){
//                            $arrnew.push($arr[i])
//                        }
//
//                    }
//                    $arr=$arrnew;
//                    if($arr[$arr.length - 1]=='/credit/'){
//                        this.$router.push('/credit/')
//                    }else{
//                        this.$router.back()
//                    }
//                    $arr=[];
//
//                }else{
                    this.$router.back()
                //}
//

            },



        },
    }
</script>
