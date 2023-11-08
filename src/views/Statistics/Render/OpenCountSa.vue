<template>
    <div >
        <a style="cursor: pointer" @click="openDyn">{{params.value}} </a>
        <vs-popup style="min-height: 500px;" classContent="popup-example" title="количество СА" :active.sync="showDyn">
            <template v-if="showDyn">
                <vue-apex-charts type="bar" height="350" :options="chartOptions" :series="series"></vue-apex-charts>
            </template>



        </vs-popup>

    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../route';
    import { mapActions,mapGetters } from 'vuex'
    import VueApexCharts from 'vue-apexcharts'
    export default {
        name: 'OpenLink',
        components: {
            VueApexCharts
        },

        data () {
            return {
                showDyn:false,
                themeColors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
                series: [{
                    name: 'количество СА %',
                    data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
                }],
                chartOptions: {
                    chart: {
                        height: 350,
                        type: 'bar',
                    },
                    plotOptions: {
                        bar: {
                            borderRadius: 10,
                            dataLabels: {
                                position: 'top', // top, center, bottom
                            },
                        }
                    },
                    dataLabels: {
                        enabled: true,

                        formatter: function (val) {
                            return val ;
                        },
                        offsetY: -20,
                        style: {
                            fontSize: '12px',
                            colors: ["#304758"]
                        }
                    },

                    xaxis: {
                        categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                        position: 'top',
                        axisBorder: {
                            show: false
                        },
                        axisTicks: {
                            show: false
                        },
                        crosshairs: {
                            fill: {
                                type: 'gradient',
                                gradient: {
                                    colorFrom: '#D8E3F0',
                                    colorTo: '#BED1E6',
                                    stops: [0, 100],
                                    opacityFrom: 0.4,
                                    opacityTo: 0.5,
                                }
                            }
                        },
                        tooltip: {
                            enabled: true,
                        }
                    },
                    yaxis: {
                        axisBorder: {
                            show: false
                        },
                        axisTicks: {
                            show: false,
                        },
                        labels: {
                            show: false,

                        }

                    },
                    title: {
                        text: 'Динамика СА %',
                        floating: true,
                        offsetY: 330,
                        align: 'center',
                        style: {
                            color: '#444'
                        }
                    }
                },
            }
        },
        mounted(){


         //   this.getReqUsers();
            //console.log(this.Requsers);

        },

        methods: {
            openDyn(){

                if(typeof this.params.data.saMonth!='undefined'){
                    let arr=[];
                    let opt=[];
                    if(this.params.data.saMonth!=null){
                        for (let i=0;i<this.params.data.saMonth.length;i++){
                            arr.push(this.params.data.saMonth[i].colP+'%')
                            opt.push(i);

                        }
                    }

                    this.series[0].data=arr;
                    this.chartOptions.xaxis.categories=opt;
                 //   console.log(this.series)
                    this.showDyn=true;
                }


            }



        }
    }
</script>
