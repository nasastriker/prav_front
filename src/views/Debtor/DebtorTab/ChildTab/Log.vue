<template>

    <div>

        <ul id="example-1">
            <li v-for="item in data" :key="item.id">
                Дата:{{ item.created_at }}. Действие: {{ item.name }}
            </li>
        </ul>

    </div>

</template>

<script>
    import { mapGetters } from 'vuex'
    import r from '../../../../route';
    import axios from '../../../../axios'
    export default {
        props:['id_debtor'],
        components: {
        },
        data () {
            return {
                data:[],

            }
        },

        computed: {
            ...mapGetters([
                'Deb'

            ]),

        },
        methods: {

            getData(id_debtor){

                axios.get(r("log.index"), {
                    params: {
                        method: 'getLog',
                        param: this.Deb.debtor.id

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.data) {
                        this.data = response.data.data;


                    }


                })


            }

        },
        mounted () {
            this.getData()

        }
    }


</script>

<style lang="scss">

</style>
