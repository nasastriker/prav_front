<template>
    <div>
        <feather-icon icon="FileTextIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="showInfo" />
    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../route';
    import axios from '../../../axios';
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import vSelect from 'vue-select'
    import ImportAnswerFileFnsRender from "./ImportAnswerFileFnsRender.vue";
    export default {
        name: 'OpenAnswerList',
        components: {
            vSelect,
        },
        computed: {
            ...mapGetters([
            ]),
        },
        data () {
            return {

            }
        },
        methods: {
            showInfo(){
                this.params.my_action(this.params.data.id);
            },
            ...mapActions([
            ]),
        }
    }
</script>
