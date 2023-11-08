<template>
  <div class="vue-block" :class="{selected: selected}" :style="style">
    <header v-if="type=='status'"  :style="headerStyle" style="background-color: #c8f3cf!important;">
         {{title}}:

      <a class="delete" @click="deleteBlock">x</a>
      <span v-if="type=='status'">{{statusName}} </span>

    </header>
    <header v-if="type=='func'"  :style="headerStyle" style="background-color: #f3efc8!important;">
      {{title}}:

      <a class="delete" @click="deleteBlock">x</a>


    </header>
    <header v-if="type=='cond'" :style="headerStyle" style="background-color: #FFA07A!important;">
      {{title}}:
      <a style="margin-right: 10px"><feather-icon icon="Edit3Icon" title="Редактировать" svgClasses="h-3 w-3 hover:text-danger cursor-pointer" @click="editBlock"/></a>
<!--      <a class="delete" style="margin-right: 10px" @click="editBlock" title="Редактировать">e</a>-->
      <a class="delete" @click="deleteBlock" title="Удалить">x</a>
    </header>

    <div  style="  text-align: center;" v-if="type=='func'">
      <template v-if="first">
        <span style="color: red">
          {{funcName}}
        </span>
      </template>
      <template v-else>
        {{funcName}}
      </template>


    </div>

    <div v-if="type=='cond'">
      <span v-for="(con,index) in cond">
        <br>{{ index+1 }}. <b>{{ con.var }}</b> <span v-if="con.description != null">({{ con.description }})</span> {{ condOper(con.var_condition) }} <span style="color: blue"><b>{{ con.value }}</b></span>
      </span>
    </div>

    <div class="inputs">
      <div class="input" v-for="(slot, index) in inputs">
        <div class="circle inputSlot" :class="{active: slot.active}"
             @mouseup="slotMouseUp($event, index)"
             @mousedown="slotBreak($event, index)"></div>
        {{slot.label}}
      </div>
    </div>
    <div class="outputs">
      <div class="output" v-for="(slot, index) in outputs">
        <div class="circle" :class="{active: slot.active}"
             @mousedown="slotMouseDown($event, index)"></div>
        {{slot.label}}
      </div>
    </div>
  </div>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
  export default {
    name: 'VueBlock',
    props: {
      x: {
        type: Number,
        default: 0,
        validator: function (val) {
          return typeof val === 'number'
        }
      },
      y: {
        type: Number,
        default: 0,
        validator: function (val) {
          return typeof val === 'number'
        }
      },
      id:0,
      first:false,
      selected: Boolean,
      id_status:0,
      id_func:0,
      cond:[],
      type:'',
      title: {
        type: String,
        default: 'Title'
      },
      inputs: Array,
      outputs: Array,

      options: {
        type: Object
      }
    },

    created () {
      this.mouseX = 0
      this.mouseY = 0

      this.lastMouseX = 0
      this.lastMouseY = 0

      this.linking = false
      this.dragging = false
    },
    mounted () {
      document.documentElement.addEventListener('mousemove', this.handleMove, true)
      document.documentElement.addEventListener('mousedown', this.handleDown, true)
      document.documentElement.addEventListener('mouseup', this.handleUp, true)
    },
    beforeDestroy () {
      document.documentElement.removeEventListener('mousemove', this.handleMove, true)
      document.documentElement.removeEventListener('mousedown', this.handleDown, true)
      document.documentElement.removeEventListener('mouseup', this.handleUp, true)
    },
    data () {
      return {
        width: this.options.width,
        hasDragged: false
      }
    },
    methods: {
      handleMove (e) {
        this.mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft
        this.mouseY = e.pageY || e.clientY + document.documentElement.scrollTop

        if (this.dragging && !this.linking) {
          let diffX = this.mouseX - this.lastMouseX
          let diffY = this.mouseY - this.lastMouseY

          this.lastMouseX = this.mouseX
          this.lastMouseY = this.mouseY

          this.moveWithDiff(diffX, diffY)

          this.hasDragged = true
        }
      },
      handleDown (e) {
        this.mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft
        this.mouseY = e.pageY || e.clientY + document.documentElement.scrollTop

        this.lastMouseX = this.mouseX
        this.lastMouseY = this.mouseY

        const target = e.target || e.srcElement
        if (this.$el.contains(target) && e.which === 1) {
          this.dragging = true

          this.$emit('select')

          if (e.preventDefault) e.preventDefault()
        }
      },
      handleUp () {
        if (this.dragging) {
          this.dragging = false

          if (this.hasDragged) {
            this.save()
            this.hasDragged = false
          }
        }

        if (this.linking) {
          this.linking = false
        }
      },
      // Slots
      slotMouseDown (e, index) {
        this.linking = true

        this.$emit('linkingStart', index)
        if (e.preventDefault) e.preventDefault()
      },
      slotMouseUp (e, index) {

        this.$emit('linkingStop', index)
        if (e.preventDefault) e.preventDefault()
      },
      slotBreak (e, index) {
        this.linking = true

        this.$emit('linkingBreak', index)
        if (e.preventDefault) e.preventDefault()
      },
      save () {
        this.$emit('update')
      },
      deleteBlock () {
        this.$emit('delete')
      },
      editBlock () {
        this.$emit('edit')
      },
      moveWithDiff (diffX, diffY) {
        let left = this.x + diffX / this.options.scale
        let top = this.y + diffY / this.options.scale

        this.$emit('update:x', left)
        this.$emit('update:y', top)
      }
    },
    computed: {
      ...mapGetters([
          'StatussArr','FuncsArr',

      ]),
      funcName(){

          for(let a=0; a<this.FuncsArr.length; a++){
              if(this.FuncsArr[a].id==this.id_func){
                  return this.FuncsArr[a].name
              }

          }
          return 'Ошибка';

      },
      statusName(){

          for(let a=0; a<this.StatussArr.length; a++){
              if(this.StatussArr[a].id==this.id_status){
               return this.StatussArr[a].name
              }

          }
          return 'Ошибка';

      },
      style () {
        return {
          top: this.options.center.y + this.y * this.options.scale + 'px',
          left: this.options.center.x + this.x * this.options.scale + 'px',
          width: this.width + 'px',
          transform: 'scale(' + (this.options.scale + '') + ')',
          transformOrigin: 'top left'
        }
      },
      headerStyle () {
        return {
          height: this.options.titleHeight + 'px'
        }
      },
      condOper() {
        return (value) => {
          if (value==='равно') return '='
          if (value==='содержит') return 'содержит'
          if (value==='больше или равно') return '>='
          if (value==='меньше или равно') return '<='
          if (value==='больше') return '>'
          if (value==='меньше') return '<'
          if (value==='не равно') return '!='
        }
      },
    }
  }
</script>
<style lang="less" scoped>
  @blockBorder: 1px;
  @ioPaddingInner: 2px 0;
  @ioHeight: 16px;
  @ioFontSize: 14px;
  @circleBorder: 1px;
  @circleSize: 10px;
  @circleMargin: 2px; // left/right
                              @circleNewColor: #00FF00;
  @circleRemoveColor: #FF0000;
  @circleConnectedColor: #FFFF00;
  .vue-block {
    position: absolute;
    box-sizing: border-box;
    border: @blockBorder solid black;
    background: white;
    z-index: 1;
    opacity: 0.9;
    cursor: move;
  &.selected {
     border: @blockBorder solid red;
     z-index: 2;
   }
  > header {
      background: #bfbfbf;
      text-align: center;
  > .delete {
      color: red;
      cursor: pointer;
      float: right;
      position: absolute;
      right: 5px;
    }
  }
  .inputs, .outputs {
    padding: @ioPaddingInner;
    display: block;
    width: 50%;
  > * {
      width: 100%;
    }
  }
  .circle {
    box-sizing: border-box;
    margin-top: @ioHeight / 2 - @circleSize / 2;
    width: @circleSize;
    height: @circleSize;
    border: @circleBorder solid rgba(0, 0, 0, 0.5);
    border-radius: 100%;
    cursor: crosshair;
  &.active {
     background: @circleConnectedColor;
   }
  }
  .inputs {
    float: left;
    text-align: left;
    margin-left: -(@circleSize/2 + @blockBorder);
  }
  .input, .output {
    height: @ioHeight;
    overflow: hidden;
    font-size: @ioFontSize;
  &:last-child {
   }
  }
  .input {
    float: left;
  .circle {
    float: left;
    margin-right: @circleMargin;
  &:hover {
     background: @circleNewColor;
  &.active {
     background: @circleRemoveColor;
   }
  }
  }
  }
  .outputs {
    float: right;
    text-align: right;
    margin-right: -(@circleSize/2 + @blockBorder);
  }
  .output {
    float: right;
  .circle {
    float: right;
    margin-left: @circleMargin;
  &:hover {
     background: @circleNewColor;
   }
  }
  }
  }
</style>