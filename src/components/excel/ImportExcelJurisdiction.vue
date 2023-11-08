<template>
  <div class="excel-import" style="margin-left: 20px">
    <input type="file" ref="fileInput" class="hidden" accept=".xlsx, .xls" @change="handleClick">
      <div class="dropdown-button-container">
          <vs-button class="btnx" color="success" type="gradient" @click="open" >Импорт</vs-button>
          <vs-dropdown>
              <vs-button class="btn-drop" color="success" type="gradient" icon="more_horiz"></vs-button>
              <vs-dropdown-menu>

                  <vs-dropdown-item> <a :href="url">Образец</a>  </vs-dropdown-item>

              </vs-dropdown-menu>
          </vs-dropdown>
      </div>
      <vs-popup style="min-height: 200px;" classContent="popup-example" title="Укажите номер судебного участка" :active.sync="popupActive2">
          <label>Номер судебного участка:</label>
          <vs-input class="w-full mb-base"  v-model="jud_number"></vs-input>
          <div class="flex flex-wrap">
              <vs-button class="w-1/3 ml-auto" @click="goImport" color="primary" type="filled">Загрузить</vs-button>
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
        id_recover:0,
        popupActive2: false,
        jud_number:'',
        count:1,
      excelData: {
        header: null,
        results: null,
        meta: null
      }
    }
  },
    computed:{


    },
    mounted(){

    },
  methods: {


    open(){
        this.popupActive2=!this.popupActive2;
        //this.$refs.fileInput.click()
    },
      goImport(){
          this.popupActive2=false;
        if(this.jud_number==''){
            this.$vs.notify({
                color: 'danger',
                title: 'Сообщение',
                text: 'Не указан номер судебного участка!!!',
                position: 'top-center'
            })
        }
        else{

            this.$refs.fileInput.click()
        }

      },
    generateData ({ header, results, meta,jud_number }) {
      this.excelData.header = header
      this.excelData.results = results
      this.excelData.meta = meta
        this.excelData.jud_number = jud_number
        //console.log( this.excelData)

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
            const jud_number = this.jud_number;
       //   console.log(this.jud_number)
           const name=rawFile.name
          const meta = { sheetName: firstSheetName }
          this.generateData({ header, results, meta,jud_number })
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
