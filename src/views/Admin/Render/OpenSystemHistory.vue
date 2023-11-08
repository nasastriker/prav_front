<template>
    <div >

        <vs-button
                size="small"
                color="green"
                @click="start"
                style="margin-bottom: 5px"
        >Запустить</vs-button>


    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../route';
    import { mapActions,mapGetters } from 'vuex'
    export default {
        name: 'OpenLink',
        methods: {

            start () {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Запуск',
                    text: `Вы действительно хотите запустить? `,
                    accept: this.startGo,
                    acceptText: 'Запустить',
                    cancelText: 'Отмена'
                })
            },
            startGo(){
                this.params.start_func(this.params.data.id);
            },

        }
    }
</script>
