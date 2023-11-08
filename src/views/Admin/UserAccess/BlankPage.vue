<template>
    <div id="page-user-list">
        <div class="vx-card p-6" v-if="no_access">
            <h1 class="text-primary">Нет доступа к системе</h1>
        </div>
        <div v-else>
            <img class="displayed" src="/loading.gif">
        </div>
    </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
    data() {
        return {
            no_access: false
        }
    },
    mounted() {
        this.getStartPageUrl().then((response) => {
            if (response.result){
                this.$router.push(response.start_page_url);
            } else {
                this.no_access = true;
            }
        })
    },
    methods: {
        ...mapActions([
            'getStartPageUrl'
        ]),
    }
}

</script>

<style>
IMG.displayed {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 100px;
    margin-top: 350px;
}
</style>
