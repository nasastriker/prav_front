<template>
  <div class="options-section">
    <span title="Удалить">
           <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
        </span>
  </div>
</template>

<script>
import r from '../../../route';
import axios from '../../../axios';
import { mapActions} from 'vuex'
export default {
  methods: {
    ...mapActions([
      'deleteUnrecognizedFilesRecord','getUnrecognizedFilesList'
    ]),
    confirmDeleteRecord () {
      // console.log(this.params.data.id)
      this.$vs.dialog({
        type: 'confirm',
        color: 'red',
        title: 'Удаление записи',
        text: 'Вы действительно хотите удалить запись? Все оставшиеся необработанные файлы будут удалены',
        accept: () => {
          this.deleteUnrecognizedFilesRecord(this.params.data.id).then((response) => {
            if (response.result) {
              this.getUnrecognizedFilesList();
              this.$vs.notify({ title: 'Сообщение', text: 'Запись удалена', color: 'success', position: 'top-center' })
              this.$router.push('/unrecognized_files');
            } else {
              this.$vs.notify({
                title: 'Ошибка',
                text: response.error,
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
        acceptText: 'Удалить',
        cancelText: 'Отмена'
      })
    },
  }
}
</script>
<style>
.options-section {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
