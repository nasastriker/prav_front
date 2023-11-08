<template>
    <div >
        <template v-if="params.value=='Ошибка' ">
                <span style="color:red" >{{params.value}}</span>
        </template>
        <template v-if="params.value=='Создана' ">
            <span style="color:#b3d7ff" >{{params.value}}</span>
        </template>
        <template v-if="params.value=='Выполняется' ">
            <span style="color:cadetblue" >{{params.value}}</span>
        </template>
        <template v-if="params.value=='Выполнено' ">
            <span style="color:green" >{{params.value}}</span>
        </template>

    </div>
</template>

<script>
    import Vue from 'vue'

    import { mapActions,mapGetters,mapMutations } from 'vuex'
    export default {
        name: 'OpenLink',

    }
</script>
