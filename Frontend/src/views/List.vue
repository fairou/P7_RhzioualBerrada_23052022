<template>
  <h1 class="masthead-heading mb-3">Liste des posts</h1>
  <div class="card mb-3">
    <div v-for="post in posts" :key="post._id" class="row g-4 post-content">
      <post :item="post" @refresh="refresh"></post>
    </div>
  </div>

</template>

<script>
import http from '../http';
import Post from '@/components/Post.vue';
import { mapState } from 'vuex';

export default {
  name: 'list_page',

  components: {
    post: Post,
  },
  data() {
    return {
      posts: []
    }
  },
  computed: {
    ...mapState(['user']),
  },
  mounted() {
    this.refresh()
  },
  methods: {
    refresh() {
      http
        .get('/post/')
        .then(res => {
          this.posts = res.data;
          console.log(res.data);
          for (let i in this.posts) {
            this.posts[i].done = 0;
            if (this.posts[i].usersLiked.includes(this.user.userId) || this.posts[i].usersDisliked.includes(this.user.userId)) {
              this.posts[i].done = 1;
            }
          }
        })
    },

  }
}
</script>
<style scoped>
.custom-avatar {
  height: 4rem;
  width: 4rem;
  object-fit: cover;
  border-radius: 999px;
}

</style>