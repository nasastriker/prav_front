<template>
    <div >
        <template v-if="params.value==0 ">
            <span style="color:red" >Ошибка</span>
        </template>
        <template v-if="params.value==1 ">
            <span style="color:#00A000" >Успешно</span>
        </template>

    </div>
</template>

<script>
    import Vue from 'vue'

    import { mapActions,mapGetters,mapMutations } from 'vuex'
    export default {
        name: 'StatusU',

    }
</script>
