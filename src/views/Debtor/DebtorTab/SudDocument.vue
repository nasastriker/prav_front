<template>

    <div>
        <div class="vx-row" style="border-color: #62626262;    min-height: 68vh;">
            <div class="vx-col w-1/3  mb-2" style="border: 1px;">
                <SudPrikaz></SudPrikaz>

            </div>
            <div class="vx-col w-2/3  mb-2" style="border: 1px;">
                <SudIsk></SudIsk>

            </div>
        </div>

    </div>


</template>

<script>

    import SudIsk from './SudIsk.vue'
    import SudPrikaz from './SudPrikaz.vue'
    export default {
        components: {
            SudIsk,SudPrikaz
        },
        data () {
            return {

            }
        },
        mounted(){

        },
        asyncComputed: {

        },
        computed: {




        },
        methods: {


        },
    }
</script>

<style lang="scss">
    .const{
        margin-top: 10px;
        color: red;
        border: 1px;

        cursor: pointer;
        text-decoration-line: underline;
        text-decoration-style: dashed;
    }
    .h6{
        font-size: 12px;
        color: cadetblue;
    }
    .f {

        border: 1px; border-style: double;border-color: #62626262; border-radius: 8px;
    }
    .l {
        color: #a00;
        padding: 0 10px;
    }
    .checkbox_x.vs-checkbox{
        min-width: 20px;
    }

</style>
