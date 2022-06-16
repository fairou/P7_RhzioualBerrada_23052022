<template>

  <section class="h-100 gradient-form">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-xl-10">
          <div class="card rounded-3 text-black">
            <div class="row g-0">
              <div class="text-center">
                <h1 class="mt-1 pb-1">Bienvenue chez Groupamania</h1>
              </div>
              <div class="form">
                <dif v-if="isConnected">
                  <div class="row g-4 py-5 row-cols-1 row-cols-lg-2">
                    <div class="feature col">
                      <h2>Ecrire un nouveau post?</h2>
                      <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
                          consectetur, adipisci velit...</p>
                      <button @click="$router.push('/add')" type="submit" class="btn btn-primary">
                          <i class="fa fa-solid fa-marker"></i>Nouveau
                        </button>
                    </div>
                    <div class="feature col">
                      <h2>Consulter les posts ?</h2>
                      <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
                          consectetur, adipisci velit...</p>
                      <button @click="$router.push('/list')" type="submit" class="btn btn-primary">
                          <i class="fa fa-solid fa-bars"></i>tous les posts
                        </button>
                    </div>

                  </div>

                </dif>
                <dif v-if="!isConnected">
                <div class="row g-4 py-5 row-cols-1 row-cols-lg-2">
                    <div class="feature col">
                      <h2>Pas encore membre?</h2>
                      <button @click="$router.push('/signup')" class="btn btn-primary">
                          <i class="fa fa-solid fa-user-plus"></i>S'inscrire
                        </button>
                    </div>
                    <div class="feature col">
                      <h2>Vous avez déjà un compte ?</h2>
                      <button @click="$router.push('/login')" class="btn btn-primary">
                          <i class="fa fa-solid fa-lock-open"></i>Se connecter
                        </button>
                    </div>

                  </div>
                </dif>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


</template>
<script>
import { mapState } from 'vuex';
//import Users from '@/components/Users.vue'

export default {
  name: 'Welcome-page',
  computed: {
    ...mapState(['user']),
    isConnected() {
      console.log(this.user)
      return (this.user.isConnect);
    }
  },
  methods: {

  }
}
</script>

<style>
.card {
  margin: auto;
}
</style>