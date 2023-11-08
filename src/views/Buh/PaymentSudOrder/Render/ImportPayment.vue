<template>
  <div class="excel-import" style="margin-left: 20px">
    <input type="file" ref="fileInput" class="hidden" accept=".xlsx, .xls" @change="handleClick">
      <div class="dropdown-button-container">
          <vs-button class="btnx" color="success" type="gradient" @click="open">Импорт</vs-button>
          <vs-dropdown>
              <vs-button class="btn-drop" color="success" type="gradient" icon="more_horiz"></vs-button>
              <vs-dropdown-menu>

                  <vs-dropdown-item> <a :href="url">Образец</a>  </vs-dropdown-item>

              </vs-dropdown-menu>
          </vs-dropdown>
      </div>
      <vs-popup style="min-height: 500px;" classContent="popup-example" title="Выберите взыскателя или договор цессии" :active.sync="popupActive2">
          <label>Взыскатель или договор цессии:</label>
          <v-select  class="w-50 mb-base" :reduce="label => label.id" label="name" :options="optArr"  v-model="id_recover" style="margin-bottom: 40px" ></v-select>
          <vs-checkbox style="margin-top: 20px"  v-model="imp1c" disabled >Импорт из 1С</vs-checkbox>

          <div class="flex flex-wrap">
              <vs-button class="w-1/3 ml-auto" @click="goImport" color="primary" type="filled">Выбрать</vs-button>
          </div>


      </vs-popup>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import { mapActions,mapGetters } from 'vuex'
import vSelect from 'vue-select'
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
        id_recover:null,
        popupActive2: false,
        status:2,
        imp1c:true,
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

            return arr
        },
        ...mapGetters([
            'RecoverersArr'

        ]),
    },
    mounted(){
      this.getDataReestrsAndPrav();
    },
  methods: {
      ...mapActions([
          'getDataReestrsAndPrav',
      ]),

    open(){
        this.popupActive2=!this.popupActive2;
        //this.$refs.fileInput.click()
    },
      goImport(){
          this.popupActive2=false;


            this.$refs.fileInput.click()


      },
    generateData ({ header, results, meta,name }) {
      this.excelData.header = header

      this.excelData.results = results
      this.excelData.meta = meta
        this.excelData.name = name
        this.excelData.id_recover = this.id_recover;
        this.excelData.imp1c=this.imp1c;
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
