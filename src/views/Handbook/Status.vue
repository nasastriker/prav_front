
<template>

  <div id="page-user-list">
    <div class="vx-card p-6">
        <vs-tabs v-model="$store.state.status.activeTabMainStatus">
            <vs-tab label="Статусы">
                <StatusAll></StatusAll>
            </vs-tab>
            <vs-tab label="Пользовательские статусы">
                <StatusUser></StatusUser>
            </vs-tab>
        </vs-tabs>



    </div>
  </div>

</template>

<script>
    import StatusAll from './StatusAll.vue'
    import StatusUser from './StatusUser.vue'
    export default {
        components: {
            StatusAll,
            StatusUser,
        },


    }

</script>

<style lang="scss">
    .con-vs-pagination{
        margin-right: 40px!important;
    }
    #page-user-list {
    .user-list-filters {
    .vs__actions {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-58%);
    }
    }
    }
</style>
