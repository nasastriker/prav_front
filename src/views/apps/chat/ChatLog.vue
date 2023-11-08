<!-- =========================================================================================
    File Name: ChatLog.vue
    Description: Chat Application - Log of chat
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
    <div id="component-chat-log" class="m-8" v-if="chatData">

        <div v-for="(msg, index) in chatData" class="msg-grp-container" :key="index">
            <template v-if="msg.agent=='bot'">
                <div class="flex items-start">
                    <div class="con-vs-avatar border-2 shadow border-solid border-white m-0 flex-shrink-0 40px sm:mr-5 mr-3"
                         style="width: 40px; height: 40px; background: rgb(195, 195, 195);"><!---->
                        <div class="con-img vs-avatar--con-img"><img
                                    src="https://crm.bv-pravezh.ru/images/bot.jpg"
                                    alt=""></div>
                    </div><!----><!---->
                    <div class="msg break-words relative shadow-md rounded py-3 px-4 mb-2 rounded-lg max-w-sm border border-solid border-transparent bg-white">
                        <span>{{ msg.text }}</span></div>
                </div>
            </template>
            <template v-if="msg.agent=='user'">
                <div class="flex items-start flex-row-reverse"><!---->
                    <div class="con-vs-avatar border-2 shadow border-solid border-white m-0 flex-shrink-0 40px sm:ml-5 ml-3"
                         style="width: 40px; height: 40px; background: rgb(195, 195, 195);"><!---->
                        <div class="con-img vs-avatar--con-img"><img
                                    src="https://crm.bv-pravezh.ru/images/nologosmi.jpg"
                                    alt=""></div>
                    </div><!---->
                    <div class="msg break-words relative shadow-md rounded py-3 px-4 mb-2 rounded-lg max-w-sm bg-primary-gradient text-white">
                        <span>{{ msg.text }}</span></div>
                </div>
            </template>



        </div>
    </div>
</template>

<script>
export default{
  props: {
    userId: {
      type: Number,
      required: true
    },
      mess:{
          type: Array,
          required: true
      },
  },

  computed: {
    chatData () {
      return this.mess
    },
    activeUserImg () {
      return this.$store.state.AppActiveUser.photoURL
    },
    senderImg () {
      return (isSentByActiveUser) => {
        if (isSentByActiveUser) return this.$store.state.AppActiveUser.photoURL
        else return this.$store.getters['chat/contact'](this.userId).photoURL
      }
    },
    hasSentPreviousMsg () {
      return (last_sender, current_sender) => last_sender === current_sender
    }
  },
  methods: {
    isSameDay (time_to, time_from) {
      const date_time_to = new Date(Date.parse(time_to))
      const date_time_from = new Date(Date.parse(time_from))
      return date_time_to.getFullYear() === date_time_from.getFullYear() &&
                date_time_to.getMonth() === date_time_from.getMonth() &&
                date_time_to.getDate() === date_time_from.getDate()
    },
    toDate (time) {
      const locale = 'en-us'
      const date_obj = new Date(Date.parse(time))
      const monthName = date_obj.toLocaleString(locale, {
        month: 'short'
      })
      return `${date_obj.getDate()  } ${   monthName}`
    },
    scrollToBottom () {
      this.$nextTick(() => {
        this.$parent.$el.scrollTop = this.$parent.$el.scrollHeight
      })
    }
  },
  updated () {
    this.scrollToBottom()
  },
  mounted () {
    this.scrollToBottom()
  }
}
</script>
