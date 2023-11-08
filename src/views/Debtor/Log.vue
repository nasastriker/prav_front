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
    import r from '../../route';
    import axios from '../../axios'
    export default {
        props:['id_debtor'],
        components: {
        },
        data () {
            return {
                data:[],

            }
        },
        methods: {
            getData(id_debtor){
                if(id_debtor!=null ){
                axios.get(r("log.index"), {
                    params: {
                        method: 'getLog',
                        param: id_debtor
                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.data) {
                        this.data = response.data.data;
                    }
                })}
            }

        },
        mounted () {
            this.getData(this.id_debtor)

        }
    }


</script>

<style lang="scss">

</style>
