<template>

      <div class="container px-5">
        <h1 class="masthead-heading mb-0">Welcome to Groupomania blog</h1>
        <form v-if="isConnected">
          <div>
            <h2>
              <span>
                Informations
              </span>
            </h2>
          </div>
          <div>
            <p>
              Ecrire un nouveau Post?
            </p>
            <button @click="$router.push('/add')" type="submit">
              <span>Nouveau</span>
            </button>
            <button @click="$router.push('/list')" type="submit">
              <span>tous les posts</span>
            </button>

          </div>
        </form>
        <form v-if="!isConnected">
          <div>
            <button @click="$router.push('/login')">
              Loggin
            </button>
            <button @click="$router.push('/signup')">
              Signup
            </button>
          </div>
        </form>
        
      </div>
    

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