<template>
  <div class="">
    <form>      
        <h1 class="">Please signup</h1>
        <div class="">
          <label  for="email" class="">Email address</label>
          <input v-model="email" type="email" class="" id="email"  placeholder="xxx@yy.zzz">          
        </div>

        <div class="">
          <label for="password" class="form-label">Password</label>
          <input v-model="password" id="password" :type="show ? 'text' : 'password'" class="form-control" placeholder="*************">          
        </div>        

        <div class="">            
          <button @click.prevent="signUp" type="submit" aria-label="signup" class="">Signup</button>
        </div>       
        
      </form>
    </div>
</template>

<script>
import http from '../http'
import {mapMutations} from 'vuex';
export default {
  name: 'signup-page',
  data() {
    return {
      email: '',
      password: '',      
    }
  },
  computed: {
    
  },
  methods: {
    ...mapMutations(['initUser']),
    signUp() {       
      const body = {
        email: this.email,
        password: this.password
      }
      http
        .post('/auth/signup', body)
        .then(res => {
          console.log(res.data)
          if(res.data.user.token){
            console.log(res.data.token)
            if(!localStorage.getItem('groupo')){
              localStorage.setItem("groupo", JSON.stringify(res.data.user.token));
            }
            res.data.user.isConnect = true;
            console.log(res.data)
            this.initUser(res.data.user)
            this.$router.push('list');
          }
          
        })
        .catch((e) => {          
          console.log(e);
          alert(e.response.data.message);
          console.log("Échec de l'inscription")
      })
    }
  }
}
</script>
<style scoped>

</style>