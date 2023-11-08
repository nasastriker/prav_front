<template>
  <a style="cursor: pointer" @click="openDyn">{{ params.value }}</a>
</template>

<script>
export default {
  name: 'OpenLink',

  methods: {
    openDyn() {
      this.params.showCredits(this.params.data.count_arr);
    }
  }
}
</script>
