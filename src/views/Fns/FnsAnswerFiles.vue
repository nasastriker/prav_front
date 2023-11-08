<template>
    <div id="page-user-list">
<!--            <div class="flex flex-wrap justify-between items-center">-->
            <div>
<!--                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">-->
                <div style="display: flex">
                  <div>
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div
                            class="cursor-pointer flex items-center justify-between font-medium" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{
                                    currentPage * paginationPageSize - (paginationPageSize - 1)
                                }} - {{
                                    TotalRecordsFns - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalRecordsFns
                                }} of {{ TotalRecordsFns }}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4"/>
                        </div>
                        <vs-dropdown-menu>
                            <vs-dropdown-item @click="changePag(20)">
                                <span>20</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="changePag(50)">
                                <span>50</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="changePag(100)">
                                <span>100</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="changePag(150)">
                                <span>150</span>
                            </vs-dropdown-item>
                        </vs-dropdown-menu>
                    </vs-dropdown>
                  </div>
<!--                    <vs-dropdown vs-trigger-click class="cursor-pointer">-->
<!--                        <div-->
<!--                            class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">-->
<!--                            <span class="mr-2">Статус</span>-->
<!--                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4"/>-->
<!--                        </div>-->
<!--                        <vs-dropdown-menu>-->
<!--                            <vs-dropdown-item @click="hideFnsFiles('status_no')">-->
<!--                                <vs-checkbox v-model="FnsAnswerFile.pag.fns_answer_files_status.status_no">Ответа нет-->
<!--                                </vs-checkbox>-->
<!--                            </vs-dropdown-item>-->
<!--                            <vs-dropdown-item @click="hideFnsFiles('status_ok')">-->
<!--                                <vs-checkbox v-model="FnsAnswerFile.pag.fns_answer_files_status.status_ok">Загружен-->
<!--                                </vs-checkbox>-->
<!--                            </vs-dropdown-item>-->
<!--                            <vs-dropdown-item @click="hideFnsFiles('status_done')">-->
<!--                                <vs-checkbox v-model="FnsAnswerFile.pag.fns_answer_files_status.status_done">Остальные-->
<!--                                </vs-checkbox>-->
<!--                            </vs-dropdown-item>-->
<!--                          <vs-dropdown-item @click="hideFnsFiles('status_check_file')">-->
<!--                            <vs-checkbox v-model="FnsAnswerFile.pag.fns_answer_files_status.status_check_file">Проверить файл-->
<!--                            </vs-checkbox>-->
<!--                          </vs-dropdown-item>-->
<!--                        </vs-dropdown-menu>-->
<!--                    </vs-dropdown>-->

                  <div style="margin-left: 15px;width: 400px">
                  <v-select class="w-full" :reduce="label => label.id" label="text" :options="FnsStatuses"
                            v-model="FnsAnswerFile.pag.fns_answer_files_status" @input="setFnsStatus"></v-select>
                  </div>
<!--                </div>-->
<!--                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">-->
                  <div style="margin-left: auto;">
<!--                    <div class="pull-right" style="margin-right: 10px;">-->
<!--                        <img src="/loading.gif" v-if="FnsAnswerLoadingFlag" style="max-width: 40px; margin-top: 5px;">-->
<!--                    </div>-->
<!--                    <div>-->
                  <vs-button style="margin-right: 10px;" color="success" class="pull-right" type="filled"
                             @click="showTypesUpload=!showTypesUpload">Загрузить файлы
                  </vs-button>
                  <vs-button style="margin-right: 10px;" color="danger" class="pull-right" type="filled"
                             @click="fnsReset">Очистить
                  </vs-button>
                    <vs-button style="margin-right: 10px;" color="primary" class="pull-right" type="filled"
                               @click="refreshTableAnswerFiles">Обновить
                    </vs-button>
<!--                    </div>-->
                  </div>
                </div>
<!--              <vs-input ref="fileUploadFnsFiles" type="file" class="w-full mb-base" label-placeholder="file"-->
<!--                        v-on:change="saveDocumentFns($event)" style="display: none"/>-->

              <input type="file" ref="fileUploadFnsFiles" class="hidden" accept=".pdf" @change="saveDocumentFns($event)">
            </div>
      <div class="out-main">
            <ag-grid-vue
                style="height: 650px"
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="FnsCreditsArr"
                rowSelection="multiple"
                :rowDataChanged="onRowDataChanged"
                colResizeDefault="shift"
                :animateRows="true"
                :floatingFilter="false"
                :pagination="true"
                :paginationPageSize="paginationPageSize"
                :suppressPaginationPanel="true"
                @rowDoubleClicked="onrowDoubleClicked"
                :enableRtl="$vs.rtl"
                @grid-size-changed="onGridSizeChanged"
                @column-resized="onColumnResized"
                @column-visible="onColumnVisible"
                :overlayNoRowsTemplate="'Нет записей'"
                :rowClassRules="rowClassRules"
                :enableBrowserTooltips="true">
            </ag-grid-vue>
        <transition name="fade">
          <div class="tablePreloader outer-div" v-if="FnsAnswerLoadingFlag">
            <img class="load-bar" src="/loading.gif">
            <span>Идёт загрузка</span>
          </div>
        </transition>
      </div>

            <vs-popup :title="p_debtor_fio" :active.sync="popupActiveAnswerFile">
                <InFnsAnswersDialog :fnsData="fnsData" :what_from="what_from" @refreshAfterSet="onRefreshAfterSet"></InFnsAnswersDialog>
            </vs-popup>
            <vs-pagination
                :total="totalPages"
                :max="7"
                v-model="currentPage"/>

              <vs-popup :title="'Поиск результата '+debtorData.debtor_fio+' (ДР: '+debtorData.debtor_dr+' ИНН: '+debtorData.debtor_inn+' Место рождения: '+debtorData.debtor_mr+')'" :active.sync="popupActiveAnswer">
                <div v-if="setVarToCreditFlag">
                  <h5 style="text-align: center">Вы действительно хотите привязать данный ответ ФНС:</h5>
                  <h4 style="text-align: center"><b> {{ itemTemp.debtor_data.last_name }} {{ itemTemp.debtor_data.first_name }} {{ itemTemp.debtor_data.middle_name }} (ДР: {{ itemTemp.dr_norm }})</b></h4>
                  <h5 style="text-align: center">к заемщику:</h5>
                  <h4 style="text-align: center"><b> {{ debtorData.debtor_fio }} (ДР: {{ debtorData.debtor_dr }}) </b>?</h4>
                  <div v-if="isSetOnFioFlag">
                    <h5 style="text-align: center">В БД к фамилии заемщика {{ debtorData.debtor_fio }} будет добавлено: ({{ itemTemp.debtor_data.last_name }})</h5>
                  </div>
                  <br>
                  <div style="text-align: center;">
                    <vs-button color="danger" class="pull-right" type="filled" @click="setYes">Да</vs-button>
                    <vs-button color="success" class="pull-right" type="filled" @click="setNo">Нет</vs-button>
                  </div>
                </div>
                <div v-else>
                  <div v-if="FnsNotArr.length > 0">
                    <div style="display: flex">
                      <h5>Всего вариантов: {{ FnsNotArr.length }}</h5>
                      <vs-checkbox style="margin-bottom: 15px;margin-left: auto" v-model="showInFileDataTextFlag">Показать фрагменты текста</vs-checkbox>
                    </div>
                    <template v-for="item in FnsNotArr">
                      <div style="display: flex;">
                        <div>
                          <h6 class="to-set-info" style="text-align: center">
                            <span v-html="highlight(item.debtor_data.last_name, debtorData.name_family)"></span>
                            <span v-html="highlight(item.debtor_data.first_name, debtorData.name)"></span>
                            <span v-html="highlight(item.debtor_data.middle_name, debtorData.name_patronymic)"></span>
                            (ДР: <span v-html="highlight(item.dr_norm, debtorData.debtor_dr)"></span>
                            ИНН: <span v-html="highlight(item.debtor_data.inn, debtorData.debtor_inn)"></span>)
                          </h6>
                        </div>
                        <h6 class="to-set" style="margin-left: auto;cursor: pointer" @click="showQuest(item)">Привязать</h6>
                        <h6 class="to-set" style="margin-left: 30px;cursor: pointer" @click="showQuestOnFio(item)">Привязать по ФИО</h6>
                      </div>
                      <div v-if="showInFileDataTextFlag" style="padding: 20px">
                        {{ item.in_file_data }}
                      </div>
                      <hr style="margin-bottom: 5px; margin-top: 5px; border: 0.5px solid #7367f0;">
                    </template>
                  </div>
                  <div v-else>
                    <h3>Нет вариантов для поиска</h3>
                  </div>
                </div>
              </vs-popup>

          <vs-popup :title="debtorData.debtor_fio+' (ДР: '+debtorData.debtor_dr+' ИНН: '+debtorData.debtor_inn+' Место рождения: '+debtorData.debtor_mr+')'" :active.sync="popupActiveAnswerDone">
            <div class="vx-row">
              <div class="vx-col sm:w-1/4 w-full mb-2 hover:text-primary cursor-pointer" style="text-align: center" @click="setOtherStatus(2)">
                <feather-icon icon="PhoneOffIcon" svgClasses="h-10 w-10"/>
                <br>
                <span style="font-size: x-large">Нет ответа ФНС</span>
              </div>
              <div class="vx-col sm:w-1/4 w-full mb-2 hover:text-primary cursor-pointer" style="text-align: center" @click="setOtherStatus(3)">
                <feather-icon icon="UserXIcon" svgClasses="h-10 w-10"/>
                <br>
                <span style="font-size: x-large">Умерший</span>
              </div>
              <div class="vx-col sm:w-1/4 w-full mb-2 hover:text-primary cursor-pointer" style="text-align: center" @click="setOtherStatus(4)">
                <feather-icon icon="FileMinusIcon" svgClasses="h-10 w-10"/>
                <br>
                <span style="font-size: x-large">Нет сведений в ФНС</span>
              </div>
              <div class="vx-col sm:w-1/4 w-full mb-2 hover:text-primary cursor-pointer" style="text-align: center" @click="setOtherStatus(5)">
                <feather-icon icon="CheckSquareIcon" svgClasses="h-10 w-10"/>
                <br>
                <span style="font-size: x-large">Обработан</span>
              </div>
            </div>
          </vs-popup>

      <input type="file" ref="fileAnswerFnsInputOne" class="hidden" accept=".pdf" @change="changeFilePdf($event)">
      <input type="file" multiple ref="fileAnswerFnsInputMany" class="hidden" accept=".pdf" @change="changeFilePdf($event)">
      <input type="file" ref="fileAnswerFnsInputOneExcelList" class="hidden" accept=".xlsx" @change="changeFilePdf($event)">
      <vs-popup classContent="popup-example" title="Тип загрузки" :active.sync="showTypesUpload">
        <h5 style="color: red;margin-bottom: 20px">!!! Ответы по форме КНД 1120498(9) загружаются по схеме "1 заемщик = 1 файл" !!!</h5>
        <div style="display: flex">
          <vs-button color="danger" type="filled" @click="uploadOne">Заемщики в ОДНОМ файле</vs-button>
          <vs-button color="success" type="filled" style="margin-left: 20px" @click="uploadMany">Заемщики в РАЗНЫХ файлах</vs-button>
          <vs-button color="warning" type="filled" style="margin-left: 20px" @click="uploadExcelList">Заемщики списком в Excel</vs-button>
        </div>
      </vs-popup>

      <vs-popup classContent="popup-example" title="Смена данных заемщика в СРМ" :active.sync="showChangeDebtorData">
        <h5>Смена данных заемщика <b>{{ changeDebtorData.crm_fio }}</b></h5>
        <div style="margin-top: 20px;color: red">При смене фамилии заменяемая будет записана в поле <b>Предыдущая фамилия</b></div>
        <div style="margin-top: 20px">
        <div v-if="!changeDebtorData.change_exist_flag">
          <span style="color: red"><b>Нет пунктов для смены</b></span>
        </div>
          <div v-else>
            <span><b>Выберите пункты для смены:</b></span>
          </div>
        <div style="margin-top: 10px">
          <div v-for="chb_arr_item in changeDebtorData.chb_arr">
            <div v-if="chb_arr_item.chb">
              <vs-checkbox v-model="chb_arr_item.check">
                {{ chb_arr_item.text }}
              </vs-checkbox>
            </div>
            <div v-else>
              <span style="color: #c2c2c2;margin-left: 30px">{{ chb_arr_item.text }}</span>
            </div>
          </div>
        </div>
        </div>
        <vs-button style="margin-top: 30px" color="danger" type="filled" @click="changeDebtorDataRun">Сменить</vs-button>
      </vs-popup>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import FnsFileStatus from './Render/FnsFileStatus.vue'
import InFnsAnswersDialog from './InFnsAnswersDialog.vue'
import FnsAnswer from "./FnsAnswer.vue";
import ImportAnswerFileFnsRender from "./Render/ImportAnswerFileFnsRender.vue";

export default {
    components: {
        FnsFileStatus,
        InFnsAnswersDialog,
        FnsAnswer,
        ImportAnswerFileFnsRender
    },
    data() {
        return {
          typeLoad: 'pdf',
          changeDebtorData:{},
          popupActiveAnswer:false,
          popupActiveAnswerDone:false,
          showTypesUpload:false,
          showChangeDebtorData:false,
          debtorData:{},
          setVarToCreditFlag:false,
          isSetOnFioFlag:false,
          showInFileDataTextFlag:false,
          itemTemp:{},
          manyFilesLoad:false,
          rowClassRules: null,
          what_from: 'fromAnswers',
          p_debtor_fio: '',
          fnsData: [],


            id_cr: 0,
            id_dcr: 0,

            // AgGrid
            gridApi: null,
            gridOptions: {},
            popupActiveAnswerFile: false,
            defaultColDef: {
                sortable: true,
                resizable: true,
                suppressMenu: true
            },
            columnDefs: [
                {
                    headerName: 'Заемщик',
                    headerTooltip: 'Заемщик',
                    tooltipField: 'debtor_fio',
                    field: 'debtor_fio',
                    filter: true,
                    width: 300,
                },
                {
                    headerName: 'Дата рождения',
                    headerTooltip: 'Дата рождения',
                    tooltipField: 'debtor_dr',
                    field: 'debtor_dr',
                    filter: true,
                    width: 120,
                },
                {
                    headerName: 'ИНН',
                    headerTooltip: 'ИНН',
                    tooltipField: 'debtor_inn',
                    field: 'debtor_inn',
                    filter: true,
                    width: 120,
                },
                {
                    headerName: 'Кредит',
                    headerTooltip: 'Кредит',
                    tooltipField: 'id_debtorcredit',
                    field: 'id_debtorcredit',
                    filter: true,
                    width: 100,
                },
                {
                    headerName: 'Статус',
                    headerTooltip: 'Статус',
                    tooltipField: 'status',
                    field: 'status',
                    filter: true,
                    width: 280,
                    cellRendererFramework: 'FnsFileStatus',
                    cellRendererParams: {
                        showInfoFnsAnswer: this.showAnswerDataInfo.bind(this),
                        loadFnsAnswer: this.loadFnsAnswer.bind(this),
                        showInfoFind: this.showInfoFind.bind(this),
                        showInfoDone: this.showInfoDone.bind(this),
                        setOtherStatusNull: this.setOtherStatusNull.bind(this),
                        getFileUrlFns: this.getFileUrlFns.bind(this),
                        changeDebtorDataFnsAnswer: this.changeDebtorDataFnsAnswer.bind(this)
                    }
                },
            ],
            components: {
                FnsFileStatus
            }
        }
    },

  created() {
    this.rowClassRules = {
      'row-no-file': (params) => {
        var status_file = params.data.not_copy_file;
        return status_file === 1;
      },
    };
  },

    computed: {
        totalPages() {
            if (this.gridApi)
                return Math.ceil(this.TotalRecordsFns / this.paginationPageSize)
            else return 0
        },
        paginationPageSize() {
            return this.FnsAnswerFile.pag.fns_answer_files
        },
        ...mapGetters([
            'FnsCreditsArr', 'FnsAnswerFile', 'TotalRecordsFns', 'FnsAnswerFileName', 'FnsAnswerLoadingFlag','FnsNotArr',
            'FnsStatuses'
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
      setFnsStatus(){
        if (this.FnsAnswerFile.pag.fns_answer_files_status == null){
          this.FnsAnswerFile.pag.fns_answer_files_status = 'all';
        }

        this.refreshTableAnswerFiles();
      },
      changeDebtorDataRun(){
        let flag = false;

        if (this.changeDebtorData.change_exist_flag) {
          for (var i = 0; i < this.changeDebtorData.chb_arr.length; i++) {
            if (this.changeDebtorData.chb_arr[i].check) {
              flag = true;
            }
          }
        } else {
          this.$vs.notify({
            title: 'Ошибка',
            text: 'Нет пунктов для смены',
            color: 'danger',
            position: 'top-center'
          })

          return false;
        }

        if (flag){
          this.changeDebtorDataOnFnsAnswer(this.changeDebtorData).then((response) => {
            if (response.result) {
              this.refreshTableAnswerFiles();
              this.showChangeDebtorData = false;
            } else {
              this.$vs.notify({
                title: 'Ошибка',
                text: response.error,
                color: 'danger',
                position: 'top-center'
              })
            }
          });
        } else {
          this.$vs.notify({
            title: 'Ошибка',
            text: 'Выберите пункты для смены',
            color: 'danger',
            position: 'top-center'
          })
        }
      },

      changeFilePdf(evt) {
        this.showTypesUpload = false;
        this.saveFnsAnswerFileForImportServOnDisk({
          files: evt.target.files,
          id_file_request: this.$route.params.id
        }).then((response) => {
          if (response.result) {
            this.$refs['fileAnswerFnsInputOne'].value = null
            this.$refs['fileAnswerFnsInputMany'].value = null
            this.$refs['fileAnswerFnsInputOneExcelList'].value = null
            this.startingParseFilesAnswersFns({
              response: response,
              id_file: this.$route.params.id,
              many_files_load: this.manyFilesLoad,
              type_load: this.typeLoad
            }).then((response_start) => {
              if (response_start.result) {
                this.$vs.notify({
                  title: 'Сообщение',
                  text: 'Загрузка начата',
                  color: 'success',
                  position: 'top-center'
                })
              } else {
                this.$vs.notify({
                  title: 'Ошибка',
                  text: 'Загрузка не начата',
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
          } else {
            this.$vs.notify({
              title: 'Ошибка',
              text: response.error,
              color: 'danger',
              position: 'top-center'
            })
          }
        });
      },
      uploadOne(){
        this.manyFilesLoad = false;
        this.typeLoad = 'pdf';
        this.$refs.fileAnswerFnsInputOne.click()
      },
      uploadMany(){
        this.manyFilesLoad = true;
        this.typeLoad = 'pdf';
        this.$refs.fileAnswerFnsInputMany.click()
      },
      uploadExcelList(){
        this.manyFilesLoad = false;
        this.typeLoad = 'xls_list';
        this.$refs.fileAnswerFnsInputOneExcelList.click()
      },
      getFileUrlFns(id_dc){
        this.getFnsFileForCheck(id_dc).then((response) => {
          const url = window.URL.createObjectURL(new Blob([(response)], {type: 'application/pdf'}));
          window.open(url);
        }).catch(error => {
          this.$vs.notify({
            title: 'Ошибка',
            text: error.message,
            color: 'danger',
            position: 'top-center'
          })
        });
      },
      showInfoFind(data){
        this.debtorData = data;
        this.popupActiveAnswer = true;
        this.itemTemp = {};
        this.isSetOnFioFlag = false;
        this.setVarToCreditFlag = false;
      },
      showInfoDone(data){
        this.debtorData = data;
        this.popupActiveAnswerDone = true;
      },
      setOtherStatusNull(data){
        this.debtorData = data;
        this.setOtherStatus(0);
      },
      onrowDoubleClicked(event) {
        this.$router.push('/fns/answer_debtor/' + event.data.id_debtorcredit);
      },
      fnsReset(){
        this.$vs.dialog({
          type: 'confirm',
          color: 'red',
          title: 'Удаление ответов',
          text: 'Вы действительно хотите удалить ответ?',
          accept: ()=>{
            this.resetFnsFile(this.$route.params.id).then((response) => {
              if (response.result){
                this.refreshTableAnswerFiles();
              }
            });
          },
          acceptText: 'Удалить',
          cancelText: 'Отмена'
        })
      },
      refreshTableAnswerFiles() {
        this.gridApi = this.gridOptions.api;
        this.getFnsCredits(this.$route.params.id);
        this.getFnsNotAnswerData(this.$route.params.id);
      },
      onRefreshAfterSet(){
        this.getFnsCredits(this.$route.params.id);
        this.getFnsNotAnswerData(this.$route.params.id);
      },
      hideFnsFiles(data) {
        if (data == 'status_ok') {
          this.FnsAnswerFile.pag.fns_answer_files_status.status_ok = !this.FnsAnswerFile.pag.fns_answer_files_status.status_ok
        }
        if (data == 'status_no') {
          this.FnsAnswerFile.pag.fns_answer_files_status.status_no = !this.FnsAnswerFile.pag.fns_answer_files_status.status_no
        }
        if (data == 'status_done') {
          this.FnsAnswerFile.pag.fns_answer_files_status.status_done = !this.FnsAnswerFile.pag.fns_answer_files_status.status_done
        }
        if (data == 'status_check_file') {
          this.FnsAnswerFile.pag.fns_answer_files_status.status_check_file = !this.FnsAnswerFile.pag.fns_answer_files_status.status_check_file
        }
        this.getFnsCredits(this.$route.params.id);
      },
      changePag(pag) {
        this.FnsAnswerFile.pag.fns_answer_files = pag
        this.gridApi.paginationSetPageSize(pag)
      },
      highlight(text, text2) {
        text2 = this.ucFirst(text2)
        text = this.ucFirst(text)
        if (text) {
          text = text.replace(new RegExp(text2, 'gi'), '<span class="highlighted">$&</span>');
        }
        return text
      },
      ucFirst(str) {
        if (!str) return str;
        str = str.toLowerCase()
        return str[0].toUpperCase() + str.slice(1);
      },
      showQuest(item){
        this.itemTemp = item;
        this.isSetOnFioFlag = false;
        this.setVarToCreditFlag = true;
      },
      showQuestOnFio(item){
        this.itemTemp = item;
        this.isSetOnFioFlag = true;
        this.setVarToCreditFlag = true;
      },
      setYes(){
        this.setAnswerFnsToCredit({
          id_fns_record: this.itemTemp.id,
          id_dc_record: this.debtorData.id,
          is_set_on_fio: this.isSetOnFioFlag
        }).then((response) => {
          if (response.result){
            this.popupActiveAnswer = false;
            this.refreshTableAnswerFiles();
          } else {
            this.$vs.notify({
              title: 'Ошибка',
              text: 'Ошибка привязки',
              color: 'danger',
              position: 'top-center'
            })
          }
        })
      },
      setNo(){
        this.setVarToCreditFlag = false;
      },
      setOtherStatus(id_status){
        this.setOtherStatusFns({id_credit: this.debtorData.id_debtorcredit, id_dc: this.debtorData.id, status: id_status}).then((response) => {
          if (response.result){
            this.popupActiveAnswerDone = false;
            this.refreshTableAnswerFiles();
          }
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
      updateSearchQuery(val) {
        this.gridApi.setQuickFilter(val)
      },
      onRowDataChanged() {
        Vue.nextTick(() => {
              this.gridOptions.api.sizeColumnsToFit();
            }
        );
      },
      loadFnsAnswer(id_dcr, id_cr){
        this.id_dcr = id_dcr
        this.id_cr = id_cr
        this.$refs.fileUploadFnsFiles.click()
      },
      changeDebtorDataFnsAnswer(id_dc){
        this.getDebtorChangeDataFnsAnswer(id_dc).then((response) => {
          if (response.result) {
            this.changeDebtorData = response.data;
            this.showChangeDebtorData = true;
          }
        });
      },
      saveDocumentFns(evt){
        this.saveDebtorCreditDocument({
          file: evt.target.files[0],
          name: evt.target.files[0].name,
          id: this.id_cr,
          type:42,
        }).then((response) => {
          if (response.result) {
            this.$refs['fileUploadFnsFiles'].value = null
            this.addFileFnsReg(this.id_dcr).then((response) => {
              this.id_dcr = 0
              this.id_cr = 0
              this.refreshTableAnswerFiles();
              this.$vs.notify({
                title: 'Успешно',
                text: 'Сохранено!!!',
                color: 'success',
                position: 'top-center'
              })
            })
          } else {
            this.$vs.notify({
              title: 'Ошибка',
              text: response.message,
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
        showAnswerDataInfo(dc_id) {
            this.getFnsAnswerData({fnsDataId: dc_id, what_from: this.what_from}).then((response) => {
                if (response.result) {
                    this.fnsData = response.fns_answer;
                    this.p_debtor_fio = this.fnsData[0].debtor_fio;
                    this.popupActiveAnswerFile = true;
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
        ...mapActions([
          'getFnsCredits', 'getFnsAnswerData', 'getFnsNotAnswerData', 'getDataDebtorsById','saveDebtorCreditDocument',
          'addFileFnsReg','getLoadFiles','resetFnsFile','setAnswerFnsToCredit','setOtherStatusFns','getFnsFileForCheck',
            'saveFnsAnswerFileForImportServOnDisk','startingParseFilesAnswersFns','getDebtorChangeDataFnsAnswer','changeDebtorDataOnFnsAnswer',
            'getFnsStatuses'
        ]),
    },
    mounted() {
      this.gridApi = this.gridOptions.api;
      this.getFnsCredits(this.$route.params.id);
      this.getFnsNotAnswerData(this.$route.params.id);
      this.getFnsStatuses();
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
.vs-popup {
    min-width: 800px;
}
.err_mess {
    color: red;
}

.succs_mess {
    color: green;
}

.row-no-file {
  background-color: #FFC0CB;
}

hr {
    transform: scaleY(0.5);
}
</style>
