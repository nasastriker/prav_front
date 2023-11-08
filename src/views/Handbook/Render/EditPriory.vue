<template>
    <div >

        <vs-input class="mb-4 md:mb-0 mr-4" style="max-height: 15px;
    max-width: 100px;" v-model="params.value" />


    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../route';
    import { mapActions,mapGetters } from 'vuex'
    export default {
        name: 'OpenLink',
        methods: {
            ...mapActions([




            ]),

        }
    }
</script>
