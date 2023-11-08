<template>
    <div>
        <div style="display: flex">
            <h3 class="text-primary">{{ data.action_name }}</h3>
            <div class="pull-right" style="margin-left: auto">
                <img src="/loading.gif" v-if="TaskDataLoadStatsFlag" style="max-width: 40px; margin-top: 5px;">
            </div>
        </div>
        <hr style="margin-bottom: 10px; margin-top: 10px; border: 1px solid #ADD8E6;">
        <template v-if="typeof data.stats!='undefined'">
            <div v-if="data.stats.length > 0">
                <div v-for="one_stat in data.stats">
                    <h4 style="margin-top: 10px">{{ one_stat.date }} - {{ one_stat.count }}</h4>
                </div>
            </div>
            <div v-else>
                <h4>По данному рабочему действию не было активности</h4>
            </div>
        </template >

        <template v-else>
            <div >
                <h4>По данному рабочему действию не было активности</h4>
            </div>
        </template>

    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    props: ['data'],
    computed: {
        ...mapGetters([
            'TaskDataLoadStatsFlag'
        ]),
    },
}
</script>
