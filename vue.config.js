/*=========================================================================================
  File Name: vue.config.js
  Description: configuration file of vue
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
const path = require("path");

let conf = require('dotenv').config();


let re=conf.parsed.BASEPATH+'/js'

module.exports = {
  publicPath: '/',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],

  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 200000,
      }
    },


    resolve: {
      alias: {
        "@": path.resolve(__dirname, 'src/'),
        "@assets": path.resolve(__dirname, 'assets/'),
        "@sass": path.resolve(__dirname, 'sass/')
      }
    },

  },

}

