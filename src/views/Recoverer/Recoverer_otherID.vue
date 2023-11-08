<template>
    <vx-card no-shadow>
        <div class="mt-5">
            <div class="vx-row" >
                <div class="vx-col sm:w-1/3 w-full mb-2">
                    <h6 class="h6" style="color: #0e84b5">Цедент:</h6>
                    <vs-input class="w-full"  style="margin-bottom: 10px" v-model="recover_other.name"></vs-input>
                    <h6 class="h6" style="color: #0e84b5">Цессионарий:</h6>
                    <vs-input class="w-full"  style="margin-bottom: 10px" v-model="recover_other.name_rec_other" disabled></vs-input>
                    <h6 class="h6" style="color: #0e84b5">ОГРН:</h6>
                    <vs-input class="w-full"  style="margin-bottom: 10px" v-model="recover_other.ogrn"></vs-input>
                    <h6 class="h6" style="color: #0e84b5">ИНН:</h6>
                    <vs-input class="w-full"  style="margin-bottom: 10px" v-model="recover_other.inn"></vs-input>
                    <h6 class="h6" style="color: #0e84b5">Номер договора:</h6>
                    <vs-input class="w-full"  style="margin-bottom: 10px" v-model="recover_other.number_dog"></vs-input>
                    <h6 class="h6" style="color: #0e84b5">Дата договора:</h6>
                    <vs-input class="w-full"  type="date" style="margin-bottom: 10px" v-model="recover_other.dog_date"></vs-input>

                </div>
                <div class="vx-col sm:w-2/3 w-full mb-2">

                    <vs-button class="flex flex-wrap items-center justify-between ag-grid-table-actions-right"  @click="showPopupDoc">Добавить документ цедента</vs-button>
                    <!--<ag-grid-vue
                                 ref="agGridTable"
                                 :gridOptions="gridOptions"
                                 class="ag-theme-material w-100 my-4 ag-grid-table"
                                 :components="components"
                                 :columnDefs="columnDefs"
                                 :defaultColDef="defaultColDef"
                                 :rowData="RecoverOtherDocuments"
                                 rowSelection="multiple"
                                 colResizeDefault="shift"
                                 :animateRows="true"
                                 :floatingFilter="true"
                                 :suppressPaginationPanel="true"
                                 @grid-size-changed="onGridSizeChanged"
                                 @column-resized="onColumnResized"
                                 :enableRtl="$vs.rtl"
                                 style="height: 100%">
                    </ag-grid-vue>-->
                    <TableRecOther :id_rec="$route.params.id_other"></TableRecOther>
                </div>
            </div>
            <div class="vx-row" style="margin-top: 20px;align-items: right">
                <vs-button color="primary"  class="pull-right" type="filled"  @click="close">Закрыть</vs-button>
                <vs-button color="success" class="pull-right" type="filled"  style="margin-left: 20px" @click="save">Сохранить</vs-button>
                <vs-button color="success" class="pull-right" type="filled"  style="margin-left: 20px" @click="saveClose">Сохранить и закрыть</vs-button>

            </div>
            <vs-input id="fileUpload1" type="file" class="w-full mb-base" label-placeholder="file"
                      v-on:change="saveDocument($event,recover_other.id)" style="display: none"/>

            <vs-popup classContent="popup-example" title="Тип документа" :active.sync="popupActive2">

                <div class="mt-8 mb-base">
                    <label class="text-sm">Тип документа</label>
                    <div class="mt-2">
                        <v-select  class="w-50 " :reduce="label => label" label="name" :options="TypesDcDocumentsRec"  v-model="typeDoc" ></v-select>

                        <p style="margin-top: 20px"> Документ должен быть <span style="color: red">{{typeDoc.type_document}}</span></p>

                        <p style="margin-top: 20px"> Название переменной <span style="color: red">{{typeDoc.peremen_name}}</span></p>


                        <!--                                <vs-radio v-model="type_dog" vs-value="0" class="mr-3">Договор</vs-radio>-->
                        <!--                                <vs-radio v-model="type_dog" vs-value="1" class="mr-3">Другое</vs-radio>-->

                    </div>
                </div>
                <div class="flex flex-wrap">
                    <vs-button class="w-1/3 ml-auto" @click="chooseFiles1()" color="primary" type="filled">Выбрать</vs-button>
                </div>


            </vs-popup>
        </div>
    </vx-card>
</template>

<script>
    import { AgGridVue } from 'ag-grid-vue'
    import r from '../../route'
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../axios'
    import vSelect from 'vue-select'
    import DownLoadRecoverOther from './Render/DownLoadRecoverOther.vue'
    import TableRecOther from './Render/TableRecOther.vue'
    export default {
        components: {
            vSelect,
            AgGridVue,
            DownLoadRecoverOther,TableRecOther
        },
        data () {
            return {
                popupActive2:false,
                typeDoc:{
                    id:0,
                    name:'',
                    type_document:'',
                    peremen_name:''
                },

                recover_other:{
                    id_recover:0,
                    id_rec_other:0,
                    name_rec_other:'',
                    name:'',
                    ogrn:'',
                    inn:'',
                    nummber_dog:'',
                    dog_date:'',
                    dog_filename:'',
                    act_filename:'',
                    id:'new',
                    num:null,
                },
                gridApi: null,
                gridOptions: {},
                rowClassRules: null,
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true

                },

                columnDefs: [
                    {
                        headerName: 'Имя документа',
                        field: 'filename',
                        filter: false,
                        width: 400,

                    },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: false,
                        width: 100,
                        cellRendererFramework: 'DownLoadRecoverOther',
                    },

                ],
                components: {
                    DownLoadRecoverOther
                },
            }
        },
        mounted(){
            this.gridApi = this.gridOptions.api
            this.getTypesDcDocuments()
            if(this.$route.params.id_other=='new') {
                this.recover_other.id_recover = this.$route.params.id

                axios.get(r('recoverersOther.index'), {
                    params: {
                        method: 'getCessionary',
                        param: this.$route.params.id
                    }
                }).then((res) => {
                    if (res.data.result) {

                        this.recover_other.name_rec_other = res.data.name
                        this.recover_other.num = res.data.num
                        this.recover_other.id_rec_other=res.data.id_other
                    }
                    else {
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Отсутствует доступ к базе данных !!!',
                            color: 'danger',
                            position: 'top-center'
                        })
                        this.$router.back()
                    }
                }).catch((e) => {
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: e.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                    this.$router.back()
                })
            }
            else {
                this.getDataRecoverersOtherOnce(this.$route.params.id_other).then((res)=>{
                    if(res.result){
                        this.recover_other=res.data
                        this.getRecoverOtherDocuments(this.$route.params.id_other)
                    }
                    else {
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Ошибка !!!',
                            color: 'danger',
                            position: 'top-center'
                        })
                        this.$router.back()
                    }

                }).catch((error)=>{
                    this.$vs.notify({
                                                    title: 'Ошибка',
                                                    text: error.message,
                                                    color: 'danger',
                                                    position: 'top-center'
                                                })
                    this.$router.back()
                })
            }
        },

        computed: {
            ...mapGetters([
                'RecoveresOtherOrgn','TypesDcDocumentsRec','RecoverOtherDocuments'
            ]),
        },
        methods: {
            ...mapActions([
                'getTypesDcDocuments','getRecoverOtherDocuments','saveRecoverersOther','getDataRecoverersOtherOnce'
            ]),
            showPopupDoc(){

                if(this.$route.params.id_other=='new'){
                    this.$vs.notify({
                                                    title: 'Ошибка',
                                                    text: 'Перед добавлением документа, сохраните Цедента(кнопочка сохранить)',
                                                    color: 'danger',
                                                    position: 'top-center'
                                                })
                }
                else {
                    this.popupActive2=true
                }
            },
            close(){
                this.$router.push('/cession/'+this.$route.params.id)
            },
            saveClose(){
                this.$vs.loading({ color: '#ff8000' })
                this.saveRecoverersOther(this.recover_other).then((res)=>{
                    if(res.result)  {
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Успешно!!!',
                            color: 'success',
                            position: 'top-center'
                        })
                        this.$vs.loading.close()
                        this.$router.push('/cession/'+this.$route.params.id)
                    }
                    else {
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: res.error,
                            color: 'danger',
                            position: 'top-center'
                        })

                    }
                    this.$vs.loading.close()
                }).catch(()=>{this.$vs.notify({
                    title: 'Ошибка',
                    text: 'Ошибка !!!',
                    color: 'danger',
                    position: 'top-center'
                })
                this.$vs.loading.close()})
            },
            chooseFiles1: function() {
                if (this.typeDoc.id > 0) {
                    document.getElementById("fileUpload1").click()
                } else {
                    this.$vs.notify({
                        title: 'Сообщение',
                        text: 'Выберите тип документа',
                        color: 'primary',
                        position: 'top-center'
                    })
                }
            },

            saveDocument(evt,data){
                const formData = new FormData()
                formData.append('document', evt.target.files[0])
                formData.append('filename',evt.target.files[0].name)
                formData.append('recover_other',JSON.stringify(this.recover_other))
                formData.append('typedoc', JSON.stringify(this.typeDoc))
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
                axios.post('/recover_other/post-document',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then((response) => {
                    if (response.data.result) {
                        /*this.recover_other.filename=evt.target.files[0].name
                        if(response.data.id!==this.$route.params.id){
                            this.recover_other.id=response.data.id

                        }*/
                        this.getRecoverOtherDocuments(this.$route.params.id_other)
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })

                    }
                    else{
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: response.data.error,
                            color: 'danger',
                            position: 'top-center'
                        })

                    }
                    this.popupActive2=false;
                }).catch(error => {
                       this.popupActive2=false;
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });

            },

            save(){
                this.$vs.loading({ color: '#ff8000' })
                this.saveRecoverersOther(this.recover_other).then((res)=>{
                    if(res.result)  {
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Успешно!!!',
                            color: 'success',
                            position: 'top-center'
                        })
                        this.recover_other.id=res.id
                        this.$router.push('/cession/'+this.$route.params.id+'/'+res.id)
                        this.$vs.loading.close()
                    }
                    else {
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: res.error,
                            color: 'danger',
                            position: 'top-center'
                        })}
                        this.$vs.loading.close()
                }).catch(()=>{this.$vs.notify({
                    title: 'Ошибка',
                    text: 'Ошибка !!!',
                    color: 'danger',
                    position: 'top-center'
                })
                this.$vs.loading.close()
                })

            },

            onColumnResized(params) {
                params.api.resetRowHeights();
            },
            onColumnVisible(params) {
                params.api.resetRowHeights();
            },
            onGridSizeChanged(params) {
                if (params.clientWidth > 500) {
                    this.gridApi.sizeColumnsToFit();
                } else {
                    this.columnDefs.forEach(x => {
                        x.width = 300;
                    });
                    this.gridApi.setColumnDefs(this.columnDefs);
                }
            },

        },
    }
</script>
