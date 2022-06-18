<template>
  <section class="h-100 gradient-form">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-xl-10">
          <div class="card rounded-3 text-black">
            <div class="row g-0">
              <div class="text-center">
                <h1 class="mt-1 pb-1">Ajouter un post</h1>
              </div>
              <form class="form" @submit="checkForm">
                 <p v-if="errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                   
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                  </ul>
                </p>
                <div class="row m-3">
                  <div class="publish-sm text-end">
                    <button type="submit" @click.prevent="postMessage" class="btn btn-outline-secondary float-right">
                      <i class="fa fa-paper-plane" aria-hidden="true"></i> Publier
                    </button>
                  </div>
                </div>

                <div class="m-3 text-left">
                  <div class="mb-3">
                    <label for="title" class="form-label">Titre</label>
                    <input v-model="title" class="form-control" id="title" name="title"
                      placeholder="Titre de votre message" minlength="5" required>
                  </div>
                  <div class="mb-3">
                    <label for="body" class="form-label">Message</label>
                    <textarea v-model="post" class="form-control" rows="3" id="body" name="body"
                      placeholder="Écrivez votre message" minlength="5" required>
                  </textarea>
                  </div>
                  <div class="mb-3">
                    <label for="formFile" class="form-label">Ajouter une image</label>
                    <input class="form-control" ref="fileInput" name="image" id="formFile" type="file" @input="pickFile">
                  </div>
                  <div class="mb-3">
                    <div v-if="previewImage" class="imagePreviewWrapper" :style="{'background-image': `url(${previewImage})` }"
                      @click="selectImage"></div>
                  </div>
                </div>
                <div class="m-3 publish">
                  <button type="submit"  class="btn btn-outline-secondary">
                    <i class="fa fa-paper-plane" aria-hidden="true"></i> Publier
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
  name: "Add-page",
  data() {
    return {
      title: "",
      post: "",
      file: "",
      previewImage: null,
      errors:[],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    postMessage() {
      if (this.file) {
        const formData = new FormData();
        formData.append(
          "post",
          JSON.stringify({
            title: this.title,
            post: this.post,
            userId: this.user.userId,
            timestamp: new Date(),
          })
        );
        formData.append("image", this.file, this.file.name);
        console.log('new post - formData with img',formData);
        http
          .post("/post/", formData)
          .then((res) => {
            console.log('new post - post result', res.data);
            this.$router.push({ name: "list" });
          })
          .catch((e) => {
            console.log(e);
            alert("Impossible de poster le message " + e);
          });
      } else {
        const payload = {
          title: this.title,
          post: this.post,
          userId: this.user.userId,
          timestamp: new Date(),
        };
        console.log('new post - payload without img',payload);
        http
          .post("/post/", payload)
          .then((res) => {
            console.log('new post - post result without img', res.data);
            this.$router.push({ name: "list" });
          })
          .catch((e) => {
            console.log("Impossible de poster le message");
            alert("Impossible de poster le message " + e);
          });
      }
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
      this.errors = [];
      this.postMessage();
      // if(this.title === '' ) {
      //   this.errors.push("Le titre du post est obligatoire.");
      // } else if(this.title.length < 5) {
      //   this.errors.push("Il faut saisir au moins 5 caractères");
      // } else {
      //   this.postMessage();
      // }
    }
  },
};
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
