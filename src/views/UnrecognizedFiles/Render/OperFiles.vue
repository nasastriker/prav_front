<template>
    <div v-if="params.data.status == 0">
      <feather-icon v-if="params.data.can_delete_file_name==1 || params.data.can_delete_file_name_orig==1 || params.data.to_delete_zip==1" icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="questDelete" title="Удалить файл"/>
      <feather-icon v-if="params.data.can_move==1" icon="ArrowRightCircleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="questToDebtor" title="Перенести файл в документы заемщика"/>
    </div>
</template>

<script>
    export default {
        methods: {
          questDelete(){
            this.params.questionDelete(this.params.data)
          },
          questToDebtor(){
            this.params.questionToDebtor(this.params.data)
          },
        }
    }
</script>
