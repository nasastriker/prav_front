<template>
  <div class="excel-import" style="margin-left: 20px">
    <input type="file" ref="fileInput" class="hidden" accept=".xlsx, .xls" @change="handleClick">
      <div class="dropdown-button-container">
          <vs-button class="btnx" color="success" type="gradient" @click="open">Импорт</vs-button>
          <vs-dropdown>
              <vs-button class="btn-drop" color="success" type="gradient" icon="more_horiz"></vs-button>
              <vs-dropdown-menu>
                  <vs-dropdown-item>
                      <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="changeStatusMass">Изменить статус</vs-button>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                      <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="$router.push('/history_status')">История изменений</vs-button>
                  </vs-dropdown-item>

                  <vs-dropdown-item>
                      <a v-auth-href  href="/example_file/?filename=type_status" >Образец </a>
                  </vs-dropdown-item>


              </vs-dropdown-menu>
          </vs-dropdown>
      </div>
      <vs-popup style="min-height: 500px;" classContent="popup-example" title="Изменение статусов" :active.sync="popupActive3">
          <label class="text-sm">Старый статус</label>
          <v-select   class="w-50 " :reduce="label => label.id" label="name" :options="StatussArr"  v-model="statusOld"  ></v-select>
          <label class="text-sm">Новый статус</label>
          <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="StatussArr"  v-model="statusNew"  ></v-select>


          <div class="flex flex-wrap" style="margin-top: 20px">
              <vs-button class="w-1/3 ml-auto"  color="primary" type="filled"  @click="startChangeStatusMass">Изменить</vs-button>
          </div>


      </vs-popup>
      <vs-popup style="min-height: 500px;" classContent="popup-example" title="Выберите взыскателя или договор цессии" :active.sync="popupActive2">
          <label>Взыскатель или договор цессии:</label>
          <v-select  class="w-50 mb-base" :reduce="label => label.id" label="name" :options="optArr"  v-model="id_recover" style="margin-bottom: 40px" ></v-select>
          <div class="mt-8 mb-base">
              <label class="text-sm">Стадия рабочего процесса</label>
              <div class="vx-row" >

                  <div class="vx-col sm:w-1/2 w-full mb-2">
                      <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="StatussArr"  v-model="status"  ></v-select>
                  </div>
              </div>


          </div>

          <div class="mt-8 mb-base">
              <label class="text-sm">Файл</label>
              <div class="vx-row" >

                  <div class="vx-col sm:w-1/2 w-full mb-2">
                      <vs-radio v-model="type" vs-value="1" class="mr-3">По образцу</vs-radio>
                  </div>
                  <div class="vx-col sm:w-1/2 w-full mb-2">
                      <vs-radio v-model="type" vs-value="2" class="mr-3">По ID-кредита</vs-radio>
                  </div>
              </div>
              <div class="vx-row" >

                  <div class="vx-col sm:w-1/2 w-full mb-2">
                      <a v-auth-href  href="/example_file/?filename=type_status" >Образец </a>
                  </div>
                  <div class="vx-col sm:w-1/2 w-full mb-2">
                      <a v-auth-href  href="/example_file/?filename=type_status_id" >Образец </a>
                  </div>
              </div>

          </div>


          <div style="text-align: center">
              <vs-button class="w-1/3 ml-auto" @click="goImport" color="primary" type="filled">Выбрать</vs-button>
          </div>


      </vs-popup>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import { mapActions,mapGetters } from 'vuex'
import vSelect from 'vue-select'
import r from '../../route';
import axios from '../../axios'
import Vue from 'vue'
import VueAuthHref from 'vue-auth-href'
const options = {
    token: () => `${localStorage.getItem('accessToken')}`
}
export default {
    components: {
        'v-select': vSelect,
    },
  props: {
    onSuccess: {
      type: Function,
      required: true
    },
    url:'',
  },
  data () {
    return {
        type:1,
        statusOld:1,
        statusNew:1,
        id_recover:null,
        popupActive2: false,
        popupActive3:false,
        status:11,

        count:1,
      excelData: {
        header: null,
        results: null,
        meta: null
      }
    }
  },
    computed:{
        optArr(){
            let arr=[];
            var index;
            for (index = 0; index < this.RecoverersArr.length; ++index) {
                if(this.RecoverersArr[index].cession){
                    arr.push({
                        name:'Договор цессии №'+this.RecoverersArr[index].number+' от '+this.RecoverersArr[index].date+' Взыскатьель '+this.RecoverersArr[index].name,
                        id:this.RecoverersArr[index].id,
                    });
                }
                else{
                    arr.push({
                        name:'Взыскатель '+this.RecoverersArr[index].name,
                        id:this.RecoverersArr[index].id,
                    })

                }
            }

            return arr
        },
        ...mapGetters([
            'RecoverersArr','StatussArr'

        ]),
    },
    mounted(){
      this.getDataReestrsAndPrav();
      this.getDataStatuss();
    },
  methods: {
      ...mapActions([
          'getDataReestrsAndPrav','getDataStatuss'
      ]),
      startChangeStatusMass(){
          this.popupActive3=false;
          this.$vs.loading({color: '#ff8000'})
          axios.post(r("reestrImport.index"), {
              params: {
                  method: 'changeStatusMass',
                  param: {
                      statusOld:this.statusOld,
                      statusNew:this.statusNew,

                  }

              }
          }).then((response) => {
              this.$vs.loading.close()
              if (response.data.result){
                  this.$vs.notify({  title:'Сообщение', text: 'Выполнено успешно!!!', color: 'success', position: 'top-center' })

              }else {
                  this.$vs.notify({  title:'Сообщение', text: 'Ошибка !!!', color: 'danger', position: 'top-center' })
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
    open(){
        this.popupActive2=!this.popupActive2;
        //this.$refs.fileInput.click()
    },
      goImport(){
          this.popupActive2=false;


            this.$refs.fileInput.click()


      },
      changeStatusMass(){
          this.popupActive3=true;
      },
    generateData ({ header, results, meta,name }) {
      this.excelData.header = header

      this.excelData.results = results
      this.excelData.meta = meta
        this.excelData.name = name
        this.excelData.id_recover = this.id_recover;
        this.excelData.id_status = this.status;
        this.excelData.type = this.type;
      if (this.onSuccess) this.onSuccess(this.excelData)
    },
    getHeaderRow (sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C = undefined
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = `UNKNOWN ${  C}` // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }

        return headers
    },
    handleDragover (e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleDrop (e) {
      e.stopPropagation()
      e.preventDefault()
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$vs.notify({
          title: 'Login Attempt',
          text: 'Only support uploading one file!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })
        return
      }
      const rawFile = files[0] // only use files[0]
      if (!this.isExcel(rawFile)) {
        this.$vs.notify({
          title: 'Login Attempt',
          text: 'Only supports upload .xlsx, .xls, .csv suffix files',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })
        return false
      }
      this.uploadFile(rawFile)
    },
    readerData (rawFile) {
      return new Promise((resolve) => {
        const reader = new FileReader()

        reader.onload = e => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'array' })
     //       console.log(data)
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const header = this.getHeaderRow(worksheet)

          const results = XLSX.utils.sheet_to_json(worksheet)
           const name=rawFile.name
          const meta = { sheetName: firstSheetName }
          this.generateData({ header, results, meta,name })
          resolve()
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    handleClick (e) {
      const files = e.target.files
      const rawFile = files[0]
      if (!rawFile) return
      this.uploadFile(rawFile)
    },
    isExcel (file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    },
    uploadFile (file) {
      this.$refs['fileInput'].value = null // fix can't select the same excel
      this.readerData(file)
    }

  }
}
</script>
<style lang="scss">
    .vs-popup--content{
        min-height: 500px!important;
    }
    .dropdown-button-container {
        display: flex;
        align-items: center;

    .btnx {
        border-radius: 5px 0px 0px 5px;
    }

    .btn-drop {
        border-radius: 0px 5px 5px 0px;
        border-left: 1px solid rgba(255, 255, 255, .2);
    }
    }
</style>