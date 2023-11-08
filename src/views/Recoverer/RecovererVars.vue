<template>
    <!-- OrganizationVar Имя Геттера TotalAAAA-->
    <!--OrganizationVarArr Имя Геттера AAAAArr-->
    <!--OrganizationVarOpenLink Кнопка с операциями-->
    <!--000000 Путь для router /adm/users/ -->
    <div class="vx-card p-6">
        <div class="flex flex-wrap justify-between items-center">
            <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                <vs-dropdown vs-trigger-click class="cursor-pointer">
                    <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                        <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalOrganizationVar - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalOrganizationVar }} of {{ TotalOrganizationVar }}</span>
                        <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                    </div>
                    <vs-dropdown-menu>

                        <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                            <span>20</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item @click="gridApi.paginationSetPageSize(50)">
                            <span>50</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item @click="gridApi.paginationSetPageSize(100)">
                            <span>100</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item @click="gridApi.paginationSetPageSize(150)">
                            <span>150</span>
                        </vs-dropdown-item>
                    </vs-dropdown-menu>
                </vs-dropdown>
            </div>

            <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                <div class="dropdown-button-container">
                    <vs-dropdown>
                        <vs-button class="btn-drop"  color="success" type="gradient" icon="more_horiz">Операции с переменными</vs-button>
                        <vs-dropdown-menu>
                            <vs-dropdown-item>
                                <vs-button style="width: 150px" color="success" class="pull-right" type="filled"  @click="addField">Добавить</vs-button>
                            </vs-dropdown-item>
                            <vs-dropdown-item>
                                <vs-button style="width: 150px" color="success" class="pull-right" type="filled"  @click="deleteField">Удалить</vs-button>
                            </vs-dropdown-item>
                            <vs-dropdown-item>
                                <vs-button style="width: 150px" color="success" class="pull-right" type="filled"  @click="editField">Редактировать</vs-button>
                            </vs-dropdown-item>


                        </vs-dropdown-menu>
                    </vs-dropdown>
                </div>




            </div>
        </div>

        <vs-popup    classContent="popup-example"  title="Удаление переменной" :active.sync="deleteVarPopup">
            <div>
                <label>Выберите переменную для удаления</label>
                <v-select  class="w-50 " style="margin-bottom: 10px" :reduce="label => label.name" label="name" :options="OrganizationVarNames"   v-model="organizationVarDeleted.name"  ></v-select>
                <div v-if="!deleteVarAccept" style="margin-top:50px;text-align: center">
                    <vs-button @click="confirmDeleteVar">Удалить</vs-button>
                    <vs-button @click="deleteVarPopup=false">Отмена</vs-button>
                </div>
                <div v-if="deleteVarAccept" style="margin-top:50px;text-align: center">
                    <div style="color:red;text-align: center">Вы действительно хотите удалить переменную <span style="color:blue">{{this.organizationVarDeleted.name}}</span> </div>
                    <div style="color:red;text-align: center">(удаление произойдет во всех организациях)?</div>
                    <div style="margin-top:20px;text-align: center">
                        <vs-button color="red" @click="deleteVar">Удалить</vs-button>
                        <vs-button @click="deleteVarAccept=false">Отмена</vs-button>
                    </div>
                </div>

            </div>
        </vs-popup>

        <vs-popup    classContent="popup-example"  title="Добавление переменной" :active.sync="addVarPopup">
            <div>
                <label>Название переменной (Допустимы только латинские буквы)</label>
                <div class="vx-row">
                    <label style="margin-left: 30px;margin-top: 5px;font-style: oblique">var_orgn_</label>
                    <vs-input class="w-50" v-model="organizationVar.name" @keypress="validateChar" ></vs-input>
                </div>
                <label>Тип переменной</label>
                <v-select  class="w-50 " style="margin-bottom: 10px" :reduce="label => label.id" label="name" :options="typeFields"   v-model="organizationVar.type"  @input="editOrgnType"></v-select>
                <label>Описание переменной</label>
                <vs-textarea rows="5" v-model="organizationVar.description"></vs-textarea>
            </div>
            <div style="text-align: center">
                <vs-button @click="addVar">Сохранить</vs-button>
                <vs-button @click="addVarPopup=false">Отмена</vs-button>
            </div>
        </vs-popup>

        <vs-popup    classContent="popup-example"  title="Редактирование переменной" :active.sync="editVarPopup">
            <label>Выберите переменную для редактирования</label>
            <v-select  class="w-50 " style="margin-bottom: 10px" :reduce="label => label.name" label="name" :options="OrganizationVarNames"   v-model="organizationVarEdit.name"  @input="editOrgnVisible"></v-select>
            <template v-if="organizationVarEdited">
                <div>
                    <label>Название переменной (Допустимы только латинские буквы)</label>
                    <div class="vx-row">
                        <label style="margin-left: 30px;margin-top: 5px;font-style: oblique">var_orgn_</label>
                        <vs-input class="w-50" v-model="organizationVarEdit.new_name" @keypress="validateChar" ></vs-input>
                    </div>
                    <label>Описание переменной</label>
                    <vs-textarea rows="5" v-model="organizationVarEdit.description"></vs-textarea>
                </div>
                <div style="text-align: center">
                    <vs-button @click="editVar">Сохранить</vs-button>
                    <vs-button @click="editVarPopup=false">Отмена</vs-button>
                </div>
            </template>
            <div v-else style="height: 200px"></div>
        </vs-popup>

        <vs-popup    classContent="popup-example"  title="Редактирование значения переменной" :active.sync="editFieldPopup">
            <label>Название переменной <span style="color: red;cursor: pointer" @click="copy(organizationFieldEdit.name)">Copy</span> </label>
            <vs-input class="w-full"  v-model="organizationFieldEdit.name" disabled></vs-input>
            <label>Описание переменной</label>
            <vs-textarea  rows="5" v-model="organizationFieldEdit.description" disabled></vs-textarea>
            <label>Значение переменной</label>
            <vs-input class="w-50" v-if="organizationFieldEdit.typeB==='bigint'" v-model="organizationFieldEdit.value" @keypress="validateInt"></vs-input>
            <vs-input class="w-50" v-if="organizationFieldEdit.typeB==='float'" v-model="organizationFieldEdit.value" @keypress="validateFloat"></vs-input>
            <vs-input class="w-50" type="date" v-if="organizationFieldEdit.typeB==='date'" v-model="organizationFieldEdit.value"></vs-input>
            <vs-checkbox v-if="organizationFieldEdit.typeB==='boolean'" v-model="organizationFieldEdit.value">ДА/НЕТ</vs-checkbox>
            <div v-if="organizationFieldEdit.typeB==='string'">
                <vs-button class="mr-4 sm:mb-0 mb-2"  @click="chooseFiles1()">Загрузить изображение</vs-button>
                <vs-input id="fileUpload1" type="file"  class="w-full mb-base" label-placeholder="file"  v-on:change="saveImage($event)" style="display: none"/>
            </div>
            <vs-textarea v-if="organizationFieldEdit.typeB==='text'" rows="7" v-model="organizationFieldEdit.value"></vs-textarea>
            <div style="text-align: center;margin-top: 20px">
                <vs-button @click="saveField">Сохранить</vs-button>
                <vs-button @click="editFieldPopup=false">Отмена</vs-button>
            </div>
        </vs-popup>
        <!-- AgGrid Table -->
        <ag-grid-vue
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="OrganizationVarArr"
                rowSelection="multiple"
                :rowDataChanged = "onRowDataChanged"
                colResizeDefault="shift"
                :animateRows="true"
                :floatingFilter="false"
                @rowDoubleClicked="onrowDoubleClicked"
                @grid-size-changed="onGridSizeChanged"
                @column-resized="onColumnResized"
                @column-visible="onColumnVisible"
                :pagination="true"
                :paginationPageSize="paginationPageSize"
                :suppressPaginationPanel="true"
                :enableRtl="$vs.rtl">
        </ag-grid-vue>

        <vs-pagination
                :total="totalPages"
                :max="7"
                v-model="currentPage" />

    </div>
</template>

<script>
    import { AgGridVue } from 'ag-grid-vue'
    import Vue from 'vue'
    import vSelect from 'vue-select'
    import RecovererVarOpenLink from './Render/RecovererVarOpenLink.vue'
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../axios'
    import r from '../../route'
    import VueClipboard from 'vue-clipboard2'
    VueClipboard.config.autoSetContainer = true // add this line
    Vue.use(VueClipboard)
    export default {
        components: {
            AgGridVue,
            vSelect,
            RecovererVarOpenLink,
        },
        data() {
            return {
                typeFields:[{id:1,name:'Текст'},
                    {id:2,name:'Целое число'},
                    {id:3,name:'Дробное число'},
                    {id:4, name:'Дата'},
                    {id:5,name:'Логическая переменная (booleen)'},
                    {id:6,name:'Изображение'}],
                // Filter Options
                organizationVar:{
                    name:'',
                    description:'',
                    type:1
                },
                organizationVarDeleted:{
                    name:''
                },
                organizationFieldEdit:{
                    name:'',
                    description:'',
                    value:'',
                    type:'',
                    typeB:'',
                },
                organizationVarEdit:{
                    id_orgn:0,
                    id_recover:this.$route.params.id,
                    name:'',
                    description:'',
                    new_name:'',
                    type:1,
                },
                addVarPopup:false,
                editVarPopup:false,
                deleteVarPopup:false,
                deleteVarAccept:false,
                organizationVarEdited:false,
                editFieldPopup:false,
                searchQuery: '',

                // AgGrid
                gridApi: null,
                gridOptions: {},
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [

                    {
                        headerName: 'Название переменной',
                        field: 'name',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Значение переменной',
                        field: 'value',
                        filter: true,
                        width: 300
                    },
                    {
                        headerName: 'Описание переменной',
                        field: 'description',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Тип переменной',
                        field: 'type',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Операции',
                        field: 'name',
                        filter: true,
                        width: 50,
                        cellRendererFramework: 'RecovererVarOpenLink',
                        cellRendererParams: {
                            editValue: this.editValue.bind(this),
                        },
                    },


                ],

                // Cell Renderer Components
                components: {
                    RecovererVarOpenLink,
                }
            }
        },

        computed: {
            totalPages() {
                if (this.gridApi)
                    return Math.ceil(this.TotalOrganizationVar / this.paginationPageSize)
                else return 0
            },
            paginationPageSize() {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 10
            },
            ...mapGetters([
                'OrganizationVarArr', 'TotalOrganizationVar','OrganizationVarNames'

            ]),
            currentPage: {
                get() {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set(val) {
                    this.gridApi.paginationGoToPage(val - 1)
                }
            },

        },
        methods: {
            copy(data){
                data="${"+data+"}"
                this.$copyText(data)

                alert("Скопировано в буфер обмена");
            },
            ...mapActions([
                'getDataOrganizationVar','saveOrganizationVar','getOrganizationVarNames','saveOrganizationVar',
            ]),
            chooseFiles1: function() {

                document.getElementById("fileUpload1").click()

            },

            saveImage(evt){

                const formData = new FormData()
                formData.append('document', evt.target.files[0])
                formData.append('filename',evt.target.files[0].name)
                formData.append('id_orgn', 0)
                formData.append('id_recover', this.$route.params.id)

                formData.append('data', JSON.stringify(this.organizationFieldEdit))
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
                axios.post('/organizationVars/image',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then((response) => {
                    if (response.data.result) {
                        // this.developmentTask.filename=evt.target.files[0].name
                        // if(response.data.id!=this.$route.params.id){
                        //     this.developmentTask.id=response.data.id
                        //     this.$router.push('/development/'+response.data.id)
                        // }
                        this.editFieldPopup=false;
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })

                    }
                }).catch(error => {
                    this.$vs.loading.close()
                    //   this.popupActive3=false;
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });

            },

            editOrgnType(){
                if(this.organizationVarEdit.type===null)this.organizationVarEdit.type=1;
            },
            editOrgnVisible(){
                this.organizationVarEdited=this.organizationVarEdit.name!=null
                if(this.organizationVarEdited){
                    axios.get(r('organizationVar.index'), {
                        params: {
                            method: 'getOrganizationVarNameOnce',
                            param: this.organizationVarEdit.name
                        }
                    }).then(res=>{
                        if(res.data.result) {
                            this.organizationVarEdit.new_name =res.data.data.name
                            this.organizationVarEdit.description =res.data.data.description

                        }
                    })
                }
            },
            validateChar: event => {
                const charCode = String.fromCharCode(event.keyCode);
                if (!/[a-z,A-Z]/.test(charCode)) {
                    event.preventDefault();
                }
            },
            validateInt: event => {
                const charCode = String.fromCharCode(event.keyCode);
                if (!/[0-9,\-]/.test(charCode)) {
                    event.preventDefault();
                }
            },
            validateFloat: event => {
                const charCode = String.fromCharCode(event.keyCode);
                if (!/[0-9,'\-,\,,\.]/.test(charCode)) {
                    event.preventDefault();
                }
            },
            addVar(){
                this.$vs.loading({ color: '#ff8000' })
                axios.post(r('organizationVar.update'), {
                    params: {
                        method: 'addColumn',
                        param: this.organizationVar
                    }
                }).then(res=>{
                    if(res.data.result){
                        this.$vs.loading.close()
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Успешно!!!',
                            color: 'success',
                            position: 'top-center'
                        })
                        this.getDataOrganizationVar({id_orgn:0,id_recover:this.$route.params.id});
                        this.addVarPopup=false
                    }
                    else{
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: res.data.error,
                            color: 'danger',
                            position: 'top-center'
                        })
                        this.$vs.loading.close()
                    }

                }).catch(e=>{
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: e.getMessage(),
                        color: 'danger',
                        position: 'top-center'
                    })
                })
            },
            confirmDeleteVar(){
                this.deleteVarAccept=true
                // this.organizationVarDeleted.name=null

            },
            editVar(){
                this.$vs.loading({ color: '#ff8000' })
                axios.post(r('organizationVar.update'), {
                    params: {
                        method: 'editColumn',
                        param: this.organizationVarEdit
                    }
                }).then(res=>{
                    if(res.data.result){
                        this.$vs.loading.close()
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Успешно!!!',
                            color: 'success',
                            position: 'top-center'
                        })
                        this.getDataOrganizationVar({id_orgn:0,id_recover:this.$route.params.id})
                        this.editVarPopup=false
                    }
                    else{
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Ошибка !!!',
                            color: 'danger',
                            position: 'top-center'
                        })
                        this.$vs.loading.close()
                    }

                }).catch(e=>{
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Ошибка !!!',
                        color: 'danger',
                        position: 'top-center'
                    })
                })
            },

            deleteVar(){
                this.deleteVarAccept=false
                this.$vs.loading({ color: '#ff8000' })
                axios.post(r('organizationVar.update'), {
                    params: {
                        method: 'deleteColumn',
                        param: this.organizationVarDeleted
                    }
                }).then(res=>{
                    if(res.data.result){
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Переменая удалена',
                            color: 'success',
                            position: 'top-center'
                        })
                        this.deleteVarPopup=false

                    }
                    else {
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Ошибка !!!',
                            color: 'danger',
                            position: 'top-center'
                        })
                    }
                    this.$vs.loading.close()
                    this.getDataOrganizationVar({id_orgn:0,id_recover:this.$route.params.id})
                }).catch(e=>{
                    this.$vs.loading.close()
                    this.getDataOrganizationVar({id_orgn:0,id_recover:this.$route.params.id})
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Ошибка !!!',
                        color: 'danger',
                        position: 'top-center'
                    })
                })
            },
            saveField(){
                this.organizationFieldEdit.id_orgn=0
                this.organizationFieldEdit.id_recover=this.$route.params.id
                this.$vs.loading({ color: '#ff8000' })
                this.saveOrganizationVar(this.organizationFieldEdit)
                    .then(res=>{
                        this.$vs.loading.close()
                        if(res){
                            this.$vs.notify({
                                title: 'Успешно',
                                text: 'Успешно!!!',
                                color: 'success',
                                position: 'top-center'
                            })
                            this.editFieldPopup=false
                            this.getDataOrganizationVar({id_orgn:0,id_recover:this.$route.params.id})
                        }
                        else{
                            this.$vs.notify({
                                title: 'Ошибка',
                                text: 'Ошибка !!!',
                                color: 'danger',
                                position: 'top-center'
                            })
                        }
                    }).catch(error=>{
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Ошибка !!!',
                        color: 'danger',
                        position: 'top-center'
                    })
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
            onrowDoubleClicked(event) {
                this.organizationFieldEdit.name=event.data.name
                this.organizationFieldEdit.description=event.data.description
                this.organizationFieldEdit.value=event.data.value
                this.organizationFieldEdit.type=event.data.type
                this.organizationFieldEdit.typeB=event.data.typeB

                this.editFieldPopup=true
            },
            editValue(params){
                this.organizationFieldEdit.name=params.name
                this.organizationFieldEdit.description=params.description
                this.organizationFieldEdit.value=params.value
                this.organizationFieldEdit.type=params.type
                this.organizationFieldEdit.typeB=params.typeB
                this.editFieldPopup=true
            },
            addField() {
                this.organizationVar.name=''
                this.organizationVar.description=''
                this.addVarPopup=true
            },
            deleteField(){
                this.organizationVarDeleted.name=null
                this.getOrganizationVarNames().then(res=>{
                    this.deleteVarPopup=true
                })

            },
            editField(){
                this.getOrganizationVarNames().then(res=>{
                    this.organizationVarEdit.name=null
                    this.organizationVarEdited=false
                    this.editVarPopup=true
                })

            },

            updateSearchQuery(val) {
                this.gridApi.setQuickFilter(val)
            },
            onRowDataChanged() {
                Vue.nextTick(() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },

        },
        mounted() {
            this.gridApi = this.gridOptions.api
            this.getDataOrganizationVar({id_orgn:0,id_recover:this.$route.params.id})
            this.organizationFieldEdit.id_orgn=0
            this.organizationFieldEdit.id_recover=this.$route.params.id
        }
    }
</script>

<style scoped>

</style>