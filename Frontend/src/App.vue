<template>
  <div class="" id="app">
    <navbar :is-connected="isConnected"></navbar>
    
    <div class="masthead text-center ">
    <div class="masthead-content">
      <div class="container px-5">
        
        <router-view></router-view>
        
      </div>
    </div>
    <div class="bg-circle-1 bg-circle"></div>
    <div class="bg-circle-2 bg-circle"></div>
    <div class="bg-circle-3 bg-circle"></div>
    <div class="bg-circle-4 bg-circle"></div>
  </div>
    
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: {
    'navbar': NavBar
  },
  mounted() {
    this.check();
  },
  methods: {
    check() {
      console.log(this.user.isConnect)
      if (this.user.isConnect == false &&
      this.$router.currentRoute.path != '/') {
      this.$router.push('/');
      }
    }
  },
  computed: {
    ...mapState(['user']),
    
    isConnected() {      
      return (this.user.isConnect);
    }
  }
}
</script>