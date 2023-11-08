<template>
  <div>
    <feather-icon icon="Trash2Icon" title="Удалить" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="questDeleteStart"/>
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
          questDeleteStart(){
            this.params.questDeleteRecord(this.params.data);
          },
          copyRecordStart(){
            this.params.copyRecord(this.params.data);
          },
        }
    }
</script>
