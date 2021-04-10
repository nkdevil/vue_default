<template>
  <div>
    APP
    {{testData}}
    {{defaultData}}
    <button type="button" @click="getTest('hello word')">getTest</button>
    <button type="button" @click="getDefault('hiyo')">getDefault</button>
    <div>
      <router-link :to="{name: 'home'}">home</router-link>
    </div>
    <div>
      <router-link :to="{name: 'private_index'}">private</router-link>
    </div>
    <div>
      <router-link :to="{name: 'public_index'}">public</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
  },
  data () {
    return {
    }
  },
  beforeCreate () {
  },
  created () {
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    ...mapActions('example', [
      'getTest'
    ]),
    ...mapActions({
      getDefault: 'example/getDefault'
    })
  },
  computed: {
    ...mapGetters({
      testData: 'example/testData'
    }),
    defaultData: {
      get: function() {
        return this.$store.getters['example/defaultData']
      },
      set: function(value) {
        this.$store.dispatch('example/getDefault', value)
      }
    }
  },
  watch: {
    testState: function () {
      return this.testData
    }
  }
}
</script>
