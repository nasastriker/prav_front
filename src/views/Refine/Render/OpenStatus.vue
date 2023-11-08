<template>
    <vs-chip class="ag-grid-cell-chip" :color="chipColor(params.value)">
        <span>

                {{parName}}



        </span>
    </vs-chip>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    export default {
        name: 'CellRendererStatus',
        mounted(){

        },
        computed: {
            ...mapGetters([
                'StatussArr'

            ]),
            parName(){
//                Уточнить данные
//                Досудебная работа
//                Судебный приказ
//                Исковое производство
//
//                Возврат
//
//                Контроль СА
//
//                Судебные расходы
//
//                Исполнительное производство
//
//                Умерший
//
//                Банкротство
//
//                Исполнено
//
//                Описка
//
//                Дубликат

                if( this.params.value==1){
                    return  'Проверить адрес'
                }
              if( this.params.value==7){
                return  'Уточнить ОСП'
              }
//                if( this.params.value==2){
//                    return  'Уточнить подсудность'
//                }
                if( this.params.value==17){
                    return  'Уточнить подсудность'
                }
                if( this.params.value==74){
                    return  'Уточнить Адрес'
                }
                if( this.params.value==101){
                    return  'Уточнить подсудность Правеж'
                }
                if( this.params.value==3){
                    return  'Проверить банкротство'
                }
                if( this.params.value==4){
                    return  'Проверить адрес ПФ'
                }
                if( this.params.value==5){
                    return  'Проверить адрес ФССП'
                }
                if( this.params.value==6){
                    return  'Проверить подсудность'
                }
                if( this.params.value==99){
                    return  'Автомат подсудность Гео+Yandex'
                }
                if( this.params.value==98){
                    return  'Автомат подсудность Sudrf'
                }
                if( this.params.value==97){
                    return  'Автомат подсудность Yandex+2'
                }
                if( this.params.value==96){
                    return  'Автомат подсудность Гео+Yandex+2'
                }

            },
            chipColor () {
                return (value) => {
                    if (value == 0) return 'warning'
                    if (value == 6) return 'warning'
                    if (value == 4) return 'warning'
                    if (value == 3) return 'warning'
                    if (value == 17) return 'warning'
                    if (value == 5) return 'warning'
                    if (value == 1 ) return 'success'
                    if (value == 99 ) return 'success'
                    if (value == 98 ) return 'success'
                    if (value == 97 ) return 'success'
                    if (value == 96 ) return 'success'
                    if (value == 101 ) return 'success'

                }
            }
        }
    }
</script>

<style lang="scss" scpoped>
    .ag-grid-cell-chip {
    &.vs-chip-success {
         background: rgba(var(--vs-success),.15);
         color: rgba(var(--vs-success),1) !important;
         font-weight: 500;
     }
    &.vs-chip-warning {
         background: rgba(var(--vs-warning),.15);
         color: rgba(var(--vs-warning),1) !important;
         font-weight: 500;
     }
    &.vs-chip-danger {
         background: rgba(var(--vs-danger),.15);
         color: rgba(var(--vs-danger),1) !important;
         font-weight: 500;
     }
    }
</style>
