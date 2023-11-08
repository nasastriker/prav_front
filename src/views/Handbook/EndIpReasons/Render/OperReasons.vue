<template>
    <div>
      <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="questDeleteStart" title="Удалить"/>
    </div>
</template>

<script>
    export default {
        methods: {
          questDeleteStart(){
            this.params.questionDelete(this.params.data)
          },
        }
    }
</script>
