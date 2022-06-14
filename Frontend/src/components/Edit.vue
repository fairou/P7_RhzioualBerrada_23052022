<template>  
    <div class="py-5">     
          
      <form name="upMsg" id="editMsg" class="container px-lg-5">
        <div class="">
          <div class="">
            <label for="title" class="">Title</label>
            <input v-model="post.title" id="title" name="title" class="newPseudo form-control">
          </div>
          <div class="">
            <input v-model="post._id" id="idMessage" name="idMessage" type="hidden">
            <label for="body" class="">Content</label>
            <textarea
              class="" rows="3"
              name="content"
              placeholder="Écrivez votre post"
              v-model="post.post"
              required>
            </textarea>
          </div>
        
          <div class="">            
            <div class="">
              <div class="">
                <span id="preview"></span>
              </div>
              <img class="thumb" name="img" id="imgOrigin"
                :src="post.imageUrl"
                alt=""
              />
              <div class="">
                <label for="formFile" class="">Insert Image</label>
                <input class="" type="file" id="formFile" name="image" @change="uploadImage($event)">
              </div>        
            </div>
          </div>
          <div class="">            
            <div class="text-right">        
              <button type="submit"  @click.prevent="updateMessage" class="btn btn-outline-secondary publish">
                <i class="fa fa-check" aria-hidden="true"></i>Valider
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
</template>

<script>
import http from '../http';
import {mapState} from 'vuex';

export default {
  name: 'edit-page',  
  data() {
    return {      
      post: "",
      file:''
    };
  }, 
  computed: {
    ...mapState(['user']),
  },
  methods: {
    getMessage(id) {
      http.get('/post/' + id)
        .then((response) => {     
          console.log(response.data);
          this.post = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateMessage() {
      const formData = new FormData();
      // formData.append('title', this.post.title);
      // formData.append('post', this.post.post);
      // formData.append('userId', this.user.userId);
      
      if(this.file) {
        formData.append('post',JSON.stringify({
            title: this.title,
            post: this.post,
            userId: this.user.userId
          }));
        formData.append('image', this.file, this.file.name);
      } else {
        formData.append('title', this.post.title);
        formData.append('post', this.post.post);
        formData.append('userId', this.user.userId);
        let imgTab = this.post.imageUrl.split('/');
        const long = imgTab.length - 1;
        const img = imgTab[long];
        formData.append('image', img);
      }     
      
      http
        .put(`/post/${this.post._id}`,formData)
        .then(res => {
          console.log(res)
          this.$router.push({name: "list"});
        })
        .catch((err) => {
          console.log(err);
          alert(err)
        })      
    },
    uploadImage(e) {
      this.file = e.target.files[0];
      let img = document.createElement("img");
      img.file = this.file;
      let preview =  document.getElementById('preview');
      preview.appendChild(img); 
      let reader = new FileReader();
      reader.onload = ( function(aImg) { 
        return function(e) { 
          aImg.src = e.target.result; 
        }; 
      })(img);
      document.getElementById('imgOrigin').remove();
      reader.readAsDataURL(this.file);
      console.log(this.file)
    }
  },
  mounted() {
    this.post = "";
    this.getMessage(this.$route.params.id);
  },
}
</script>
<style scoped>

.thumb{
  height:150px;
  max-width:100%;
}
#preview{
  width: 150px;
  display: flex;
  height: 150px;
}
#preview img{
  width: 100%;
  
}

</style>