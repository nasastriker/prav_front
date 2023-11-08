<template>
    <div >

        <a  @click="getLink">{{params.value}}</a>

    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../../route';
    import axios from '../../../../axios';
    import { mapActions,mapGetters } from 'vuex'
    export default {
        data () {
            return {
                showDos:false,
            }
        },

        computed: {
            ...mapGetters([
                'User'
            ]),



        },
        methods: {
            getLink(){
                axios.get(r("archSud.index"), {
                    params: {
                        method: 'getSudFileUpload',
                        param: this.params.data.id

                    }
                }).then((response) => {

                    if (response.data.result){
                        window.open('/arch_sud_link/'+response.data.data, '_blank');
                        this.getDataArchSudSends();
                    }




                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });


            },

            ...mapActions([
                'getDataArchSudSends'
            ]),

        }
    }
</script>
