<script setup>
import HeaderView from './components/Header.vue'
</script>

<template>
  <div>
    <HeaderView />
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
.main {
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: start;
  background-color: #f0f2f5;
}
</style>
