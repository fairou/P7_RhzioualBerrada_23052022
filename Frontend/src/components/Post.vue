<template>

  <div class="col-md-4">
    <img v-if="(item.imageUrl != null)" :src="item.imageUrl" alt="message-image"
      class="imgProvisoire bd-placeholder-img img-fluid rounded-start" />
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <div class="row">
        <h5 class="card-title float-start">{{ item.title }}</h5>
        <small class="card-time text-muted float-end">{{ toDate(item.timestamp) }}</small>
      </div>

      <div class="row">
        <p class="card-text">{{ item.post }}</p>
      </div>

      <div class="manage-container">
        <div class="d-grid gap-2 d-md-flex float-start manage-edit" role="group" aria-label="Edit post">
          <a v-if="item.userId == this.user.userId" href="#">

              <router-link :to="{ name: 'Edit', params: { id: item._id } }" class="btn btn-outline-success me-md-2">
                <i class="bi bi-pen"></i>
              </router-link>
          </a>
          <a v-if="this.user.isAdmin || item.userId == this.user.userId" @click.prevent="deletepost()"
            aria-label="Supprimer ce post" class="btn btn-outline-danger">
            <i class="bi bi-trash-fill"></i>
          </a>
        </div>
        <div class="d-grid gap-2 d-md-flex float-end manage-likes">
            <a href="#" aria-label="Cliquer sur j'aime ce post" @click.prevent="addReaction(1)">
              <span class="cliked">{{ item.likes }}<i class="bi bi-hand-thumbs-up-fill"></i></span>
            </a>
            <a href="#" aria-label="Cliquer sur je n'aime pas ce post" @click.prevent="addReaction(-1)" class="noB">
              <span class="cliked">{{ item.dislikes }}<i class="nono bi bi-hand-thumbs-down-fill"></i>
              </span>
            </a>
        </div>
      </div>


    </div>
  </div>


  <!-- CARD classique-->
  <!-- <div class="col">
    <div class="card h-100">
      <img v-if="(item.imageUrl != null)" :src="item.imageUrl" alt="message-image"
        class="imgProvisoire bd-placeholder-img card-img-top rounded " />
      <div class="card-body">
        <h5 class="card-title">{{ item.title }}</h5>
        <p class="card-text">{{ item.post }}</p>
      </div>
      <div class="card-footer">
        <div>
          <div>
            <a href="#" aria-label="Cliquer sur j'aime ce post" @click.prevent="addReaction(1)">
              <span class="cliked"><i class="bi bi-hand-thumbs-up-fill"></i>LIKE A = {{ item.likes }}/</span>
            </a>
            <a href="#" aria-label="Cliquer sur je n'aime pas ce post" @click.prevent="addReaction(-1)" class="noB">
              <span class="cliked"><i class="nono bi bi-hand-thumbs-down-fill"></i>DISLIKE A= {{ item.dislikes }}
              </span>
            </a>

          </div>

          <div class="">
            <a v-if="item.userId == this.user.userId" href="#">

              <router-link :to="{ name: 'Edit', params: { id: item._id } }">
                EDIT
                <i class="bi bi-pen"></i>
              </router-link>
            </a>
            <a v-if="this.user.isAdmin || item.userId == this.user.userId" @click.prevent="deletepost()"
              aria-label="Supprimer ce post">
              <i class="bi bi-trash-fill"></i>
              SUPPRIME
            </a>
          </div>
        </div>
      </div>
    </div>
  </div> -->




  <!-- OLD -->
  <!-- <div>    
    <p>
      {{ item.title }}
    </p>
    <p>
      {{ item.post }}
    </p>
    <img v-if="(item.imageUrl != null)"
          :src="item.imageUrl"
          alt="message-image"
          class="imgProvisoire"/>
    <div>
      <div>
        <a
          href="#"
          aria-label="Cliquer sur j'aime ce post"
          @click.prevent="addReaction(1)"
          >             
          <span class="cliked"><i class="bi bi-hand-thumbs-up-fill"></i>LIKE A = {{ item.likes }}/</span>
        </a>        
        <a
          href="#"
          aria-label="Cliquer sur je n'aime pas ce post"
          @click.prevent="addReaction(-1)"
          class="noB">
          <span class="cliked"><i class="nono bi bi-hand-thumbs-down-fill"></i>DISLIKE A= {{ item.dislikes }} </span>
        </a>
        
      </div>
                
      <div class="">
        <a v-if="item.userId == this.user.userId" href="#">
          
            <router-link :to="{name: 'Edit', params: { id: item._id}}">
              EDIT
            <i class="bi bi-pen"></i>            
          </router-link>             
        </a>
        <a 
          v-if="this.user.isAdmin || item.userId ==  this.user.userId" 
          @click.prevent="deletepost()"
          aria-label="Supprimer ce post">
          <i class="bi bi-trash-fill"></i>
          SUPPRIME
        </a>
      </div>        
    </div>
  </div> -->
</template>

<script>
import http from '../http';
import moment from 'moment'
import { mapState } from 'vuex';


export default {
  name: 'post-page',
  props: {
    item: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      display: false,
    };
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    refresh(arg) {
      console.log(arg)
      if (arg != 1) {
        this.togleCom();
      }

      this.$emit('refresh', arg);
    },
    addReaction(reaction) {
      console.log(this.item)
      console.log(reaction);
      const payload = {
        userId: this.user.userId,
        like: reaction
      }
      http
        .post(`/post/${this.item._id}/like`, payload)
        .then(res => {
          console.log(res)
          this.refresh(1);
        })
        .catch((e) => {
          console.log(e);
          alert(e.response.data.error)
        })
    },
    deletepost() {
      http
        .delete(`/post/${this.item._id}`)
        .then(res => {
          console.log(res)
          alert('Le post a correctement été supprimé')
          this.refresh();
        })
        .catch((e) => {
          console.log(e);
          console.log("Échec de suppression")
        })
    },
    edit(idArticle) {
      this.$router.push({ name: "edit", params: { id: idArticle } });
    },
    togleCom() {
      console.log(this.display)
      this.display = !this.display;
    },
    toDate(timestamp) {
      if (timestamp) {
        return moment(String(timestamp)).format('DD/MM/YYYY hh:mm')
      }
    }
  }
}
</script>
