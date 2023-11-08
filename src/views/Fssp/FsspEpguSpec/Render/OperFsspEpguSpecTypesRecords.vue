<template>
    <div style="display: flex">
      <feather-icon icon="Trash2Icon" title="Удалить" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="questDeleteStart"/>
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
        }
    }
</script>
