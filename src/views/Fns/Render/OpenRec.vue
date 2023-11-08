<template>
    <div >
       {{name}}


    </div>
</template>

<script>
    import Vue from 'vue'

    import { mapActions,mapGetters,mapMutations } from 'vuex'
    export default {
        computed: {
            name(){
                let name=''

                for(let i=0;i<this.RecoverersArr.length;i++){
                    if(this.RecoverersArr[i].id==this.params.value){
                        name=this.RecoverersArr[i].name
                    }
                }
                for(let i=0;i<this.CessionsArr.length;i++){
                    if(this.CessionsArr[i].id==this.params.value){
                        name=this.CessionsArr[i].name
                    }
                }

                return name

            },
            ...mapGetters([
                'RecoverersArr','CessionsArr'

            ]),


        },

    }
</script>
<style>
    ul.hr {
        margin: 0; /* Обнуляем значение отступов */
        padding: 4px; /* Значение полей */
    }
    ul.hr li {
        margin-right: 5px; /* Отступ слева */
        border: 1px solid #000; /* Рамка вокруг текста */
        padding: 3px; /* Поля вокруг текста */
    }
</style>
