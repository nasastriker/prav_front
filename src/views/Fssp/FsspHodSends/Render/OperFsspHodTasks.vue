<template>
    <div>
      <div v-if="params.data.show_opers">
        <feather-icon icon="XIcon" title="Отменить" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="cancelOneTaskStart"/>
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
          cancelOneTaskStart(){
            this.params.cancelOneTask(this.params.data.id);
          },
        }
    }
</script>
