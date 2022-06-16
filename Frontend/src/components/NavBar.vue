<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand"><img class="logo" alt="Vue logo" src="../assets/images/logo.png" />
        </router-link>


        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse text-right" id="navbarSupportedContent">
          <ul id="navMenu" class="navbar-nav ms-auto mb-2 mb-lg-0" v-if="isConnected">
            <router-link to="/add" class="nav-link m-2 menu-item" aria-label="Nouveau article">
                Nouveau <i class="fa fa-paper-plane"></i>
              </router-link>
              <router-link to="/list" class="nav-link m-2 menu-item" aria-label="Accéder aux articles">
                Posts <i class="fa fa-light fa-bullhorn"></i>
              </router-link>
            <router-link to="/profile" class="nav-link m-2 menu-item" aria-label="Accéder aux profile">
                profile <i class="fa fa-light fa-user"></i>
              </router-link>
            <button type="button" class="btn btn-outline-light m-2" @click="logout()">
              <i class="fas fa-sign-out-alt" aria-hidden="true"></i> Déconnexion
            </button>
          </ul>
        </div>
      </div>
    </nav>

  </header>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: 'NavBar-page',
  props: {
    isConnected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapMutations(['initUser']),
    logout() {
      const user = {
        usrId: 0,
        isAdmin: false,
        IsConnect: false
      }
      this.initUser(user);
      localStorage.clear();
      window.location.href = '/welcome'
    }
  }
}
</script>
