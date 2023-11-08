<template>
  <div>
    <span @click="showJsonStart" style="color:blue;" class="hover:text-primary cursor-pointer" title="Составное значение" v-if="params.data.is_json">
      Составное значение
    </span>
    <span v-else :title="params.value">
      <span v-if="params.data.is_route" style="color:blue;text-decoration: underline" class="hover:text-primary cursor-pointer" @click="routeToTaskStart">
        {{ params.value }}
      </span>
      <span v-else>
        <span v-if="params.data.is_long_text" style="color:blue;" class="hover:text-primary cursor-pointer" @click="showLongTextStart">
          {{ params.value }}
        </span>
        <span v-else>
          {{ params.value }}
        </span>
      </span>
    </span>
  </div>
</template>

<script>
    export default {
        data () {
            return {}
        },
        methods: {
          showJsonStart(){
            this.params.showJson(this.params.value);
          },
          routeToTaskStart(){
            this.params.routeToTask(this.params.data.new_val);
          },
          showLongTextStart(){
            this.params.showLongText(this.params.value);
          },
        }
    }
</script>

<style lang="scss" scpoped>
</style>
