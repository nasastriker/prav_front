<template>
    <div>

        <feather-icon v-if="params.data.status=='Running'" icon="StopCircleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmStopGoTask" />

    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from "../../../../axios";
    import g from "../../../../routeGo";
    export default {
        name: 'OpenLink',
        methods: {
            ...mapActions([]),

            confirmStopGoTask () {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Остановка очереди',
                    text: 'Вы действительно хотите остановить очередь "'+this.params.data.job_name+'"?',
                    accept: this.stopGoTask,
                    acceptText: 'Да',
                    cancelText: 'Нет'
                })
            },
            stopGoTask () {
                    axios.get(g('gas/stop_job'), {
                        params: {
                            jobName: this.params.data.job_name
                        }
                    }).then((response) => {
                        if (response.data.result){
                            this.params.task_stopped();
                        }
                        else{
                            this.$vs.notify({
                                title: 'Ошибка',
                                text: 'Ошибка',
                                color: 'danger',
                                position: 'top-center'
                            })
                        }
                    }).catch(error => {
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: error.message,
                            color: 'danger',
                            position: 'top-center'
                        })

                    });
                },

        }
    }
</script>
