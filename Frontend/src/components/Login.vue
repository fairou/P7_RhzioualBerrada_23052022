<template>
  <div class="login-page">
    <div class="form">  
    <form>      
        <h1 class="">Please sign in</h1>            
        <div class="">
          <label  for="email" class="">Email address</label>
          <input v-model="email" type="email" class="" name="email" id="email" aria-describedby="emailHelp"  placeholder="xxx@yyy.zzz" required>
        </div>
        <div class="mb-3">
          <label for="password" class="">Password</label>
          <input v-model="password" id="password" :type="show ? 'text' : 'password'"
           name="password" required>
        </div>        
        <div class="">            
          <button @click.prevent="login" type="submit" aria-label="loggin" class="">Se connecter</button>
        </div>
        <div class="mb-3 centri">                
          <router-link to="/signup" class="">
              <i class="bi bi-person-plus icon-bg-size"></i>
              <span class="">Inscription</span>
          </router-link>
        </div>
      </form>
      </div>
    </div>
</template>

<script>
import http from '../http'
import {mapMutations} from 'vuex';

export default {
  name: 'login-page',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    ...mapMutations(['initUser']),
    login() {
      const body = {
        email: this.email,
        password: this.password
      }
      http
      .post('/auth/login', body)
      .then(res => {
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
        if(e.message.substr(-1) == 4){
          alert('Aucun compte associé à cette adresse e-mail!')
        } else if(e.message.substr(-1) == 1){
          alert('Mot de passe invalide')
        }
      })
    }
  }
}
</script>
