<template>
  <div class="excel-import" style="margin-left: 20px">
    <input type="file" ref="fileInput" class="hidden" accept=".xlsx, .xls" @change="handleClick">
      <div class="dropdown-button-container">
          <vs-button class="btnx" color="success" type="gradient" @click="open">Импорт</vs-button>
          <vs-dropdown>
              <vs-button class="btn-drop" color="success" type="gradient" icon="more_horiz"></vs-button>
              <vs-dropdown-menu>
                  <vs-dropdown-item>
                      <a v-auth-href  href="/example_file/?filename=type_update" >Образец </a>
                  </vs-dropdown-item>
              </vs-dropdown-menu>
          </vs-dropdown>
      </div>


  </div>
</template>

<script>
import XLSX from 'xlsx'
import { mapActions,mapGetters } from 'vuex'
const options = {
    token: () => `${localStorage.getItem('accessToken')}`
}
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

    open(){
        this.$refs.fileInput.click()
    },


    generateData ({ header, results, meta,name }) {
      this.excelData.header = header

      this.excelData.results = results
      this.excelData.meta = meta
        this.excelData.name = name

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