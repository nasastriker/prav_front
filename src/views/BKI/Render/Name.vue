<template>
    <div >

        <a  @click="getLink">{{params.value}}</a>

    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../route';
    import axios from '../../../axios';
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
                if(this.params.data.filename!==null){
                    axios.get(r("bki_reestr.index"), {
                        responseType: 'arraybuffer',

                        params: {
                            method: 'getArch',
                            param:this.params.data.id


                        }
                    }).then((response) => {


                        const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/xls;charset=UTF-8;' }));

                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', this.params.data.filename);
                        document.body.appendChild(link);
                        link.click();
                        this.getBkiReestrArr();


                    }).catch(error => {
                        this.$vs.loading.close()
                        //   this.popupActive3=false;
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: error.message,
                            color: 'danger',
                            position: 'top-center'
                        })

                    });
                }


            },

            ...mapActions([
                'getBkiReestrArr'
            ]),

        }
    }
</script>
