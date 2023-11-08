<template>
    <div id="page-user-list">
        <div class="vx-card p-6" style="min-height: 95vh">
          <vs-checkbox style="margin-bottom: 15px;margin-top:10px" v-model="setting.sendFns" @input="save">Отправлять в ФНС</vs-checkbox>
<!--          <vs-checkbox style="margin-bottom: 15px;margin-top:10px" v-model="setting.checkDocument" @input="save">Проверять наличие документов перед отправкой</vs-checkbox>-->

          <div class="vx-row" style="margin-top: 20px">

            <div class="vx-col mb-2" style="margin-left: 10px;margin-top: 5px">
              <vs-button color="success" style="width: 200px;" @click="showAdd=!showAdd">Добавить</vs-button>
            </div>

          </div>

          <div class="out-main-11" style="margin-top: 20px">
            <ag-grid-vue
                ref="agGridTable"
                style="height: 400px"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="FnsSettingShablon"
                rowSelection="multiple"
                colResizeDefault="shift"
                :animateRows="true"
                :floatingFilter="false"
                :pagination="true"
                :suppressPaginationPanel="true"
                @grid-size-changed="onGridSizeChanged"
                @column-resized="onColumnResized"
                @column-visible="onColumnVisible"
                @rowDoubleClicked="onrowDoubleClickedTask"
                :enableBrowserTooltips="true"
                :overlayNoRowsTemplate="'Нет шаблонов'"
                :enableRtl="$vs.rtl">
            </ag-grid-vue>
            <transition name="fade">
              <div class="outer-div-11" v-if="FnsSettingShablonLoadingFlag"><img class="load-bar-11" src="/loading.gif"></div>
            </transition>
          </div>
          <vs-popup classContent="popup-example" title="Шаблоны" :active.sync="showAdd">
            <label class="text-sm">Цессия:</label>
            <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="optArr"   v-model="editData.id_recover"  ></v-select>
            <label style="margin-bottom: 10px;">Шаблон групповой:</label>
            <v-select  class="w-50 " :reduce="label => label.id" label="nameForTask" :options="ShablonDocumentArrGroup"  v-model="editData.id_shab"  ></v-select>
            <div style="text-align: center;margin-top: 20px">
              <vs-button color="success" style="width: 200px;" @click="addShablon">Сохранить</vs-button>
            </div>


          </vs-popup>


        </div>
    </div>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    import r from '@/route';
    import axios from '@/axios'
    import Open from './Render/Open'
    export default {
        components: {
          Open
        },
        data () {
            return {
              editData:{},
              gridApi: null,
              gridOptions: {},
              defaultColDef: {
                sortable: true,
                resizable: true,
                suppressMenu: true
              },
              columnDefs: [


                {
                  headerName: 'Организация',
                  field: 'id_recover',
                  headerTooltip: 'Организация или взыскатель',
                  tooltipField: 'id_recover',
                  filter: true,
                  width: 200,
                  cellRenderer: params =>{
                    for (let i = 0; i < this.optArr.length; i++) {
                      if (this.optArr[i].id==params.data.id_recover){return this.optArr[i].name}
                    }
                    return ''
                  }
                },
                {
                  headerName: 'Шаблон',
                  headerTooltip: 'Шаблон',
                  tooltipField: 'name_shab',
                  field: 'name_shab',
                  filter: true,
                  width: 200,

                },
                {
                  headerName: 'Операции',
                  field: 'id',
                  filter: true,
                  width: 200,
                  cellRendererFramework: 'Open',
                  cellRendererParams: {
                    delete_var: this.deleteRecord.bind(this),

                  }
                },

              ],
              components: {
                Open
              },
              showAdd:false,
              setting:{

              },
            }
        },
        mounted(){
          this.gridApi = this.gridOptions.api;
          this.getSetting()
          this.getDataShablonDocuments()
          this.getFnsSettingShablons()
        },
        computed: {

          optArr(){
            let arr=[];
            arr.push({
              name:'Все',
              id:0
            })
            for (let index = 0; index < this.RecoverersArr.length; ++index) {
              if(this.RecoverersArr[index].cession==0){
                arr.push({
                  name:'Взыскатель '+this.RecoverersArr[index].name,
                  id:this.RecoverersArr[index].id,
                })
              }

            }
            for (let index = 0; index < this.OrganizationArr.length; ++index) {
              arr.push({
                name:'Организация '+this.OrganizationArr[index].name,
                id:-this.OrganizationArr[index].id,
              })
            }
            return arr
          },
          ...mapGetters([
            'FnsSettingShablon','FnsSettingShablonLoadingFlag','TotalFnsSettingShablon','RecoverersArr','OrganizationArr','ShablonDocumentArrGroup'
          ]),

        },
        methods: {
          deleteRecord (id) {
            axios.post(r('settingFns.update'), {
              params: {
                method: 'deleteShablon',
                param:id
              }
            }).then((response) => {
              this.getFnsSettingShablons()
              if(response.data.result){
                this.$vs.notify({
                  color: 'success',
                  title: 'Запись',
                  text: 'Запись удалена!!!',
                  position: 'top-center'
                })
              }
              else{
                this.$vs.notify({
                  color: 'danger',
                  title: 'Запись',
                  text: 'Запись не удалось!!!',
                  position: 'top-center'
                })

              }

            })



          },
          addShablon(){
            this.$vs.loading({ color: '#ff8000' })
            axios.post(r("settingFns.update"), {
              params: {
                method: 'saveShablon',
                param: this.editData

              }
            }).then((response) => {
              if (response.data.result) {
                this.editData={}
                this.showAdd=false;
                this.$vs.notify({
                  title: 'Успешно',
                  text: 'Сохранено!!!',
                  color: 'success',
                  position: 'top-center'
                })

              }
              else {
                this.$vs.notify({
                  title: 'Ошибка',
                  text: 'Сохранить не удалось !!!',
                  color: 'danger',
                  position: 'top-center'
                })
                // this.close();
              }
              this.$vs.loading.close()
              this.getFnsSettingShablons()
            }).catch(e=>{
              this.$vs.loading.close()
            })
          },
          onrowDoubleClickedTask(e){
            this.editData=e.data
            this.showAdd=true

          },

          onColumnResized(params) {
            params.api.resetRowHeights();
          },
          onColumnVisible(params) {
            params.api.resetRowHeights();
          },
          changePag(pag) {
            this.gridApi.paginationSetPageSize(pag)
          },

          ...mapActions([
              'getFnsSettingShablons','getDataShablonDocuments'
          ]),
          updateSearchQuery(val) {
            this.gridApi.setQuickFilter(val)
          },
          onRowDataChanged() {
            Vue.nextTick(() => {
                  this.gridOptions.api.sizeColumnsToFit();
                }
            );
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
            getSetting(){
              axios.get(r("settingFns.index"), {
                params: {
                  method: 'getSettingFns',
                  param: ''
                }
              }).then((response) => {
                if (response.data.result){

                  this.setting=response.data.data
                }
              })
            },
          save(){
            this.$vs.loading({ color: '#ff8000' })
            axios.post(r("settingFns.update"), {
              params: {
                method: 'saveSetting',
                param: this.setting

              }
            }).then((response) => {
              if (response.data.result) {

                this.$vs.notify({
                  title: 'Успешно',
                  text: 'Сохранено!!!',
                  color: 'success',
                  position: 'top-center'
                })

              }
              else {
                this.$vs.notify({
                  title: 'Ошибка',
                  text: 'Сохранить не удалось !!!',
                  color: 'danger',
                  position: 'top-center'
                })
                // this.close();
              }
              this.$vs.loading.close()
              this.getSetting()
            }).catch(e=>{
              this.$vs.loading.close()
            })


          },



        },
    }
</script>
