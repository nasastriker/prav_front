<template>
<span>
      <feather-icon icon="ArrowUpCircleIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="goImport" />
    <input type="file" ref="fileInput" class="hidden" accept=".xlsx, .xls" @change="handleClick">
            <vs-popup classContent="popup-example" :title="return_string" :active.sync="showSovcom">


            <vs-row vs-type="flex" vs-justify="center">

                <vs-button color="primary" type="filled"  @click="saveReturn">Нет ответа</vs-button>

                <vs-button color="success" type="filled" style="margin-left: 50px " @click="load()">Загрузить</vs-button>

            </vs-row>



        </vs-popup>
</span>

</template>

<script>
import XLSX from 'xlsx'
import r from '../../../route';
import axios from '../../../axios';
import { mapActions } from 'vuex'
export default {
    components: {
    },
  props: {
      dataid:{

      },
    onSuccess: {
      type: Function,
      required: true
    },
    url:'',
  },
  data () {
    return {
        notSocvom:false,
        showSovcom:false,
        id_recover:0,
        popupActive2: false,
        status:2,
        return_string:'',

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
      saveReturn(){
          this.showSovcom=false
          this.$vs.loading({color: '#ff8000'})

          axios.post(r("archBank.index"), {
              params: {
                  method: 'exportDataNoAnswer',
                  param: this.dataid

              }
          }).then((response) => {
              this.$vs.loading.close()
              if (response.data.result){
                  this.getDataArchBanks()
                  this.$vs.notify({  title:'Сообщение', text: 'Импорт выполнен успешно!!!', color: 'success', position: 'top-center' })
                  //  this.debtor=response.data.data
              }else {
                  this.$vs.notify({  title:'Сообщение', text: 'Импорт не выполнен !!!', color: 'danger', position: 'top-center' })

              }

            this.showSovcom=false


          }).catch(error => {
              this.showSovcom=false
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
        'getDataArchBanks'
      ]),

    load(){


            this.showSovcom=false;
            this.$refs.fileInput.click()




    },
    goImport(){

        if(this.dataid.bank=='sovcom'){
            this.return_string = 'Возрат из Совкомбанка';
                this.showSovcom=true;
        }
        else{
            if(this.dataid.bank=='yoomoney'){
                this.return_string = 'Возрат из ЮМани';
                this.showSovcom=true;
            } else {
                this.$refs.fileInput.click()
            }
        }



      },
    generateData ({ header, results, meta,name }) {
      this.excelData.header = header

      this.excelData.results = results
      this.excelData.meta = meta
        this.excelData.name = name
        this.excelData.id_recover = this.id_recover;
        this.excelData.status = this.status;

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
        min-height: 100px !important;
        margin-top: 20px;
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
