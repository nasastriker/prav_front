<template>
    <span :title="parName">

                {{parName}}



        </span>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {


        computed: {
            ...mapGetters([
              'UsersArr'

            ]),
            parName(){
              for (let i = 0; i < this.UsersArr.length; i++) {
                if (this.UsersArr[i].id==this.params.value){return this.UsersArr[i].name_family+" "+this.UsersArr[i].name+" "+this.UsersArr[i].name_patronymic}
              }
              return ''


            },

        }
    }
</script>

<style lang="scss" scpoped>

</style>
