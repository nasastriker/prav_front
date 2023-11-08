<template>
<span>
      <feather-icon icon="PaperclipIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer"
                    @click="goImport"/>
    <input type="file" ref="fileAnswerFnsInputOne" class="hidden" accept=".pdf" @change="changeFileTxt($event)">
    <input type="file" multiple ref="fileAnswerFnsInputMany" class="hidden" accept=".pdf"
           @change="changeFileTxt($event)">
    <input type="file" ref="fileAnswerFnsInputOneExcelList" class="hidden" accept=".xlsx"
           @change="changeFileTxt($event)">
    <vs-popup classContent="popup-example" title="Тип загрузки" :active.sync="showTypesUpload">
      <h5 style="color: red;margin-bottom: 20px">!!! Ответы по форме КНД 1120498(9) загружаются по схеме "1 заемщик = 1 файл" !!!</h5>
      <div style="display: flex">
        <vs-button color="danger" type="filled" @click="uploadOne">Заемщики в ОДНОМ файле</vs-button>
        <vs-button color="success" type="filled" style="margin-left: 20px" @click="uploadMany">Заемщики в РАЗНЫХ файлах</vs-button>
        <vs-button color="warning" type="filled" style="margin-left: 20px" @click="uploadExcelList">Заемщики списком в Excel</vs-button>
      </div>
    </vs-popup>
</span>

</template>

<script>
import {mapActions} from 'vuex';

export default {
  components: {},
  props: {
    dataid: null,
  },
  data() {
    return {
      showTypesUpload: false,
      manyFilesLoad: false,
      typeLoad: 'pdf'
    }
  },
  methods: {
    uploadOne() {
      this.manyFilesLoad = false;
      this.typeLoad = 'pdf';
      this.$refs.fileAnswerFnsInputOne.click()
    },
    uploadMany() {
      this.manyFilesLoad = true;
      this.typeLoad = 'pdf';
      this.$refs.fileAnswerFnsInputMany.click()
    },
    uploadExcelList() {
      this.manyFilesLoad = false;
      this.typeLoad = 'xls_list';
      this.$refs.fileAnswerFnsInputOneExcelList.click()
    },

    ...mapActions([
      'saveFnsAnswerFileForImportServOnDisk', 'startingParseFilesAnswersFns'
    ]),
    onRefreshAfterImport() {
      this.$emit('refreshAfterImport');
    },
    goImport() {
      this.showTypesUpload = true;
    },
    changeFileTxt(evt) {
      this.showTypesUpload = false;
      this.saveFnsAnswerFileForImportServOnDisk({
        files: evt.target.files,
        id_file_request: this.dataid
      }).then((response) => {
        if (response.result) {
          this.$refs['fileAnswerFnsInputOne'].value = null
          this.$refs['fileAnswerFnsInputMany'].value = null
          this.$refs['fileAnswerFnsInputOneExcelList'].value = null
          this.startingParseFilesAnswersFns({
            response: response,
            id_file: this.dataid,
            many_files_load: this.manyFilesLoad,
            type_load: this.typeLoad
          }).then((response_start) => {
            if (response_start.result) {
              this.onRefreshAfterImport();
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
    }
  }
}
</script>
<style lang="scss">

.vs-popup--content {
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
