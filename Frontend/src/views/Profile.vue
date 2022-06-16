<template>
  <section class="h-100 gradient-form">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-xl-10">
          <div class="card rounded-3 text-black">
            <div class="row g-0">
              <div class="text-center">
                <h1 class="mt-1 pb-1">Mon profile</h1>
              </div>
              <form class="form" @submit="checkForm">
                <div class="row m-3">
                  <div class="publish-sm text-end">
                    <button type="submit" class="btn btn-outline-secondary float-right">
                      <i class="fa fa-paper-plane" aria-hidden="true"></i> Publier
                    </button>
                  </div>
                </div>
                <input v-model="userInfo.userId" id="userId" name="userId" type="hidden">
                <div class="m-3 text-left">
                    <div class="mb-3">
                    <label for="nom" class="form-label">Nom</label>
                    <input v-model="userInfo.email" class="form-control" id="email" name="email" disabled>
                  </div>
                  <div class="mb-3">
                    <label for="nom" class="form-label">Nom</label>
                    <input v-model="userInfo.nom" class="form-control" id="title" name="nom"
                      placeholder="Votre nom" minlength="2" required>
                  </div>
                  <div class="mb-3">
                    <label for="prenom" class="form-label">Prénom</label>
                   <input v-model="userInfo.prenom" class="form-control" id="title" name="prenom"
                      placeholder="Votre prénom" minlength="2" required>
                  </div>
                  <div class="mb-3">
                    <label for="formFile" class="form-label">Image du profile</label>
                    <input class="form-control" ref="fileInput" name="image" id="formFile" type="file" @input="pickFile">
                  </div>
                  <div class="mb-3">
                    <div class="imagePreviewWrapper" :style="{'background-image': `url(${previewImage})` }"
                      @click="selectImage"></div>
                  </div>
                </div>
                <div class="m-3 publish">
                  <button type="submit"  class="btn btn-outline-secondary">
                    <i class="fa fa-light fa-check"></i> Valider
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
import http from "../http";
import { mapState } from "vuex";

export default {
    
    name: "Profile_page",
    data() {
        return {
            userInfo:"",
            file: "",
            previewImage: null,
        };
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo(){
    http.get("/user/"+ this.user.userId).then((res) => {
        this.userInfo = res.data.user;
        this.previewImage=res.data.user.imageUrl;
      }).catch((error)=>{
        console.log("erreur on get user profile", error);
      });
    },
    updateProfile() {
      const formData = new FormData();      
      formData.append('nom', this.userInfo.nom);
      formData.append('prenom', this.userInfo.prenom);
      if(this.file) {
         formData.append('image', this.file, this.file.name);
      } else {
        formData.append('image', '');
        if(typeof(this.user.imageUrl) !== 'undefined'){
          let imgTab = this.userInfo.imageUrl.split('/');
          const long = imgTab.length - 1;
          const img = imgTab[long];
          formData.append('image', img);
        } 
      }   
      
      http
        .put(`/user/${this.userInfo.userId}`,formData)
        .then(res => {
          console.log(res);
          alert('les donénes du profile sont bien modifiés');
          //this.$router.push({name: "list"});
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
      this.updateProfile();
    }
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