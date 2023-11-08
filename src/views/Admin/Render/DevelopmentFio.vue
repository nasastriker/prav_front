<template>
    <div >
        <span v-if="params.data.my" style="color: green">{{params.value}}</span>
        <span v-else>{{params.value}}</span>

    </div>
</template>

<script>

    export default {

    }

</script>
