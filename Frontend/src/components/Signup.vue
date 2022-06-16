<template>
   <section class="h-100 gradient-form">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-xl-10">
          <div class="card rounded-3 text-black">
            <div class="row g-0">
              <div class="col-lg-12">
                <div class="card-body p-md-5 mx-md-4">

                  <div class="text-center">
                    <img src="../assets/images/favicon.png" style="width: 185px;" alt="logo">
                    <h4 class="mt-1 pb-1">S'enregistrer</h4>
                  </div>

                  <form class="form" @submit="checkForm" oninput="password2.setCustomValidity(password2.value != password.value ? 'le mot de passe n\' est pas identique.' : '')">
                    <p>Nouveau compte</p>

                    <div class="form-outline mb-4">
                      <input v-model="email" type="email" class="form-control" name="email" id="email"
                        aria-describedby="emailHelp" placeholder="user@groupamania.fr" 
                        title="Le champ email est obligatoire et doit être valide"
                        pattern='^\w+@[a-zA-Z_0-9]+?\.[a-zA-Z0-9]{2,3}$'
                        required/>
                      <label class="form-label" for="form2Example11">Email adresse</label>
                    </div>

                    <div class="form-outline mb-4">
                      <input v-model="password" id="password" type="password" name="password" class="form-control"
                        placeholder="***********" title="Doit contenir au moins un nombre, une lettre majuscule, miniscule et minimum 8 characters"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required />
                      <label class="form-label" for="password">Mot de passe</label>
                    </div>
                    <div class="form-outline mb-4">
                      <input  id="password2" type="password" name="password2" 
                      class="form-control"
                        placeholder="***********" required />
                      <label class="form-label" for="password2">Confirmer le Mot de passe</label>
                    </div>

                    

                    <div class="row justify-content-between">
                      <div class="col-6">
                        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                          <button @click="$router.push('/login')" type="button" class="btn btn-outline-danger btn-sm">j'ai un compte</button>
                        </div>
                      </div>
                      <div class="col-6 text-end">
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                         <button class="btn btn-primary btn-sm" type="submit" aria-label="loggin">Valider</button>
                        </div>
                      </div>
                    </div>

                  </form>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
    },
    checkForm:function(e) {
      
      e.preventDefault();

     this.signUp();

      // if(this.email === '') {
      //   this.errors.push("Le champ email est obligatoire.");
      // }  else {
      // this.login();
      // }
    }
  }
}
</script>
<style scoped>

</style>