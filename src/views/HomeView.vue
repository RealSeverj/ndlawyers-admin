<script setup>
</script>

<template>
  <div class="home-background">
    <div class="overlay"></div>
    <p class="glow-text">欢迎回来，管理员</p>
  </div>
</template>

<style scoped>
.home-background {
  position: relative;
  background-image: url('../assets/background.jpg');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
}

p {
  position: relative;
  z-index: 2;
  font-size: 48px;
  color: rgb(213, 228, 243);
}

.glow-text {
  text-shadow: 0 0 2px rgba(255, 255, 255, 0.8), 0 0 5px rgba(255, 255, 255, 0.6), 0 0 10px rgba(255, 255, 255, 0.4);
}
</style>
