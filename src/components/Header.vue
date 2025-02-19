<script setup>
import { h, ref } from 'vue';
import {
  UserOutlined,
  HomeOutlined,
  SolutionOutlined,
  FileAddOutlined,
} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedKeys = ref([]);
const openKeys = ref([]);
const items = ref([
  {
    key: '1',
    label: '返回主页',
    icon: h(HomeOutlined),
    to: '/',
  },
  {
    key: '2',
    label: '上传文章',
    icon: h(FileAddOutlined),
    to: '/upload',
  },
  {
    key: '3',
    label: '已发布的文章',
    icon: h(SolutionOutlined),
    to: '/article',
  },
  {
    key: '4',
    label: '个人中心',
    icon: h(UserOutlined),
    to: '/profile',
    children: [
      {
        key: '4-1',
        label: '更改密码',
        to: '/profile/password',
      },{
        key: '4-2',
        label: '登出',
        to: '/profile/logout',
      }
    ],
  }
]);

// Create a map for key-to-path mappings
const keyToPathMap = {};
const buildKeyToPathMap = (items) => {
  items.forEach(item => {
    if (item.to) {
      keyToPathMap[item.key] = item.to;
    }
    if (item.children) {
      buildKeyToPathMap(item.children);
    }
  });
};
buildKeyToPathMap(items.value);

const handleClick = menuInfo => {
  const { key } = menuInfo;
  const path = keyToPathMap[key];
  if (path) {
    if (path === '/profile/logout') {
      localStorage.removeItem('user');
      router.push('/login');
    } else if (path.startsWith('http')) {
      window.location.href = path;
    } else {
      router.push(path);
    }
  }
  console.log('click ', menuInfo);
};
</script>

<template>
  <a-layout-header style="margin-bottom: -25px">
    <div class="header-content">

      <div class="logo">
        <img src="../assets/logo.png" alt="Logo" />
      </div>

      <div class="menu" style="">
        <a-menu
          style="align-items: flex-end"
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          :items="items"
          @click="handleClick"
          mode="horizontal"
          :style="{ lineHeight: '64px', borderBottom: 'none'}"
        />
      </div>
    </div>
    <a-divider style="height: 2px; background-color: rgba(220,231,244,0.41); margin-top: -6px" />
  </a-layout-header>

</template>

<script>
export default {
  name: "HeaderView"
};
</script>

<style scoped>

.header-content {
  display: flex;
  justify-content: space-between;
  margin-left: 5%;
  margin-right: 5%;
}
.logo img {
  height: 60px; /* 适当调整 Logo 大小 */
  vertical-align: middle;
  margin-bottom: 12px;
}

</style>
