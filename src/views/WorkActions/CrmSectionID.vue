<template>
    <vx-card no-shadow>
        <label style="margin-bottom: 10px">Новый Раздел СРМ</label>
        <vs-input class="w-full mb-base" label-placeholder="Название" v-model="crmSection.name"></vs-input>
        <div style="margin-top: 20px">
            <vs-button color="primary"  class="pull-right" type="filled"  @click="$router.push('/work_actions/')">Закрыть</vs-button>
            <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
        </div>
    </vx-card>
</template>

<script>
    import r from '../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../axios'
    export default {
        components: {},
        data () {
            return {
                crmSection:{},
            }
        },
        mounted(){},
        computed: {},
        methods: {
            ...mapActions([
                'saveCrmSection',
            ]),
            save(){
                this.saveCrmSection(this.crmSection).then((response) => {
                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        this.$router.push('/work_actions/')
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }
                })
            },
        },
    }
</script>
