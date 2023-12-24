<template>
  <div class="flex flex-wrap justify-content-center">
    <AuthorsCard :author="author" v-for="author in authors"></AuthorsCard>
  </div>
</template>

<script>
import axios from "axios";
import AuthorsCard from "../components/AuthorsCard.vue";

export default {
  name: "AuthorsView",
  components: {
    AuthorsCard,
  },
  data() {
    return {
      authors: [],
    };
  },
  created() {
    axios
      .post(JSON.parse(localStorage.getItem("server_url")) + "/api/get_authors")
      .then((response) => {
        this.authors = response.data;
      });
  },
};
</script>

<style scoped></style>
