<template>  
<h1 class="masthead-heading mb-0">Nouveau post</h1>
    <div class="">
      <form class="container px-lg-5">
          <div class="">
            <label for="title" class="">Titre</label>
            <input v-model="title" id="title" name="title" placeholder="Titre de votre message" required>
          </div>
          <div class="">
            <label for="body" class="">Message</label>
            <textarea
              class="" rows="3"
              name="body"
              placeholder="Écrivez votre message"
              v-model="post"
              required>
            </textarea>
          </div>
        
          <div class="">
            <div class="">
              <div class="">
                <span id="preview"></span>
              </div>
              <div class="inputFile">
                <label for="formFile" class="">Ajouter une image</label>
                <input class="" type="file" name="image" id="formFile" @change="uploadImage($event)">
              </div>                
            </div>
          </div>
          <div class="row">            
            <div class="text-right">        
              <button type="submit"  @click.prevent="postMessage" class="btn btn-outline-secondary publish">
                <i class="fa fa-paper-plane" aria-hidden="true"></i> Publier
              </button>
            </div>
          </div>
      </form>
    </div>

</template>

<script>
import http from '../http';
import {mapState} from 'vuex';

export default {
  name: 'Add-page',
   data() {
    return {
      title: '',
      post: '',
      file: ''
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    postMessage() {
      if(this.file) {
        const formData = new FormData();
        // formData.append('title', this.title);
        // formData.append('post', this.post);
        // formData.append('userId', this.user.userId);
        formData.append('post',JSON.stringify({
            title: this.title,
            post: this.post,
            userId: this.user.userId
          }));
        formData.append('image', this.file, this.file.name);
        console.log(formData);
        http
        .post('/post/', formData)
        .then(res => {
          console.log(res.data)
          this.$router.push({ name: "list" });
        })
        .catch((e) => {
          console.log(e);
          alert('Impossible de poster le message ' + e)
        })
      }  else {
        const payload = {
          title: this.title,
          post: this.post,
          userId: this.user.userId
        }
        console.log(payload);
        http     
        .post('/post/', payload)
        .then(res => {
          console.log(res.data)
          this.$router.push({ name: "list" });
        })
        .catch((e) => {
          console.log('Impossible de poster le message');
          alert('Impossible de poster le message ' + e)
        })
      } 
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
      reader.readAsDataURL(this.file);
    }
  }
}
</script>
<style scoped>

#preview{
  width: 150px;
  display: flex;
  height: 150px;
}
#preview img{
  width: 100%;
  
}

</style>