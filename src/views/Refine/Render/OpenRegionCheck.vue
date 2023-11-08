<template>
    <div>
        <vs-checkbox v-model="stat"></vs-checkbox>
    </div>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    export default {
        data () {
            return {
            }
        },
        computed: {
            stat: {
                get() { return this.params.value; },
                set(value) { this.change(value); },
            },
            ...mapGetters([]),
        },
        methods: {
            startChange(id){
                this.startJobChangeJurisdictRegion(id[0]);
            },
            change(value){
                let dat={
                    id:this.params.data.id,
                    stat:value,
                }
                this.changeCheckRegionRefine(dat).then((response) => {
                    this.getRegion();
                    if (value) {
                        this.$vs.dialog({
                            type: 'confirm',
                            color: 'danger',
                            title: 'Запуск смены подсудности',
                            text: 'Запустить смену подсудности по данному региону?',
                            accept: this.startChange,
                            acceptText: 'Да',
                            cancelText: 'Нет',
                            parameters: [this.params.data.id]
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
            ...mapActions([
                'changeCheckRegionRefine', 'getRegion', 'startJobChangeJurisdictRegion'
            ]),
        }
    }
</script>
