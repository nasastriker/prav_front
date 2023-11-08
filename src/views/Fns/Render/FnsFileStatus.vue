<template>
    <vs-chip class="ag-grid-cell-chip" :color="chipColor(params.value)">
        <div>
          <div v-if="params.data.not_copy_file === 1">
            <div v-if="params.data.by_inn === 1">
              Проверить файл (Найдено по ИНН)
            </div>
            <div v-else>
              Проверить файл
            </div>
          </div>
          <div v-else>
            <div v-if="params.data.by_inn === 1">
              {{ statusName }} (Найдено по ИНН)
            </div>
            <div v-else>
              {{ statusName }}
            </div>
          </div>
        </div>
        <feather-icon v-if="params.value === 1" icon="FileTextIcon" svgClasses="h-5 w-5 ml-5 hover:text-primary cursor-pointer" @click="showInfoStart" title="Информация"/>
      <div v-if="params.data.by_inn === 1">
        <feather-icon style="margin-left: 5px" icon="UserCheckIcon" svgClasses="h-5 w-5 hover:text-primary cursor-pointer" @click="changeDebtorDataStart" title="Смена данных заемщика"/>
      </div>
        <div v-if="params.data.not_copy_file === 1">
          <feather-icon icon="AlertTriangleIcon" svgClasses="h-5 w-5 ml-5 hover:text-primary cursor-pointer" @click="getFileUrlFnsStart" title="Файл не скопирован / Проверьте файл"/>
          <feather-icon icon="PaperclipIcon" svgClasses="h-5 w-5 hover:text-primary cursor-pointer" @click="loadFnsAnswerStart" title="Загрузить файл ответа ФНС заемщика"/>
        </div>
        <div v-else-if="params.value === 0">
            <feather-icon icon="FileTextIcon" svgClasses="h-5 w-5 ml-5 hover:text-primary cursor-pointer" @click="showInfoFindStart" />
            <feather-icon icon="CheckIcon" svgClasses="h-5 w-5 hover:text-primary cursor-pointer" @click="showInfoDoneStart" />
        </div>
        <div v-else-if="params.value > 1" style="margin-left: 5px">
            <feather-icon icon="EditIcon" svgClasses="h-5 w-5 hover:text-primary cursor-pointer" @click="showInfoDoneStart" />
            <feather-icon icon="XIcon" svgClasses="h-5 w-5 hover:text-primary cursor-pointer" @click="setOtherStatusNullStart" />
        </div>
    </vs-chip>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'FnsFileStatus',
    computed: {
        ...mapGetters([
            'FnsRecordsStatusesAllArr'
        ]),
        statusName() {
            for (let i = 0; i < this.FnsRecordsStatusesAllArr.length; i++) {
                if (this.FnsRecordsStatusesAllArr[i].id == this.params.value) {
                    return this.FnsRecordsStatusesAllArr[i].val
                }
            }
        },
        chipColor() {
            return (value) => {
                if (value == 0) return ''
                if (value == 1) {
                  if (this.params.data.not_copy_file == 0) return 'success'
                  if (this.params.data.not_copy_file == 1) return 'danger'
                }
                if (value > 1) return '#87CEFA'
            }
        }
    },
    methods: {
      showInfoFindStart(){
        this.params.showInfoFind(this.params.data);
      },
      showInfoDoneStart(){
        this.params.showInfoDone(this.params.data);
      },
      setOtherStatusNullStart(){
        this.params.setOtherStatusNull(this.params.data);
      },
      showInfoStart() {
        this.params.showInfoFnsAnswer(this.params.data.id);
      },
      getFileUrlFnsStart(){
        this.params.getFileUrlFns(this.params.data.id);
      },
      loadFnsAnswerStart(){
        this.params.loadFnsAnswer(this.params.data.id, this.params.data.id_debtorcredit)
      },
      changeDebtorDataStart(){
        this.params.changeDebtorDataFnsAnswer(this.params.data.id)
      }
    },
}
</script>

<style lang="scss" scpoped>
.ag-grid-cell-chip {
    &.vs-chip-success {
        background: rgba(var(--vs-success), .15);
        color: rgba(var(--vs-success), 1) !important;
        font-weight: 500;
    }

    &.vs-chip-warning {
        background: rgba(var(--vs-warning), .15);
        color: rgba(var(--vs-warning), 1) !important;
        font-weight: 500;
    }

    &.vs-chip-danger {
        background: rgba(var(--vs-danger), .15);
        color: rgba(var(--vs-danger), 1) !important;
        font-weight: 500;
    }
}
hr {
    transform: scaleY(0.5);
}
.highlighted { color: red }
.to-set:hover{
    color: blue;
}
</style>
