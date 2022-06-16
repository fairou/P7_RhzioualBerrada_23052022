<template>
  <section class="h-100 gradient-form">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-xl-10">
          <div class="card rounded-3 text-black">
            <div class="row g-0">
              <div class="text-center">
                <h1 class="mt-1 pb-1">Liste des posts</h1>
              </div>
              <div class="posts">
              <div v-for="post in posts" :key="post._id" class="row g-4 text-left">
                <div class="card mb-3">
                <post :item="post" @up="refresh" :data-id="post._id"></post>
                 <hr/>
                 </div>
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
import http from "../http";
import Post from "@/components/Post.vue";
import { mapState } from "vuex";

export default {
  name: "list_page",

  components: {
    post: Post,
  },
  data() {
    return {
      posts: [],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      http.get("/post/").then((res) => {
        this.posts = res.data;
        console.log(res.data);
        for (let i in this.posts) {
          this.posts[i].liked = false;
           this.posts[i].disliked = false;
          if (this.posts[i].usersLiked.includes(this.user.userId) ) {
            this.posts[i].liked = true;
          }else if (this.posts[i].usersDisliked.includes(this.user.userId)){
            this.posts[i].disliked = true;
          }
          // this.posts[i].userName=this.getUserName(this.posts[i].userId);
          
          // this.getUserName(this.posts[i].userId, i);
          // console.log('this.posts[i]', this.posts[i]);
        }
      });
    },
    getUserName(userId){
      console.log('user:', userId);
      http.get("/user/" + userId).then((res) => {
        this.user = res.data.user;
        
        //console.log("res.data user",res.data.user.name);
        // this.post[index].userName = res.data.user.name;
        return res.data.user.name;
      }).catch(()=>{
        console.log('user not found') ;
        return '';
      });
    },
  },
};
</script>
<style scoped>
.custom-avatar {
  height: 4rem;
  width: 4rem;
  object-fit: cover;
  border-radius: 999px;
}
</style>
