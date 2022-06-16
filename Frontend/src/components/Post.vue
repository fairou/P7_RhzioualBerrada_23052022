<template>

  <div class="row g-0 card-post">
    <div class="col-md-3">
      <p class="card-text posted-by"><small class="card-title">{{ userName }}</small></p>
      <p class="card-text posted-date"><small class="text-muted">{{ toDate(item.timestamp) }}</small></p>
      <img v-if="(item.imageUrl != null)" :src="item.imageUrl" alt="message-image"
        class="img-fluid rounded-start posted-img">

    </div>
    <div class="col-md-9">
      <div class="card-body">
        <h5 class="card-title">{{ item.title }}</h5>
        <p class="card-text">{{ item.post }}</p>
        <div class="row justify-content-between">
          <div class="col-4">
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">

              <a v-if="item.userId == this.user.userId" href="#" aria-label="Editer post">
                <router-link :to="{ name: 'Edit', params: { id: item._id } }" class="btn btn-success">
                  <i class="fa fa-solid fa-pen"></i>
                </router-link>
              </a>
              <a v-if="this.user.isAdmin || item.userId == this.user.userId" @click.prevent="deletepost()"
                aria-label="Delete post">
                <span class="btn btn-danger"><i class="fa fa-solid fa-trash"></i></span>
              </a>

            </div>
          </div>
          <div class="col-4 text-end">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <a href="#" aria-label="Cliquer sur j'aime ce post" @click.prevent="addReaction(1)">
                <span class="btn btn-light like">{{ item.likes }}<i class="fa fa-solid fa-thumbs-up like"></i></span>
              </a>
              <a href="#" aria-label="Cliquer sur je n'aime pas ce post" @click.prevent="addReaction(-1)">
                <span class="btn btn-light dislike">{{ item.dislikes }}<i
                    class="fa fa-solid fa-thumbs-down dislike"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import http from '../http';
import moment from 'moment'
import { mapState } from 'vuex';


export default {
  name: 'post-page',
  emits: ['up'],
  props: {
    item: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      display: false,
      userName:'',
    };
  },
  computed: {
    ...mapState(['user']),
  },
  mounted() {
    this.getUserName(this.item.userId);
    // this.checkLikes();
  },
  methods: {
    refresh() {
      this.$emit('up');
    },
    addReaction(reaction) {
      // console.log('this.item', this.item)
      // console.log('reaction', reaction);

    const payload = {
        userId: this.user.userId
      }

  if(this.item.liked && reaction == 1 || this.item.disliked && reaction == -1){
    payload.like = 0;
  } else if(this.item.liked && reaction == -1 || this.item.disliked && reaction == 1){
    alert(`vous avez déjà ${this.item.liked? 'liker' : 'disliker'} ce post`);
     return;
  } else {
    payload.like = reaction;
  }
      
      http
        .post(`/post/${this.item._id}/like`, payload)
        .then(res => {
          console.log(res)
          this.refresh();
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
          console.log('item:', this.item);
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
    toDate(timestamp) {
      if (timestamp) {
        return moment(String(timestamp)).format('DD/MM/YYYY hh:mm')
      }
    },
    getUserName(userId){
      http.get("/user/" + userId).then((res) => {
        this.user = res.data.user;
        this.userName= res.data.user.name;
        return res.data.user.name;
      });
    },
    // checkLikes(){
    //   if(this.item.usersLiked.find(user => user === this.userId)){
    //     this.liked = true;
    //   } else if (this.item.usersDisliked.find(user => user === this.userId)){
    //     this.disliked = true;
    //   }
    // },
  }
}
</script>
