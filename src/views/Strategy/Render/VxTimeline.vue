
<template>
    <ul class="vx-timeline">
        <li v-for="item in data" :key="item.id">
            <div class="timeline-icon" :class="`bg-${item.color}`">
                <feather-icon :icon="item.icon" svgClasses="text-white stroke-current w-5 h-5" />
            </div>
            <div class="timeline-info">



                <span class="activity-desc">{{ item.stat }}
                    <small class="text-grey activity-e-time" style="cursor: pointer;color: red!important;"  @click="del(item.id)">Удалить</small>
              </span>


            </div>
            <template v-if="item.func">
                <li v-for="func in item.func">
                    <small class="text-grey activity-e-time">Функция {{ func.name }}</small>
                    <small class="text-grey activity-e-time" style="cursor: pointer;color: red!important;"  @click="delFunc(func)">Удалить</small>
                </li>
            </template>


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
            delFunc(func){
                console.log(func)
                this.data.func.splice(func.id, 1);
            },
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
                    let stat
                    for(let a=0;a<this.StatussArr.length;a++){
                        if(this.StatussArr[a].id==this.data[i].status){
                            stat=this.StatussArr[a].name
                        }
                    }
                    this.data[i].id=i
                    this.data[i].color= 'success',
                        this.data[i].icon= 'ChevronsRightIcon',
                        //   this.data[i].title= 'Изменение статус',
                        this.data[i].desc= 'Статус '+ stat,
                        this.data[i].time='Через '+this.data[i].count+' дней'
                    arr.push(this.data[i])

                }
                let a = [];
                for (let i = 0; i < arr.length; i++){
                    a[i] = arr[(arr.length - 1) - i]
                }
                return a

            }

        },

    }
</script>

<style lang="scss">
    .vx-timeline li .activity-desc {
        font-size: 1.1rem!important;
    }
    .vx-timeline li {
         margin-bottom: 0px!important;
    }
    @import "@sass/vuexy/components/vxTimeline.scss";
</style>
