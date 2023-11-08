<template>
    <span title="Скачать файл">
      <feather-icon v-if="params.data.filename" icon="PaperclipIcon" svgClasses="h-5 w-5 hover:text-primary cursor-pointer" @click="downloadDocument" />
    </span>
</template>

<script>
    import axios from "@/axios";
    import r from "@/route";
    export default {
        methods:{
          downloadDocument () {
            this.$vs.loading({color: '#ff8000'})
            axios.get(r('userTask.index'), {
              responseType: 'arraybuffer',
              params: {
                method: 'getUserTaskFile',
                param:this.params.value

              }
            }).then((response) => {
              try {
                const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/doc;charset=UTF-8;' }))
                let filename = response.headers['content-disposition'].replace('attachment; filename=', '')
                filename = filename.replace('_', '')
                filename = filename.split('; filename*=utf')[0]
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', this.params.data.filename)
                document.body.appendChild(link)
                link.click()
                this.$vs.loading.close()     // код...

              } catch (err) {
                this.$vs.notify({
                  title: 'Ошибка',
                  text: 'Нету файла',
                  color: 'danger',
                  position: 'top-center'
                })

              }
            }).catch(error => {
              this.$vs.loading.close()
              //   this.popupActive3=false;
              this.$vs.notify({
                title: 'Ошибка',
                text: error.message,
                color: 'danger',
                position: 'top-center'
              })

            })
          },
        }
    }
</script>

