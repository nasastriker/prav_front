<template>
  <ul class="vx-timeline">
      <li v-for="item in dat" :key="item.id">
          <div class="timeline-icon" :class="`bg-${item.color}`">
              <feather-icon :icon="item.icon" svgClasses="text-white stroke-current w-5 h-5" />
          </div>
          <div class="timeline-info" style="margin-left: 10px;">
                <div>
                  <p class="font-semibold">{{ item.title }}</p>
                  <span class="activity-desc">{{ item.desc }}</span>
                </div>


              <small class="text-grey activity-e-time">{{ item.time }}</small>
              <small class="text-grey activity-e-time" style="cursor: pointer;color: red!important;"  @click="del(item.id)">Удалить</small>
          </div>

      </li>
  </ul>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
export default {
  name: 'vx-timeline',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
    methods: {
        del(id){
            this.data.splice(id, 1);

        },
    },
    computed: {
        ...mapGetters([
            'StatussArr'

        ]),

        dat(){

            let arr=[]
            for(let i=0;i<this.data.length;i++){
                if(this.data[i].action==1){
                    let stat
                    for(let a=0;a<this.StatussArr.length;a++){
                        if(this.StatussArr[a].id==this.data[i].status){
                            stat=this.StatussArr[a].name
                        }
                    }
                    this.data[i].id=i
                    this.data[i].color= 'success',
                        this.data[i].icon= 'ChevronsRightIcon',
                        this.data[i].title= 'Изменение статус',
                        this.data[i].desc= 'Изменение статус '+ stat,
                        this.data[i].time='Через '+this.data[i].count+' дней '
                        if('dateSend' in this.data[i])this.data[i].time += this.data[i].dateSend
                }
                if(this.data[i].action==0) {
                    if (this.data[i].type == 0) {
                        this.data[i].id = i
                        this.data[i].color = 'warning',
                            this.data[i].icon = 'MailIcon',
                            this.data[i].title = 'Отправка сообщения',
                            this.data[i].desc = 'Отправка Email сообщения ' + this.data[i].shablon,
                            this.data[i].time = 'Через ' + this.data[i].count + ' дней '
                        if('dateSend' in this.data[i])this.data[i].time += this.data[i].dateSend
                    }
                    if (this.data[i].type == 1) {
                        this.data[i].id = i
                        this.data[i].color = 'primary',
                            this.data[i].icon = 'SendIcon',
                            this.data[i].title = 'Отправка сообщения',
                            this.data[i].desc = 'Отправка СМС сообщения ' + this.data[i].shablon,
                            this.data[i].time = 'Через ' + this.data[i].count + ' дней '
                        if('dateSend' in this.data[i])this.data[i].time += this.data[i].dateSend
                    }
                    if (this.data[i].type == 2) {
                        this.data[i].id = i
                        this.data[i].color = 'success',
                            this.data[i].icon = 'Volume2Icon',
                            this.data[i].title = 'Отправка сообщения',
                            this.data[i].desc = 'Отправка Голосового сообщения ' + this.data[i].shablon,
                            this.data[i].time = 'Через ' + this.data[i].count + ' дней '
                        if('dateSend' in this.data[i])this.data[i].time += this.data[i].dateSend
                    }
                    if (this.data[i].type == 3) {
                      this.data[i].id = i
                      this.data[i].color = 'success',
                          this.data[i].icon = 'MailIcon',
                          this.data[i].title = 'Отправка сообщения',
                          this.data[i].desc = 'Отправка Почтового сообщения ' + this.data[i].shablon,
                          this.data[i].time = 'Через ' + this.data[i].count + ' дней '
                      if('dateSend' in this.data[i])this.data[i].time += this.data[i].dateSend
                    }
                }
                arr.push(this.data[i])

            }

          //  console.log('dateSend' in this.data[i])
            return arr
        }

    },

}
</script>

<style lang="scss">
@import "@sass/vuexy/components/vxTimeline.scss";
</style>
