<template>
  <div >
    <span v-if="params.value=='Ответ получен' && accessType" style="color: blue" class="hover:text-primary cursor-pointer" @click="showAnswer">{{ params.value }}</span>
    <span v-else>{{ params.value }}</span>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'OpenAllJournalStatus',
  computed: {
    accessType() {
      for (var i = 0; i < this.FsspTypesForShowAnswer.length; i++) {
        if (this.FsspTypesForShowAnswer[i] === this.params.data.type_oper) {
          return true;
        }
      }
      return false;
    },
    ...mapGetters([
      'FsspTypesForShowAnswer'
    ]),
  },
  methods: {
    showAnswer(){
      this.params.showAnswer(this.params.data);
    },
  },

}
</script>
