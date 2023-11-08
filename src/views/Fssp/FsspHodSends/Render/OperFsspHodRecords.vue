<template>
    <div style="display: flex">
      <feather-icon icon="ClockIcon" title="История" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="showHistoryStart"/>
      <div v-if="params.data.show_opers">
      <feather-icon icon="Edit3Icon" title="Редактировать" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecordStart"/>
      <feather-icon icon="PlayIcon" title="Запустить" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="startOneRecordStart"/>
      <feather-icon icon="UsersIcon" title="Кредиты, удовлетворяющие условиям на данный момент" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="showCreditsPlanStart"/>
      <feather-icon icon="Trash2Icon" title="Удалить" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="questDeleteStart"/>
      </div>
      <div v-else>
        <span style="color: red" title="Есть запущенные задачи">Есть запущенные задачи</span>
      </div>
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
          editRecordStart(){
            this.params.editRecord(this.params.data.id);
          },
          showCreditsPlanStart(){
            this.params.showCreditsPlan(this.params.data.id);
          },
          startOneRecordStart(){
            this.params.startOneRecord(this.params.data);
          },
          showHistoryStart(){
            this.params.showHistory(this.params.data.id);
          },
        }
    }
</script>
