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
                    <h4 class="mt-1 pb-1">Authentification</h4>
                  </div>

                  <form class="form" @submit="checkForm">
                    <p>Merci de vous connecter à votre compte</p>
                      <p v-if="errors.length">
                      <b>Please correct the following error(s):</b>
                      <ul>
                      
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                      </ul>
                    </p>
                    <div class="form-outline mb-4">
                      <input type="email" v-model="email" class="form-control" name="email" id="email"
                        aria-describedby="emailHelp" placeholder="user@groupamania.fr"
                        pattern='^\w+@[a-zA-Z_0-9]+?\.[a-zA-Z0-9]{2,3}$'
                        required />
                      <label class="form-label" for="form2Example11">Email adresse</label>
                    </div>

                    <div class="form-outline mb-4">
                      <input v-model="password" id="password" type="password" name="password" class="form-control"
                        placeholder="***********"
                        minlength="4" required />
                      <label class="form-label" for="form2Example22">Mot de passe</label>
                    </div>

                    <div class="row justify-content-between">
                      <div class="col-6">
                        <div class="d-grid gap-2 d-md-flex justify-content-md-start">


                          <button @click="$router.push('/signup')" type="button"
                            class="btn btn-outline-danger btn-sm"><i class="fa fa-solid fa-user-plus"></i>S'enregistrer</button>

                        </div>
                      </div>
                      <div class="col-6 text-end">
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                          <button type="submit" class="btn btn-primary btn-sm" 
                            aria-label="loggin"><i class="fa fa-solid fa-lock-open"></i>Se connecter</button>
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
import { mapMutations } from 'vuex';

export default {
  name: 'login-page',
  data() {
    return {
      email: '',
      password: '',
      errors:[],
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
          if (res.data.user.token) {
            console.log(res.data.token)
            if (!localStorage.getItem('groupo')) {
              localStorage.setItem("groupo", JSON.stringify(res.data.user.token));
            }
            res.data.user.isConnect = true;
            console.log(res.data)
            this.initUser(res.data.user)
            this.$router.push('list');
          }
        })
        .catch((e) => {
          if (e.message.substr(-1) == 4) {
            alert('Aucun compte associé à cette adresse e-mail!')
          } else if (e.message.substr(-1) == 1) {
            alert('Mot de passe invalide')
          }
        })
    },
    checkForm:function(e) {
      
      e.preventDefault();

      this.errors = [];
     this.login();

      // if(this.email === '') {
      //   this.errors.push("Le champ email est obligatoire.");
      // }  else {
      // this.login();
      // }
    }
  }
}
</script>
