<template>
  <div class="welcome-container">
    <p>Добро пожаловать в нашу библиотеку</p>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
};
</script>

<style scoped>
.welcome-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Занимаем 100% высоты видимой области экрана */
}

p {
  font-size: 24px;
  text-align: center;
}
</style>
