<template>
  <div>
    {{ ifnsName }}
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            ifnsName(){
              let name=''
              for(let i=0;i<this.IfnssArr.length;i++) {
                if (this.IfnssArr[i].id == this.params.value) {
                  name = this.IfnssArr[i].code
                }
              }

              return name
            },
            ...mapGetters([
                'IfnssArr'
            ]),
        },
    }
</script>
