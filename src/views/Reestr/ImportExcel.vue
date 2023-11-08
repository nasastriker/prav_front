<template>
  <div class="excel-import" style="margin-left: 20px">
    <input type="file" ref="fileInput" class="hidden" accept=".xlsx, .xls" @change="handleClick">
      <div class="dropdown-button-container">
          <vs-button class="btnx" color="success" type="gradient" @click="open">Импорт</vs-button>
          <vs-dropdown>
              <vs-button class="btn-drop" color="success" type="gradient" icon="more_horiz"></vs-button>
              <vs-dropdown-menu>
                  <a v-auth-href  href="/example_file/?filename=type_reestr" >Образец </a> <br>

              </vs-dropdown-menu>
          </vs-dropdown>
      </div>
      <vs-popup style="min-height: 500px;" classContent="popup-example" title="Выберите взыскателя или договор цессии" :active.sync="popupActive2">
          <label style="    color: darkred;">Взыскатель или договор цессии или Оганизация:</label>
          <v-select  class="w-50 mb-base" :reduce="label => label.id" label="name" :options="optArr"  v-model="id_recover" style="margin-bottom: 40px" ></v-select>
          <div class="mt-8 mb-base">
              <label  style="    color: darkred;">Стадия рабочего процесса:</label>
              <div class="mt-2" style="margin-bottom: 20px">
                  <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="StatussArrAndAll"  v-model="status"  ></v-select>

              </div>

              <label  style="    color: darkred;">Расчеты:
                  <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                       @click="help=!help"
                       style="max-width: 10px;cursor: pointer;"
                       viewBox="0 0 736.000000 1280.000000"
                       preserveAspectRatio="xMidYMid meet">
                      <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                         fill="#000000" stroke="none">
                          <path d="M4130 12789 c-752 -55 -1507 -308 -2148 -721 -712 -459 -1304 -1102
-1761 -1912 -171 -304 -215 -435 -215 -631 0 -106 3 -128 27 -189 65 -167 197
-272 392 -312 147 -31 356 -3 505 67 86 40 97 51 137 139 479 1050 1166 1787
1947 2089 607 234 1237 192 1702 -115 110 -72 283 -243 351 -344 209 -312 258
-676 145 -1065 -38 -128 -60 -184 -129 -319 -121 -236 -276 -440 -518 -681
-327 -326 -668 -571 -1275 -915 -291 -165 -481 -303 -674 -490 -191 -185 -312
-348 -421 -565 -141 -280 -207 -549 -224 -919 -31 -655 121 -1414 571 -2861
223 -719 255 -811 297 -874 181 -266 404 -452 563 -468 163 -17 279 97 328
323 34 159 30 215 -28 399 -188 591 -340 1220 -407 1682 -44 307 -50 398 -50
708 1 320 10 425 60 645 99 440 326 815 687 1137 164 146 273 226 598 441 463
306 691 470 981 704 944 761 1528 1542 1719 2298 124 492 81 941 -131 1369
-178 361 -490 683 -888 920 -396 236 -864 385 -1396 447 -161 18 -577 26 -745
13z"/>
                          <path d="M3747 859 c-105 -25 -237 -121 -290 -212 -98 -166 -65 -381 78 -516
232 -220 623 -150 758 136 29 63 32 76 32 168 -1 133 -24 192 -111 285 -67 71
-149 120 -234 139 -54 13 -180 12 -233 0z"/>
                      </g>
                  </svg>
              </label>

              <vs-popup style="min-height: 500px;" classContent="popup-example" title="Помощь" :active.sync="help">
                  {{helpCalc}}
              </vs-popup>
              <vs-popup style="min-height: 500px;" classContent="popup-example" title="Помощь" :active.sync="helpFuncShow">
                  {{helpFunc}}
              </vs-popup>
              <template v-for="item in peremen">
                  <template v-if="item.type==0">
                          <div style="margin-left: 10px;margin-right: 10px;color: red"  class="hover:text-primary cursor-pointer">
                              <div class="vx-row" >
                              <vs-checkbox v-model="item.data">{{item.name}}

                              </vs-checkbox>

                              </div>
                          </div>
                      <hr style="margin-bottom: 5px; margin-top: 5px; border: 0.5px solid #7367f0;">
                  </template>


              </template>
              <label  style="    color: darkred;">Функции:
                  <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                       @click="helpFuncShow=!helpFuncShow"
                       style="max-width: 10px;cursor: pointer;"
                       viewBox="0 0 736.000000 1280.000000"
                       preserveAspectRatio="xMidYMid meet">
                      <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                         fill="#000000" stroke="none">
                          <path d="M4130 12789 c-752 -55 -1507 -308 -2148 -721 -712 -459 -1304 -1102
-1761 -1912 -171 -304 -215 -435 -215 -631 0 -106 3 -128 27 -189 65 -167 197
-272 392 -312 147 -31 356 -3 505 67 86 40 97 51 137 139 479 1050 1166 1787
1947 2089 607 234 1237 192 1702 -115 110 -72 283 -243 351 -344 209 -312 258
-676 145 -1065 -38 -128 -60 -184 -129 -319 -121 -236 -276 -440 -518 -681
-327 -326 -668 -571 -1275 -915 -291 -165 -481 -303 -674 -490 -191 -185 -312
-348 -421 -565 -141 -280 -207 -549 -224 -919 -31 -655 121 -1414 571 -2861
223 -719 255 -811 297 -874 181 -266 404 -452 563 -468 163 -17 279 97 328
323 34 159 30 215 -28 399 -188 591 -340 1220 -407 1682 -44 307 -50 398 -50
708 1 320 10 425 60 645 99 440 326 815 687 1137 164 146 273 226 598 441 463
306 691 470 981 704 944 761 1528 1542 1719 2298 124 492 81 941 -131 1369
-178 361 -490 683 -888 920 -396 236 -864 385 -1396 447 -161 18 -577 26 -745
13z"/>
                          <path d="M3747 859 c-105 -25 -237 -121 -290 -212 -98 -166 -65 -381 78 -516
232 -220 623 -150 758 136 29 63 32 76 32 168 -1 133 -24 192 -111 285 -67 71
-149 120 -234 139 -54 13 -180 12 -233 0z"/>
                      </g>
                  </svg>
              </label>

              <template v-for="item in peremen">
                  <template v-if="item.type==1">
                          <div style="margin-left: 10px;margin-right: 10px;color: red"  class="hover:text-primary cursor-pointer">
                              <vs-checkbox v-model="item.data">{{item.name}}

                              </vs-checkbox>


                          </div>
                      <hr style="margin-bottom: 5px; margin-top: 5px; border: 0.5px solid #7367f0;">
                  </template>


              </template>

              <a v-auth-href  href="/example_file/?filename=type_reestr" >Образец </a> <br>

          </div>
          <div class="flex flex-wrap">
              <vs-button class="w-1/3 ml-auto" @click="goImport" color="primary" type="filled">Начать загрузку</vs-button>
          </div>


      </vs-popup>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import { mapActions,mapGetters } from 'vuex'
import r from '../../route';
import axios from '../../axios'
import Vue from 'vue'
import VueAuthHref from 'vue-auth-href'
const options = {
    token: () => `${localStorage.getItem('accessToken')}`
}

Vue.use(VueAuthHref, options)

export default {
    components: {
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
        peremen:[],
        help:false,
        helpFuncShow:false,
        helpFunc:'',
        helpCalc:'',
        calc:[],
        id_recover:0,
        popupActive2: false,
        status:2,
        activeCall:[],
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
                        name:'Договор цессии №'+this.RecoverersArr[index].number+' от '+this.RecoverersArr[index].date+' Взыскатель '+this.RecoverersArr[index].name,
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
            console.log(this.OrganizationArr);
          for (index = 0; index < this.OrganizationArr.length; ++index) {
            arr.push({
              name:'Организация '+this.OrganizationArr[index].name,
              id:-this.OrganizationArr[index].id,
            })
          }

            return arr
        },
        ...mapGetters([
            'RecoverersArr','StatussArrAndAll','OrganizationArr'

        ]),
    },
    mounted(){
        this.getReestrsPeremen();

        this.activeCall=[];
        this.getCalc();
      this.getDataReestrsAndCession();
        this.getDataStatuss();
    },
  methods: {
      changeCalc(item){
          let $arr=[]
          for (let i=0;i<this.activeCall.length;i++){
              if(this.activeCall[i].id!=item.id){
                  $arr.push(this.activeCall[i])
              }

          }
          $arr.push(item)
          this.activeCall= $arr;


      },
      getReestrsPeremen(){

          axios.get(r("reestr.index"), {
              params: {
                  method: 'getReestrsPeremen',

              }
          }).then((response) => {

              if (response.data.result) {
                  this.peremen = response.data.data;
                  this.helpFunc = response.data.helpFunc;
                  this.helpCalc = response.data.helpCalc;
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
      getCalc(){

          axios.get(r("debtorCredit.index"), {
              params: {
                  method: 'getCalculationAll',

              }
          }).then((response) => {

              if (response.data.result) {
                  this.calc = response.data.data;
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
      ...mapActions([
          'getDataReestrsAndCession','getDataStatuss',
      ]),

    open(){
        this.popupActive2=!this.popupActive2;
        //this.$refs.fileInput.click()
    },
      goImport(){
          this.popupActive2=false;
        if(this.id_recover==0){
            this.$vs.notify({
                color: 'danger',
                title: 'Сообщение',
                text: 'Не выбран взыскатель импорт не возможен!!!',
                position: 'top-center'
            })
        }
        else{

            this.$refs.fileInput.click()
        }

      },
    generateData ({ header, results, meta,name }) {
      this.excelData.header = header
    console.log(this.peremen);
      this.excelData.data = results
      this.excelData.meta = meta
        this.excelData.name = name
        this.excelData.id_recover = this.id_recover;
        this.excelData.status = this.status;
        this.excelData.activeCall = this.activeCall;
        this.excelData.peremen = this.peremen;
//        this.excelData.calculation = this.calculation;
//        this.excelData.calculation_stad = this.calculation_stad;
//        this.excelData.calc_org_30 = this.calc_org_30;
//        this.excelData.calc_organ = this.calc_organ;
//        this.excelData.calc_big_year = this.calc_big_year;


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
            const workbook = XLSX.read(data, { type: 'array',cellDates:true })
     //       console.log(data)
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const header = this.getHeaderRow(worksheet)

            const results = XLSX.utils.sheet_to_json(worksheet, {dateNF:'dd.mm.yyyy'})
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
    .h6 {
        font-size: 12px;
        color: cadetblue;
    }
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