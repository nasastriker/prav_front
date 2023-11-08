<template>
  <div>
    <feather-icon icon="Edit3Icon" title="Редактировать" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecordStart"/>
    <feather-icon icon="Trash2Icon" title="Удалить" svgClasses="h-5 w-5 mr-4 hover:text-danger cursor-pointer" @click="questDeleteStart"/>
    <feather-icon icon="CopyIcon" title="Скопировать" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copyRecordStart"/>
  </div>
</template>

<script>
    export default {
        data () {
            return {
            }
        },
        methods: {
          editRecordStart(){
            this.params.editRecord(this.params.data.id);
          },
          questDeleteStart(){
            this.params.questDeleteRecord(this.params.data);
          },
          copyRecordStart(){
            this.params.copyRecord(this.params.data);
          },
        }
    }
</script>
