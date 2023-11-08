<template>
    <div id="page-user-list">
        <div class="vx-card p-6 no-shadow">
          <div style="display: flex;margin-bottom: 30px">
            <h4>{{ statHod }}</h4>
            <vs-button style="margin-left: auto" color="success" type="filled" @click="saveRecord">Сохранить</vs-button>
            <vs-button style="margin-left: 10px" color="danger" type="filled" @click="cancelSaveRecord">Отмена</vs-button>
          </div>

          <h6 class="h6 mb-1">Наименование отправки:</h6>
          <vs-input v-if="editFlag" disabled type="text" class="w-auto" v-model="recordData.name"></vs-input>
          <vs-input v-else type="text" class="w-auto" v-model="recordData.name" @input="inputName"></vs-input>
          <h6 class="h6 mb-1" style="margin-top: 15px">Переменная:</h6>
          <vs-input disabled type="text" class="w-auto" v-model="recordData.perem"></vs-input>
          <h6 class="h6 mb-1" style="margin-top: 15px">Организация/Взыскатель/Цессия:</h6>
          <v-select class="w-full" :reduce="label => label" label="text" :options="FsspHodRecordDataRecovererList" v-model="recordData.rec_data" @input="setRecover"></v-select>
          <h6 class="h6 mb-1" style="margin-top: 15px">Статус, с которого отправлять:</h6>
          <v-select class="w-full" :reduce="label => label" label="text" :options="FsspHodRecordDataFsspStatuses" v-model="recordData.status_data" @input="setStatus"></v-select>
          <div style="color: red">{{ allFsspStatusesWarningText }}</div>

          <vs-checkbox v-model="recordData.get_answers" style="margin-top: 15px">
            Забирать ответы
          </vs-checkbox>

          <ConditionVars style="margin-top: 20px" :ref="'condition_vars'" @getCondData="getCondData"></ConditionVars>

<!--          <fieldset style="margin-top: 20px" class="f">-->
<!--            <legend class="l">Расписание</legend>-->
<!--            <h6 class="h6 mb-1">Первая дата запуска:</h6>-->
<!--            <vs-input type="date" class="w-100"  v-model="recordData.shed_first_date"></vs-input>-->
<!--            <h6 class="h6 mb-1" style="margin-top: 10px;">Периодичность:</h6>-->
<!--            <v-select class="w-50 " :reduce="label => label.id" label="label" :options="PeriodList" v-model="recordData.shed_period" @input="setPeriod"></v-select>-->
<!--            <template v-if="(recordData.shed_period==3)||(recordData.shed_period==5)">-->
<!--              <v-select class="w-50 " style="margin-top: 10px" :reduce="label => label.id" label="label" :options="WeekList" v-model="recordData.shed_week" @input="setWeek"></v-select>-->
<!--            </template>-->
<!--            <template v-if="recordData.shed_period==4">-->
<!--              <v-select class="w-50 " style="margin-top: 10px" :reduce="label => label.id" label="label" :options="MounthList" v-model="recordData.shed_mounth"></v-select>-->
<!--            </template>-->
<!--            <h6 class="h6 mb-1" style="margin-top: 10px;">Время:</h6>-->
<!--            <vs-input type="time" class="w-100" v-model="recordData.shed_time"></vs-input>-->
<!--          </fieldset>-->

          <div style="
            color: red;
            margin-top: 20px;
            border: 2px solid red;
            padding: 10px;
            text-align: center;
          ">При формировании данных ходатайств доверенность организации/взыскателя автоматически не прикладывается! Необходимо указывать ее в списке ниже.</div>
          <div class="vx-row" style="padding-top: 30px">
            <div class="vx-col sm:w-1/2 w-full mb-3">
              <h5>Все поля</h5>
              <div style="margin-bottom: 20px;margin-top: 20px;">
                <div style="display: flex">
                  <h6 class="h6 mb-1">Поиск параметра:</h6>
                  <div style="color: red;margin-left: auto" class="hover:text-primary cursor-pointer" @click="eraseFilterField">[ сброс фильтра ]</div>
                </div>
                <vs-input type="search" class="w-full mb-base" v-model="filterField" @input="filterFieldInput" placeholder="Поиск..." />
              </div>
              <li class="li-border"
                  v-for="(item, index) in filtredShabAllArr"
                  :key="index"
                  tag="li"
                  v-if="filtredShabAllArr.includes(item)">
                <template v-if="item.type==1">
                  <template v-if="item.rec==0">
                    <strong><span style="cursor: pointer"><span style="color: #b57f1b">Документ заемщика</span> <span style="color: red" v-if="item.shab==1">Шаблон </span>{{ item.name }} <span><addToShablonButtons :index="index" @add="addItemToShablon"></addToShablonButtons></span></span> </strong>
                  </template>
                  <template v-if="item.rec==1">
                    <strong><span style="cursor: pointer"><span style="color: #b57f1b">Документ цессии</span> <span style="color: red" v-if="item.shab==1">Шаблон </span>{{ item.name }} <span><addToShablonButtons :index="index" @add="addItemToShablon"></addToShablonButtons></span></span> </strong>
                  </template>
                  <template v-if="item.rec==2">
                    <strong><span style="cursor: pointer"><span style="color: #b57f1b">Документ организации</span> <span style="color: red" v-if="item.shab==1">Шаблон </span>{{ item.name }} <span><addToShablonButtons :index="index" @add="addItemToShablon"></addToShablonButtons></span></span> </strong>
                  </template>
                </template>
                <template v-else>
                  <template v-if="item.typeVar==1">
                    <strong><span style="cursor: pointer"><span style="color: #185d02">Текст</span> {{ item.name }}</span> <span><addToShablonButtons :index="index" @add="addItemToShablon"></addToShablonButtons></span></strong>
                  </template>
                  <template v-if="item.group===true">
                    <strong><span style="cursor: pointer;color:blue"> {{ item.name }}</span> <span><addToShablonButtons :index="index" @add="addItemToShablon"></addToShablonButtons></span></strong>
                  </template>
                  <template v-if="item.typeVar!=1&&item.group!==true">
                    <strong><span style="cursor: pointer"><span style="color: #185d02">Шаблон</span> {{ item.name }}</span> <span><addToShablonButtons :index="index" @add="addItemToShablon"></addToShablonButtons></span></strong>
                  </template>
                </template>
              </li>
            </div>
            <div class="vx-col sm:w-1/2 w-full mb-3">
              <h5 style="margin-bottom: 20px;">Поля формирования</h5>
              <h5 style="color: red">Обязательные документы</h5>
              <draggable
                  v-model="recordData.shab_list"
                  tag="ul"
                  class="list-group list-group-flush cursor-move">
                <li
                    class="li-border"
                    v-for="(item, index) in recordData.shab_list"
                    :key="index"
                    tag="li"
                    v-if="(item.ob==true||item.ob==null)&&checkCondition(item)===false"
                    @dblclick="delItem(index)">
                  <template v-if="item.type==1">
                    <template v-if="item.rec==0">
                      <strong><span style="cursor: pointer"><span style="color: #b57f1b">Документ заемщика</span><span style="color: red" v-if="item.shab==1">Шаблон</span> {{ item.name }}</span></strong>
                    </template>
                    <template v-if="item.rec==1">
                      <strong><span style="cursor: pointer"><span style="color: #b57f1b">Документ цессии</span> <span style="color: red" v-if="item.shab==1">Шаблон</span> {{ item.name }}</span></strong>
                    </template>
                    <template v-if="item.rec==2">
                      <strong><span style="cursor: pointer"><span style="color: #b57f1b">Документ организации</span><span style="color: red" v-if="item.shab==1">Шаблон</span>  {{ item.name }}</span></strong>
                    </template>
                  </template>
                  <template v-if="item.group===true">
                    <strong><GroupDocuments :items="item" :index="index"></GroupDocuments> </strong>
                  </template>
                  <template v-if="item.type!=1&&item.typeVar!=1&&item.group!==true">
                    <strong><span style="cursor: pointer"><span style="color: #185d02">Шаблон</span> {{ item.name }}</span> </strong>
                  </template>
                  <template v-if="item.typeVar===1">
                    <strong><span style="cursor: pointer"><span style="color: #185d02">Текст</span> {{ item.name }}</span> </strong>
                  </template>
                </li>
              </draggable>
              <h5 style="color: green;margin-top: 20px">Необязательные документы</h5>
              <draggable
                  v-model="recordData.shab_list"
                  tag="ul"
                  class="list-group list-group-flush cursor-move">
                <li
                    class="li-border"
                    v-for="(item, index) in recordData.shab_list"
                    v-if="item.ob==false&&checkCondition(item)===false"
                    :key="index"
                    tag="li"
                    @dblclick="delItem(index)">
                  <template v-if="item.type==1">
                    <template v-if="item.rec==0">
                      <strong><span style="cursor: pointer"><span style="color: #b57f1b">Документ заемщика</span><span style="color: red" v-if="item.shab==1">Шаблон</span>  {{ item.name }}</span></strong>
                    </template>
                    <template v-if="item.rec==1">
                      <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ цессии</span> <span style="color: red" v-if="item.shab==1">Шаблон</span> {{ item.name }}</span></strong>
                    </template>
                    <template v-if="item.rec==2">
                      <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ организации</span><span style="color: red" v-if="item.shab==1">Шаблон</span>  {{ item.name }}</span></strong>
                    </template>
                  </template>
                  <template v-if="item.group===true">
                    <strong><GroupDocuments :items="item" :index="index"></GroupDocuments> </strong>
                  </template>
                  <template v-if="item.type!=1&&item.typeVar!=1&&item.group!==true">
                    <strong><span style="cursor: pointer"  ><span style="color: #185d02">Шаблон</span> {{ item.name }}</span> </strong>
                  </template>
                  <template v-if="item.typeVar===1">
                    <strong><span style="cursor: pointer"  ><span style="color: #185d02">Текст</span> {{ item.name }}</span> </strong>
                  </template>
                </li>
              </draggable>
              <h5 style="color: orange;margin-top: 20px">Обязательные документы с условием</h5>
              <draggable
                  v-model="recordData.shab_list"
                  tag="ul"
                  class="list-group list-group-flush cursor-move">
                <li
                    class="li-border"
                    v-for="(item, index) in recordData.shab_list"
                    :key="index"
                    tag="li"
                    v-if="(item.ob==true||item.ob==null)&&checkCondition(item)===true"
                    @dblclick="delItem(index)">
                  <addCondition :item="item" :index="index" @updateItem="updateConditionItem"></addCondition>
                </li>
              </draggable>
              <h5  style="color: cornflowerblue;margin-top: 20px">Необязательные документы с условием</h5>
              <draggable
                  v-model="recordData.shab_list"
                  tag="ul"
                  class="list-group list-group-flush cursor-move">
                <li
                    class="li-border"
                    v-for="(item, index) in recordData.shab_list"
                    v-if="item.ob==false&&checkCondition(item)===true"
                    :key="index"
                    tag="li"
                    @dblclick="delItem(index)">
                  <addCondition :item="item" :index="index" @updateItem="updateConditionItem"></addCondition>
                </li>
              </draggable>
                <h6 class="h6 mb-1" style="margin-top: 20px;">Дополнительный текст:</h6>
                <vs-textarea height="400px" rows="17" v-model="recordData.dop_text"></vs-textarea>
                <h6 class="h6 mb-1" style="margin-top: 20px;">Текст для поля "Описание" на форме ГУ (не более 1000 символов):</h6>
              <div style="display:flex;">
                <span style="color: red">Если оставить пустым, то в это поле проставится текст: "Ходатайство во вложении"</span>
                <span style="margin-left: auto">Введено символов:
                  <b v-if="countSymbsOpisText < 1000">{{ countSymbsOpisText }}</b>
                  <b v-else style="color: red">{{ countSymbsOpisText }}</b>
                </span>
              </div>
                <vs-textarea height="400px" rows="17" maxlength="1000" v-model="recordData.opis_text"></vs-textarea>
              <vs-button color="warning" class="pull-right" type="border" style="margin-top: 15px" @click="clear">Очистить</vs-button>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import ConditionVars from "./Render/ConditionVars.vue";
    import draggable from 'vuedraggable';
    import addToShablonButtons from "../../Handbook/Shablon/Render/addToShablonButtons.vue";
    import GroupDocuments from "../../Handbook/Shablon/Render/GroupDocuments.vue";
    import addCondition from "../../Handbook/Shablon/Render/addCondition.vue";
    export default {
      components: {
        ConditionVars,
        draggable,
        addToShablonButtons,
        GroupDocuments,
        addCondition
      },
      data() {
        return {
          recordData:{
            perem:'',
            rec_data:{id:0,text:'Все'},
            status_data:{id:0,text:'Все статусы ФССП'},
            conds:[],
            shab_list:[],
            dop_text:null,
            opis_text:null,
            shed_period:1,
            shed_week:1,
            shed_mounth:1,
          },
          showAllFsspStatusesWarning:false,
          stad:null,
          editFlag:false,
          statHod:'Новое ходатайство',
          filtredShabAllArr:[],
          filterField:'',
          PeriodList:[{id: 1, label: 'Однократно'},{id: 2, label: 'Ежедневно'},{id: 6, label: 'Раз в два дня'},
            {id: 3, label: 'Еженедельно'},{id: 5, label: 'Раз в две недели'},{id: 4, label: 'Ежемесячно'}],
          WeekList:[{id: 1, label: 'Понедельник'},{id: 2, label: 'Вторник'},{id: 3, label: 'Среда'},{id: 4, label: 'Четверг'},
            {id: 5, label: 'Пятница'},{id: 6, label: 'Суббота'},{id: 7, label: 'Воскресенье'}],
          MounthList:[],
        }
      },

      computed: {
        allFsspStatusesWarningText(){
          if (this.recordData.status_data.id === 0){
            return 'Все статусы ФССП - это все статусы (кроме пользовательских), при которых ИД находится на исполнении в ФССП';
          } else {
            return '';
          }
        },
        countSymbsOpisText(){
          if (this.recordData.opis_text != null) {
            return this.recordData.opis_text.length;
          } else {
            return 0;
          }
        },
        ShabAllArrStadwithGroup(){
          let arr = [];
          if(this.stad==null){
            arr = _.clone(this.ShabAllArr)
          } else {
            arr = this.ShabAllArr.filter(el=>el.stad===this.stad)
          }
          arr.unshift({name:'Создать группу документов',group:true})
          return arr;
        },
        ...mapGetters([
            'FsspHodRecordDataRecovererList','FsspHodRecordDataFsspStatuses','ShabAllArr'
        ]),
      },
      methods: {
        updateConditionItem(item,index){},
        saveRecord(){
          let flag = true;

          if (typeof this.recordData.name == 'undefined' || this.recordData.name.trim() === ''){
            flag = false;
          }

          if (this.recordData.perem == null || this.recordData.perem.trim() === ''){
            flag = false;
          }

          // if (typeof this.recordData.shed_first_date == 'undefined' || this.recordData.shed_first_date == null){
          //   flag = false;
          // }
          //
          // if (typeof this.recordData.shed_time == 'undefined' || this.recordData.shed_time == null){
          //   flag = false;
          // }

          if (typeof this.recordData.shab_list == 'undefined' || this.recordData.shab_list.length === 0){
            if (this.recordData.dop_text == null || this.recordData.dop_text.trim() === '') {
              flag = false;
            }
          }

          if (flag){
            this.saveFsspHodRecord(this.recordData).then((response) => {
              if (response.result){
                this.$vs.notify({
                  title: 'Сообщение',
                  text: 'Запись сохранена',
                  color: 'success',
                  position: 'top-center'
                })
                this.$router.push('/fssp_hod_sends');
              } else {
                this.$vs.notify({
                  title: 'Ошибка',
                  text: response.error,
                  color: 'danger',
                  position: 'top-center'
                })
              }
            });
          } else {
            this.$vs.notify({
              title: 'Ошибка',
              text: 'Заполните необходимые поля',
              color: 'danger',
              position: 'top-center'
            })
          }
        },
        cancelSaveRecord(){
          this.$router.push('/fssp_hod_sends');
        },

        inputName(){
          this.getFsspHodRecordDataPerem(this.recordData.name).then((response) => {
            if (response.result){
              this.recordData.perem = response.data;
            }
          });
        },
        clear(){
          this.recordData.shab_list = [];
          this.recordData.dop_text = '';
          this.recordData.opis_text = '';
        },
        addItem(item){
          if(this.recordData.shab_list == null){
            this.recordData.shab_list = [];
          }
          this.recordData.shab_list.push(item);
        },
        addItemToShablon(index,type){
          if(this.recordData.shab_list == null){
            this.recordData.shab_list = [];
          }
          let shab;
          if(index===0&&this.filtredShabAllArr[index]===this.ShabAllArrStadwithGroup[index]){
            shab={group:true,documents:[]}
          } else shab = _.clone(this.filtredShabAllArr[index])
          shab.ob=type===1||type===3
          if(type===3||type===4){
            shab.condition=[]
            shab.con=true
            shab.operation_condition='and'
          }
          this.recordData.shab_list.push(shab);
        },
        delItem(index){
          this.recordData.shab_list.splice(index, 1);
        },
        checkCondition(item){
          if(typeof item.con=='undefined')return false
          return item.con
        },
        getCondData(condData){
          this.recordData.conds = condData;
        },
        setRecover(){
          if (this.recordData.rec_data == null){
            this.recordData.rec_data = {id:0,text:'Все'};
          }
        },
        setStatus(){
          if (this.recordData.status_data == null){
            this.recordData.status_data = {id:0,text:'Все статусы ФССП'};
          }
        },
        setPeriod(){
          if (this.recordData.shed_period == null){
            this.recordData.shed_period = 1;
          }
        },
        setWeek(){
          if (this.recordData.shed_week == null){
            this.recordData.shed_week = 1;
          }
        },
        filterFieldInput(){
          this.filtredShabAllArr = this.ShabAllArrStadwithGroup.filter(arr => arr.name.includes(this.filterField));
        },
        eraseFilterField(){
          this.filterField = '';
          this.filterFieldInput();
        },
        pushMounthDate(){
          for(let i=0;i<30;i++){this.MounthList.push({id: i+1, label: (i+1).toString()})};
          this.MounthList.push({id: 31, label: 'Последнее число месяца'});
        },

        ...mapActions([
            'getFsspHodRecordDataRecoverersList','getFsspHodRecordDataFsspStatuses','getDataShabAlls',
            'getFsspHodRecordDataPerem','saveFsspHodRecord','getFsspHodRecordData'
        ]),
      },
      mounted() {
        this.getFsspHodRecordDataFsspStatuses();
        this.getFsspHodRecordDataRecoverersList();
        this.getDataShabAlls().then((response) => {
          this.filtredShabAllArr = this.ShabAllArrStadwithGroup.filter(arr => arr.name!='')
        });
        this.pushMounthDate();

        if (this.$route.params.id != 'new'){
          this.getFsspHodRecordData(this.$route.params.id).then((response) => {
            if (response.result){
              this.recordData = response.data;
              this.$refs.condition_vars.setCondData(this.recordData.conds);
              this.statHod = 'Редактирование ходатайства (ID '+this.recordData.id+')';
              this.editFlag = true;
            } else {
              this.$vs.notify({
                title: 'Ошибка',
                text: response.error,
                color: 'danger',
                position: 'top-center'
              })
            }
          });
        }
      },
    }
</script>

<style lang="scss">
    #page-user-list {
    .user-list-filters {
    .vs__actions {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-58%);
    }
    }
    }
</style>
