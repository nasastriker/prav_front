<template>
    <div>
      <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="questDelete" title="Удалить"/>
    </div>
</template>

<script>
    export default {
        methods: {
          questDelete(){
            this.params.questionDeleteCheckStatusCond(this.params.data.id);
          },
        }
    }
</script>
