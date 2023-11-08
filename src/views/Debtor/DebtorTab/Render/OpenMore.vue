<template>
    <div >
      <div v-if="params.value == 1">
        <span @click="showInfo" class="hover:text-primary cursor-pointer">Подробнее</span>
      </div>
      <div v-else>
        <span @click="showInfo" class="hover:text-primary cursor-pointer">Добавить</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'OpenMore',
        methods: {
          showInfo(){
            this.params.showInfo(this.params.data.dbtrProperty);
          }
        }
    }
</script>
