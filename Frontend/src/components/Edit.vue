<template>  

<section class="h-100 gradient-form">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-xl-10">
          <div class="card rounded-3 text-black">
            <div class="row g-0">
              <div class="text-center">
                <h1 class="mt-1 pb-1">Modifier le post</h1>
              </div>
              <form class="form" @submit="checkForm">
                <div class="row m-3">
                  <div class="publish-sm text-end">
                    <button type="submit" class="btn btn-outline-secondary float-right">
                      <i class="fa fa-paper-plane" aria-hidden="true"></i> Publier
                    </button>
                  </div>
                </div>

                <div class="m-3 text-left">
                  <div class="mb-3">
                    <label for="title" class="form-label">Titre</label>
                    <input v-model="post.title" class="form-control" id="title" name="title"
                      placeholder="Titre de votre message" minlength="5" required>
                  </div>
                  <div class="mb-3">
                    <input v-model="post._id" id="idMessage" name="idMessage" type="hidden">
                    <label for="body" class="form-label">Message</label>
                    <textarea v-model="post.post" class="form-control" rows="3" id="body" name="body"
                      placeholder="Écrivez votre message" minlength="5" required>
                  </textarea>
                  </div>
                  <div class="mb-3">
                    <label for="formFile" class="form-label">Ajouter une image</label>
                    <input class="form-control" ref="fileInput" type="file" @input="pickFile">
                  </div>
                  <div class="mb-3">
                    <div class="imagePreviewWrapper" :style="{ 'background-image': `url(${previewImage})` }"
                      @click="selectImage"></div>
                  </div>
                </div>
                <div class="m-3 publish">
                  <button type="submit" class="btn btn-outline-secondary publish">
                    <i class="fa fa-check" aria-hidden="true"></i>Valider
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import http from '../http';
import {mapState} from 'vuex';

export default {
  name: 'edit-page',  
  data() {
    return {      
      post: "",
      file:'',
      previewImage: null
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
          this.previewImage=response.data.imageUrl;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateMessage() {
      const formData = new FormData();      
      formData.append('title', this.post.title);
      formData.append('post', this.post.post);
      formData.append('userId', this.user.userId);
      if(this.file) {
         formData.append('image', this.file, this.file.name);
      } else {
        formData.append('image', '');
        if(typeof(this.post.imageUrl) !== 'undefined'){
          let imgTab = this.post.imageUrl.split('/');
          const long = imgTab.length - 1;
          const img = imgTab[long];
          formData.append('image', img);
        } 
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
    selectImage() {
      this.$refs.fileInput.click()
    },
    pickFile() {



      let input = this.$refs.fileInput
      let file = input.files
      if (file && file[0]) {
        let reader = new FileReader
        reader.onload = e => {
          this.previewImage = e.target.result
        }
        this.file=file[0];
        reader.readAsDataURL(file[0])
        this.$emit('input', file[0])
      }
    },
    checkForm:function(e) {
      e.preventDefault();
      this.updateMessage();
    }
  },
  mounted() {
    this.post = "";
    this.getMessage(this.$route.params.id);
  },
}
</script>
<style scoped>
.imagePreviewWrapper {
  background-repeat: no-repeat;
  width: 250px;
  height: 250px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: contain;
  background-position: center center;
}
</style>