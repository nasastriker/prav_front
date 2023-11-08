<template>
  <a style="cursor: pointer" @click="openDyn">{{ params.value }}</a>
</template>

<script>
export default {
  name: 'OpenLink',
  methods: {
    openDyn() {
      this.params.openDynMoneyId(this.params.data.saMonth);
    }
  }
}
</script>
