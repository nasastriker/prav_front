<template>
    <div class="user-ava" :style="style_avat">
        <div class="text-ava">{{ user_initials }}</div>
    </div>
</template>

<script>
export default {
    props: {
        user_initials: '',
    },
    data() {
        return {

        }
    },
    computed: {
        style_avat(){
            return "background-color: " +
                '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase();
        }
    }
}
</script>

<style>
.user-ava {
    display: inline-block;
    width: 60px;
    height: 60px;
    line-height: 58px;
    border-radius: 50%;
    text-align: center;
    color: white;
    border: 2px solid;
}
.text-ava{
    font-size: 25px;
}
</style>
