<template>
    <div>
        <vs-progress v-if="params.data.progress!==100&&params.data.status!==3"
                :percent="params.data.progress"
        ></vs-progress>
    <span v-else>{{params.data.progress}}%</span>
    </div>
</template>

<script>
    import Vue from 'vue'

    import { mapActions,mapGetters,mapMutations } from 'vuex'
    export default {
    }
</script>

<style scoped>

</style>