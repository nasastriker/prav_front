<template>
    <vx-card no-shadow>
    <div class="vx-row">
        <!-- COLUMN CHART -->
        <div class="vx-col md:w-1/2 w-full mb-base">
            <vx-card title="Количество пользователей" code-toggler>
                <template v-if="show">
                <vue-apex-charts type="line" height="350" :options="chartOptions" :series="users"></vue-apex-charts>

                </template>
            </vx-card>
        </div>

        <!-- Bar CHART -->
        <div class="vx-col md:w-1/2 w-full mb-base">
            <vx-card title="Количество обращений" code-toggler>
                <template v-if="showReq">
                    <vue-apex-charts type="line" height="350" :options="ReqchartOptions" :series="Requsers"></vue-apex-charts>

                </template>
            </vx-card>
        </div>

    </div>
    </vx-card>
</template>

<script>
import r from '../route'
import axios from '../axios'
import VueApexCharts from 'vue-apexcharts'
export default {
  components: {
    VueApexCharts
  },
  data () {
    return {
      show:false,
      showReq:false,
      themeColors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
      chartOptions: {
        dataLabels: {
          enabled: false
        },

        labels: [
          '01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
          '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
        ],
        xaxis: {
          type: 'datetime',
          categories: [
            '2018-09-19T00:00:00', '2018-09-19T01:30:00', '2018-09-19T02:30:00',
            '2018-09-19T03:30:00', '2018-09-19T04:30:00', '2018-09-19T05:30:00',
            '2018-09-19T06:30:00'
          ]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          }

        }
      },
      ReqchartOptions: {
        dataLabels: {
          enabled: false
        },

        labels: [
          '01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
          '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
        ],
        xaxis: {
          type: 'datetime',
          categories: [
            '2018-09-19T00:00:00', '2018-09-19T01:30:00', '2018-09-19T02:30:00',
            '2018-09-19T03:30:00', '2018-09-19T04:30:00', '2018-09-19T05:30:00',
            '2018-09-19T06:30:00'
          ]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          }

        }
      },
      Requsers: [
        {
          name: 'Обращения',
          data: []
        }
      ],
      users: [
        {
          name: 'Пользователи',
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ]

    }
  },
  mounted () {
    this.getUsers()
    this.getReqUsers()

  },

  computed: {


  },
  methods: {

    getUsers () {
      axios.get(r('usersDebtor.index'), {
        params: {
          method: 'getUsersDebtorAnalitic',
          param: ''

        }
      }).then((response) => {
        if (response.data.result) {
          this.users[0].data = response.data.data
          this.chartOptions.labels = response.data.label
          this.chartOptions.xaxis.categories = response.data.label
        }
        this.show = true
      })
    },

    getReqUsers () {
      axios.get(r('requestUser.index'), {
        params: {
          method: 'getReqUserAnalitic',
          param: ''

        }
      }).then((response) => {
        if (response.data.result) {
          this.Requsers[0].data = response.data.data
          this.ReqchartOptions.labels = response.data.label
          this.ReqchartOptions.xaxis.categories = response.data.label
        }
        this.showReq = true
      })
    }


  }
}
</script>
