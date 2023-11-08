<template>
    <vx-card no-shadow style="min-height: 95vh;">

        <vs-tabs >



            <vs-tab label="Общие">

            <h6 class="h6" style="margin-top: 10px">Наименование:</h6>
            <vs-input class="w-full mb-base"  v-model="data.name"></vs-input>
            <h6 class="h6">Описание:</h6>
            <vs-textarea v-model="data.description" placeholder="введите текст " class="w-full mb-base" height="200px" ></vs-textarea>

            <vs-checkbox v-model="data.def">По умолчанию</vs-checkbox>


            <div >
                <div class="flex flex-wrap items-center justify-end">
                    <vs-button style="margin-right: 20px" color="primary"  class="pull-right" type="filled"  @click="close">Закрыть</vs-button>
                    <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>

                </div>

            </div>
            </vs-tab>
            <vs-tab label="Стратегия">
                <div class="flex flex-wrap items-center justify-end">
                    <vs-button class="ml-auto mt-2" @click="popupActive3=!popupActive3">Добавить функцию</vs-button>
                    <vs-button class="ml-auto mt-2" @click="add">Добавить статус</vs-button>
                    <vs-popup classContent="popup-example" title="Статус    " :active.sync="popupActive2">

                        <label class="text-sm">Статус:</label>
                        <v-select  class="w-50 " :reduce="label => label.id" label="name" v-model="status"  :options="StatussArr"  ></v-select>

                        <div style="margin-top: 15px; text-align: center">
                            <vs-button color="primary" type="border"  @click="addBlockStatus(status)">Добавить</vs-button>
                        </div>



                    </vs-popup>
                    <vs-popup classContent="popup-example" title="Статус    " :active.sync="popupActive3">

                        <label class="text-sm">Статус:</label>
                        <v-select  class="w-50 " :reduce="label => label.id" label="name" v-model="id_func"  :options="FuncsArr"  ></v-select>

                        <div style="margin-top: 15px; text-align: center">
                            <vs-button color="primary" type="border"  @click="addBlockFunc(id_func)">Добавить</vs-button>
                        </div>



                    </vs-popup>
                </div>
                <VueBlocksContainer
                        style="min-height: 75vh"
                        @contextmenu.native="showContextMenu"
                        @click.native="closeContextMenu"
                        ref="container"
                        :blocksContent="blocks"
                        :scene.sync="scene"
                @blockSelect="selectBlock"
                @blockDeselect="deselectBlock"
                class="container"/>
               <!-- <VueBlockProperty :property="selectedBlockProperty" @save="saveProperty"/> -->



            </vs-tab>
            <vs-tab label="Стратегия">



            </vs-tab>

        </vs-tabs>






    </vx-card>
</template>

<script>
    import VxTimeline from './Render/VxTimeline.vue'
    import VueBlocksContainer from './components/VueBlocksContainer.vue'
    import VueBlockProperty from './components/VueBlockProperty.vue'
    import { mapActions,mapGetters } from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    import Vue from 'vue'
    import vSelect from 'vue-select'
    import FlowChart from 'flowchart-vue';
    Vue.use(FlowChart);
    export default {
        components: {
            'v-select': vSelect,
            VxTimeline,VueBlocksContainer,VueBlockProperty,FlowChart
        },

        data () {
            return {
                nodes: [
                    // Basic fields
                    {id: 1, x: 140, y: 270, name: 'Start', type: 'start'},
                    // You can add any generic fields to node, for example: description
                    // It will be passed to @save, @editnode
                    //{id: 2, x: 540, y: 270, name: 'End', type: 'end', description: 'I'm here'},
                ],
                connections: [
                    {
                        source: {id: 1, position: 'right'},
                        destination: {id: 2, position: 'left'},
                        id: 1,
                        type: 'pass',
                    },
                ],
                id_func:0,
                popupActive3:false,
                blocks: [

                    {
                        name: 'Статус',
                        title: 'Статус',
                        family: 'Time',
                        id_status:0,
                        description: '',
                        fields: [

                            {
                                name: 'in',
                                type: 'event',
                                attr: 'input'
                            },

                            {
                                name: 'out',
                                type: 'event',
                                attr: 'output'
                            }
                        ]
                    },

                    {
                        name: 'Функция',
                        title: 'Функция',
                        family: 'Helpers',
                        description: 'Press shortcut for call event',
                        fields: [
                            {
                                name: 'in',
                                type: 'event',
                                attr: 'input'
                            },
                            {
                                name: 'Да',
                                type: 'event',
                                attr: 'output'
                            },
                            {
                                name: 'Нет',
                                type: 'event',
                                attr: 'output'
                            },


                        ]
                    }
                ],
                scene: {
                    blocks: [

                    ],
                    links: [

                    ],
                    container: {
                        centerX: 1042,
                        centerY: 140,
                        scale: 1
                    }
                },
                selectedBlock: null,
                selectedType: 'delay',
                useContextMenu: true,
                contextMenu: {
                    isShow: false,
                    mouseX: 0,
                    mouseY: 0,
                    top: 0,
                    left: 0
                },



                count:0,
                shablon:'',
                action:0,
                status:0,
                type:0,
                label:'',
                data:{
                    setting:{
                        blocks: [

                        ],
                        links: [

                        ],
                        container: {
                            centerX: 1042,
                            centerY: 140,
                            scale: 1
                        }
                    },
                },
                popupActive2:false,
            }
        },
        mounted(){
            this.getDataStatuss()
            this.getDataFuncs()
            if (this.$route.params.id) {
                if (this.$route.params.id != 'new') {

                    this.getData(this.$route.params.id);
                } else {
                    this.data.id='new'
                }
            }


        },

        computed: {
            selectedBlockProperty () {
                if (!this.selectedBlock || !this.selectedBlock.values || !this.selectedBlock.values.property) {
                    return null
                }

                return this.selectedBlock.values.property
            },
            selectBlocksType () {
                return this.blocks.map(b => {
                    return b.family
                }).filter((value, index, array) => {
                    return array.indexOf(value) === index
                })
            },
            FuncArrFilt(){
                let $arr=[]
                for (let i=0;i<this.FuncsArr.length;i++){
                    if(this.FuncsArr.id_status==this.status){
                        $arr.push(this.FuncsArr[i])
                    }

                }

                return $arr;
            },
            ...mapGetters([
                'StatussArr','TotalStatuss','FuncsArr','TotalFuncs',

            ]),

        },
        watch: {
            blocks (newValue) {
               // console.log('blocks', JSON.stringify(newValue))
            },
            scene (newValue) {
              //  console.log('scene', JSON.stringify(newValue))
            }
        },
        methods: {
            handleChartSave(nodes, connections) {
                // axios.post(url, {nodes, connections}).then(resp => {
                //   this.nodes = resp.data.nodes;
                //   this.connections = resp.data.connections;
                //   // Flowchart will refresh after this.nodes and this.connections changed
                // });
            },
            handleEditNode(node) {
                if (node.id === 2) {
                    console.log(node.description);
                }
            },
            handleEditConnection(connection) {
            },
            handleDblClick(position) {
                this.$refs.chart.add({
                    id: +new Date(),
                    x: position.x,
                    y: position.y,
                    name: 'New',
                    type: 'operation',
                    approvers: [],
                });
            },
            selectBlock (block) {
                console.log('select', block)
                this.selectedBlock = block
            },
            deselectBlock (block) {
                console.log('deselect', block)
                this.selectedBlock = null
            },
            filteredBlocks (type) {
                return this.blocks.filter(value => {
                    return value.family === type
                })
            },
            addBlock () {
                console.log(this.selectedType)
                this.$refs.container.addNewBlock(this.selectedType)
            },
            addBlockFunc(id_func){
                this.$refs.container.addNewBlockFunc('Функция',id_func)
                this.popupActive3=false;
            },
            addBlockStatus (status) {
                let block=this.scene.blocks
                let flag=false;
                for (let i=0;i<block.length;i++){
                    if(block[i].id_status==status){
                        flag=true;
                    }

                }
                this.popupActive2=false;
                if(flag){
                    this.$vs.dialog({
                        color: 'danger',
                        title: 'Статус',
                        text: `Такой статус уже есть на схеме, используйте его`,
                        acceptText: 'ОК',

                    })
                }else{
                    this.$refs.container.addNewBlockStatus('Статус',status)
                }

            },
            acceptAlert(){

            },
            saveProperty (val) {
                console.log(val)

                let scene = this.scene
                let block = scene.blocks.find(b => {
                    return b.id === this.selectedBlock.id
                })
                block.values.property = val

                this.scene = merge({}, scene)
            },
            showContextMenu (e) {
                if (!this.useContextMenu) return
                if (e.preventDefault) e.preventDefault()

                this.contextMenu.isShow = true
                this.contextMenu.mouseX = e.x
                this.contextMenu.mouseY = e.y

                this.$nextTick(function () {
                    this.setMenu(e.y, e.x)
                    this.$refs.contextMenu.focus()
                })
            },
            setMenu (top, left) {
                let border = 5
                let contextMenuEl = this.$refs.contextMenu
                let containerElRect = this.$refs.container.$el.getBoundingClientRect()
                let largestWidth = containerElRect.right - contextMenuEl.offsetWidth - border
                let largestHeight = containerElRect.bottom - contextMenuEl.offsetHeight - border

                console.log(this.$refs.container)
                console.log(containerElRect)

                if (left > largestWidth) left = largestWidth
                if (top > largestHeight) top = largestHeight

                this.contextMenu.top = top
                this.contextMenu.left = left
            },
            addBlockContextMenu (name) {
                let offset = domHelper.getOffsetRect(this.$refs.container.$el)
                let x = this.contextMenu.mouseX - offset.left
                let y = this.contextMenu.mouseY - offset.top

                this.$refs.container.addNewBlock(name, x, y)
                this.closeContextMenu()
            },
            closeContextMenu () {
                this.contextMenu.isShow = false
            },
            funcStatus(id_status){
                let arr=[]
                for(let a=0;a<this.FuncsArr.length;a++){
                    if(this.FuncsArr[a].id_status==id_status){
                        arr.push(this.FuncsArr[a])
                    }
                }
                return arr
            },
            addDey(){
                let  stat=''
                for(let a=0;a<this.StatussArr.length;a++){
                    if(this.StatussArr[a].id==this.status){
                        stat=this.StatussArr[a].name
                    }
                }

                let ob={
                    icon:'ChevronsRightIcon',
                    color:'success',
                    stat:stat,
                    status:this.status,
                    func:this.funcStatus(this.status)
                }

                this.status=0
                if(this.data.setting==null){
                    this.data.setting=[]
                }
                this.data.setting.unshift(ob);
                this.data.setting.sort((prev, next) => prev.count - next.count);
                this.popupActive2=false;


                //   console.log(this.shablon);
            },
            ...mapActions([
                'getDataStatuss','getDataTemplSoftsEmail','getTemplSoftsSms','getDataTemplSoftsVoice',
                'getTemplSoftsEmail','getTemplSoftsVoice','getTemplSoftsSms','getDataStatuss','getDataFuncs'
            ]),
            add(){
                this.popupActive2=true;
            },
            close(){

                this.$router.back()
            },
            getData(id){

                axios.get(r("strategy.index"), {
                    params: {
                        method: 'getStrategy',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.data=response.data.data
                        this.scene=response.data.data.setting
                    }



                })
            },
            save(){
                this.data.setting=this.scene
                axios.post(r("strategy.index"), {
                    params: {
                        method: 'saveStrategy',
                        param: this.data

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$router.push('/strategy/')
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено' , color: 'success', position: 'top-center' })
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось' , color: 'danger', position: 'top-center' })
                    }



                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                })



            },


        },
    }
</script>
<style  lang="scss">
    .vs-popup--content {
        min-height: 400px !important;
    }
    .h6{
        font-size: 12px;
        color: cadetblue;
    }
</style>
