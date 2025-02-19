<template>
  <div class="login-container">
    <a-form @submit.prevent="handleLogin">
      <h3>欢迎您，管理员：</h3>
      <a-form-item>
        <a-input v-model:value="username" placeholder="Username" />
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="password" type="password" placeholder="Password" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">Login</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue'
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/api/login', {
      username: username.value,
      password: password.value,
    },{withCredentials: true});
    if (response.status === 200) {
      localStorage.setItem('user', JSON.stringify(username.value));
      await router.push('/');
    }
    message.success('登录成功~');
  } catch (error) {
    message.error({content:'账号或密码错误', duration: 3});
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
