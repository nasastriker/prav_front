<template>
    <div class="mt-5">
    <ul class="vx-timeline">
        <li v-for="item in data" :key="item.id">
                <!--<feather-icon :icon="item.icon" svgClasses="text-white stroke-current w-5 h-5" />-->
            <div class="vx-row">
                <div class="timeline-icon" :class="`bg-${item.color}`">
                    <feather-icon :icon="item.icon" svgClasses="text-white stroke-current w-5 h-5" />
                </div>
            <div class="timeline-info">
                <p class="font-semibold">Цедент № {{item.num}} <span style="color:blue">{{ item.name }}</span></p>
                <div class="activity-desc"> ОГРН: {{ item.ogrn}}</div>
                <div class="activity-desc"> ИНН: {{ item.inn}}</div>
                <div class="activity-desc">Номер договора: {{ item.number_dog }}</div>
                <div class="activity-desc">Дата договора: {{ item.dog_date }}</div>
            </div>
            </div>
            <small class="text-grey activity-e-time" style="cursor: pointer;color: blueviolet!important;"  @click="docView(item.id)">Документы</small>
            <small class="text-grey activity-e-time" style="cursor: pointer;color: green!important;"  @click="edit(item.id)">Редактировать</small>
            <small v-if="item.num-1===data.length" class="text-grey activity-e-time" style="cursor: pointer;color: red!important;"  @click="confirmDeleteRecord(item.id)">Удалить</small>
        </li>
    </ul>

    <vs-popup classContent="popup-example" title="Тип документа" :active.sync="popupActive">
        <div class="vx-row" >
            <TableRecOther :id_rec="id_other" style="height: 500px;width: 100%;margin-left: 10px"></TableRecOther>
        </div>
    </vs-popup>
   </div>
</template>

<script>

    import { mapActions,mapGetters } from 'vuex'
    import TableRecOther from './TableRecOther.vue'
    export default {
        components:{
            TableRecOther
        },
        props: {
            data: {
                type: Array,
                required: true
            },
            id_recover:{
                required: true
            }
        },

        data(){
            return{
                popupActive:false,
                id_other:0
            }
        },
        mounted(){
        },
        methods: {
            ...mapActions([
                'deleteRecoverOther','getDataRecoverersOther','getRecoverOtherDocuments'
            ]),

            edit(id){
                this.$router.push('/cession/'+this.$route.params.id+'/'+id)
            },
            docView(id){
                this.id_other=id
                this.getRecoverOtherDocuments(id)
                this.popupActive=true
            },
            confirmDeleteRecord (id) {
                this.id_other=id
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Удаление',
                    text: `Вы действительно хотите удалить? `,
                    accept: this.deleteRecord,
                    acceptText: 'Удалить',
                    cancelText: 'Отмена'
                })
            },
            deleteRecord () {
                this.deleteRecoverOther(this.id_other).then((value)=> {
                    if(value){
                        this.showDeleteSuccess()
                        this.getDataRecoverersOther(this.id_recover)
                    }
                    else{
                        this.showDeleteDanger()

                    }
                });

            },
            showDeleteSuccess () {
                this.$vs.notify({
                    color: 'success',
                    title: 'Сообщение',
                    text: 'Удален!!!',
                    position: 'top-center'
                })
            },
            showDeleteDanger () {
                this.$vs.notify({
                    color: 'danger',
                    title: 'Сообщение',
                    text: 'Удалить не удалось!!!',
                    position: 'top-center'
                })
            }

        },
        computed: {
            ...mapGetters([

            ]),



        },

    }
</script>

<style lang="scss">
    @import "@sass/vuexy/components/vxTimeline.scss";
</style>
