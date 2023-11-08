<template>
  <vs-checkbox v-model="active"></vs-checkbox>
</template>

<script>
    export default {
      name: 'ActiveAutoTaskSet',
      computed: {
        active: {
          get() { return this.params.data.active; },
          set(value) { this.changeActive(value); },
        },
      },
      methods: {
        changeActive(value){
          this.params.setActive(this.params.data.id, value);
        },
      },
    }
</script>
