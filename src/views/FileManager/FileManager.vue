<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <vue-iframe
                    v-if="flag"
                    :src="src"
                    allow="camera *; geolocation *; microphone *; autoplay *"
                    frame-id="my-ifram"
                    @load="onLoad"
                    name="my-frame"
                    style="height: 92vh;
                    width: 100%;"
                    width="800px"
                    height="200px"
            />
        </div>
    </div>
</template>

<script>
    import r from '../../route';
    import axios from '../../axios'
    import Vue from 'vue'
    import VueIframe from 'vue-iframes'
    Vue.use(VueIframe)
    export default {
        components: {
        },
        data () {
            return {
                flag:false,
                // src:'http://91.210.169.98:9445/',
                src:'',
                myIframe: null

            }
        },
        methods: {
            onLoad(frame) {
                this.myIframe = frame.contentWindow
            }
        },
        mounted () {
            axios.get(r("setting.index"), {
                params: {
                    method: 'getUrlFileManager',
                    param:''
                }
            }).then((response) => {
                if(response.data.result){
                    this.src=response.data.data
                    this.flag=true

                }
            })
        }
    }


</script>

<style lang="scss">
    #page-user-list {
    .user-list-filters {
    .vs__actions {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-58%);
    }
    }
    }
</style>
