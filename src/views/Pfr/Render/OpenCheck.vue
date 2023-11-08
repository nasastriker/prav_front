<template>
    <div >
       <vs-checkbox style="margin-bottom: 15px" v-model="stat"   ></vs-checkbox>
    </div>
</template>
<script>
    import { mapActions,mapGetters } from 'vuex'
    export default {
        data () {
            return {

                showDos:false,
            }
        },
        computed: {
            stat: {
                get() { return this.params.value; },
                set(value) { this.setNew(value); },
            },
            ...mapGetters([
                'User'
            ]),
        },
        methods: {
            setNew(value){
              let data= JSON.parse(JSON.stringify(this.params.data))
              data.check=value
              this.params.change_check(data);
            },
            ...mapActions([
            ]),
        }
    }
</script>
