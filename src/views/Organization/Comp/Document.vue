<template>

    <vx-card no-shadow>

        <div class="mt-5">
            <h2 style="margin-bottom: 10px; padding-bottom: 20px">{{label}} </h2>
            <vs-tabs>

                <vs-tab label="Документы">
                    <h3 style="margin-top: 15px">Договор займа:</h3>
                    <div class="flex flex-wrap items-center mb-base">
                        <div @click="downloadDocument(data.id,'contract')">
                            <template v-if="documentUrl!='/document_recover/null'">
                                <vs-avatar :src="documentWord" size="70px" class="mr-4 mb-4" />
                            </template>



                        </div>


                        <div>
                            <vs-button class="mr-4 sm:mb-0 mb-2"  @click="chooseFiles()">Загрузить документ</vs-button>
                            <vs-input id="fileUpload" type="file"  class="w-full mb-base" label-placeholder="file"  v-on:change="saveDocument($event,'contract')" style="display: none"/>


                            <p class="text-sm mt-2">Документ должен быть doc,docx</p>
                        </div>
                    </div>
                    <h3 style="margin-top: 15px">Уведомление о переуступке:</h3>
                    <div class="flex flex-wrap items-center mb-base">
                        <div @click="downloadDocument(data.id,'ustup')">
                            <template v-if="documentUrlUst!='/document_recover/null'">
                                <vs-avatar :src="documentWord" size="70px" class="mr-4 mb-4" />
                            </template>



                        </div>


                        <div>
                            <vs-button class="mr-4 sm:mb-0 mb-2"  @click="chooseFiles1()">Загрузить документ</vs-button>
                            <vs-input id="fileUpload1" type="file"  class="w-full mb-base" label-placeholder="file"  v-on:change="saveDocument($event,'ustup')" style="display: none"/>


                            <p class="text-sm mt-2">Документ должен быть doc,docx</p>
                        </div>
                    </div>




                </vs-tab>


            </vs-tabs>
        </div>
        <div style="margin-top: 20px">
            <vs-button color="primary"  class="pull-right" type="filled"  @click="close">Закрыть</vs-button>
            <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>


        </div>





    </vx-card>


</template>

<script>
    import { VueCsvImport } from 'vue-csv-import';
    import VueSuggestions from 'vue-suggestions';
    import { AgGridVue } from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import { mapActions,mapGetters } from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    export default {
        components: {
            AgGridVue,
            vSelect,
            VueCsvImport,
            VueSuggestions
        },
        data () {
            return {
                label:'Новый договор Цессии:',
                data: {},
                data_reg: {},


            }

        },

        computed: {
            ...mapGetters([
               'SuggestionOptionsAddress'
            ]),

        },
        methods: {
            ...mapActions([
                'saveCession',
            ]),
            save(){
                this.saveCession(this.data).then((response) => {
                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        this.$router.back()
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }


                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });
            },
            close(){
                this.$router.back()
            },

            getData(id){
                axios.get(r("cession.index"), {
                    params: {
                        method: 'getCession',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.data=response.data.data;
                        this.data_reg=response.data.data;
                    }



                })
            },

        },
        mounted () {
            if (this.$route.params.id){
                if (this.$route.params.id!='new') {
                    this.getData(this.$route.params.id);
                    this.label='Редактирование договора Цессии:'
                }
                else {
                    this.label='Новый договор Цессии:'
                }


            }
        }
    }

</script>

<style lang="scss">
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
