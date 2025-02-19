<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchArticle } from '../api/article';
import { getCategoryLabel } from '../api/sort';
import ArticleShow  from "../components/ArticleShow.vue";

const route = useRoute();
const article = ref(null);
const articleId = ref(route.params.id);

const loadArticle = async () => {
  try {
    article.value = await fetchArticle(articleId.value);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  loadArticle();
});
</script>

<template>
  <div v-if="article" class="article">
    <div class="banner">
      <img :src="article.image_path" alt="Banner图片">
      <div class="overlay">
        <h1>{{ article.title }}</h1>
      </div>
    </div>
    <a-row :gutter="16" class="detail" style="display: flex; align-items: center;  justify-content: center">
      <a-col>
        <p><strong>分类：</strong> {{ getCategoryLabel(article.sort) }}</p>
      </a-col>
      <a-col>
        <p><strong>发布时间：</strong> {{ article.time }}</p>
      </a-col>
      <a-col>
        <p><strong>浏览量</strong> {{ article.views }}</p>
      </a-col>
    </a-row>
    <a-row>
      <p><strong>简介：</strong> {{ article.description }}</p>
    </a-row>
    <a-row>
      <p><strong>文章内容：</strong></p>
    </a-row>
    <ArticleShow :article-id="article.id"></ArticleShow>
  </div>
  <div v-else>
    <p>加载中...</p>
  </div>
</template>

<style scoped>
.detail{
  padding: 20px;
}
.detail strong {

}
.article {
  padding: 20px;
  width: 900px;
  margin: 16px auto;
}
.banner {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 15px;
}
.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.banner::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
}
.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-align: center;
  z-index: 1;
}
</style>
