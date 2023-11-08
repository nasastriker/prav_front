<template>

<span>
  <input type="text" class="vs-inputx cls vs-input--input normal hasValue" style="border: 1px solid rgba(0, 0, 0, 0.2); padding-left: 10px!important;" v-model="value">
  <input type="text" class="vs-inputx cls vs-input--input normal hasValue" style="border: 1px solid rgba(0, 0, 0, 0.2); padding-left: 10px!important;" v-model="fias">
</span>
</template>

<script>
  import $ from 'jquery';
  import 'suggestions-jquery';

  export default {
    props: {
      model: {
        required: true
      },
      coordinates: {},
      options: {
        type: Object,
        default: {
          type: 'ADDRESS',
          addon: 'none'
        }
      }
    },
    data() {
      return {
        fias:'',
        value: '',
        coords: {
          latitude: '',
          longitude: ''
        },
      }
    },
    mounted() {
      this.callbacks = $.Callbacks();
      this.value = this.model;
      this.initSuggestion();
    },
    destroyed() {
      this.destroySuggestion();
    },
    watch: {
      coords: {
        handler() {
          this.$emit('update:coordinates', this.coords);
        },
        deep: true
      },
      value() {
        this.$emit('update:model', this.value);
      },
      model() {
        this.value = this.model;
      }
    },
    methods: {
      initSuggestion() {
        this.callbacks.add(this.onSelect);
        this.callbacks.add(this.options.onSelect || $.noop)
        const options = Object.assign({}, this.options, {
          onSelect: suggestion => this.callbacks.fire(suggestion)
        });
        $(this.$el).suggestions(options);
      },
      destroySuggestion() {
        const plugin = $(this.$el).suggestions();
        plugin.dispose();
      },
      onSelect(suggestion) {
          console.log(suggestion)
        this.value = suggestion.value;
          this.fias = suggestion.data.street_fias_id;
        const { geo_lat, geo_lon } = suggestion.data;
        this.coords.latitude = geo_lat;
        this.coords.longitude = geo_lon;
      }
    }
  };
</script>
<style>
  .suggestions-suggestions{
    position: relative!important;
  }
  .suggestions-input{
    padding-left: 10px !important;
  }
  .cls{
    padding-left: 10px !important;
  }

</style>
