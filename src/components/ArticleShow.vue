<script setup>
import { ref, onMounted } from 'vue';
import { fetchArticle } from '../api/article.js'; // 根据实际路径调整
import mammoth from 'mammoth';
import { message } from 'ant-design-vue';

// 定义组件 props，传入文章 ID
const props = defineProps({
  articleId: {
    type: Number,
    required: true
  }
});

// 定义响应式数据
const article = ref(null);
const contentHtml = ref('');
const loading = ref(false);

async function loadArticle() {
  loading.value = true;
  try {
    // 调用 API 获取文章数据
    article.value = await fetchArticle(props.articleId);

    // 如果文章中存在 Word 文档路径，则获取文档并转换为 HTML
    if (article.value && article.value.file_path) {
      // 获取 Word 文档文件（返回 ArrayBuffer）
      const response = await fetch(article.value.file_path);
      console.log('response:', response);
      if (!response.ok) {
        console.error('获取文章文件失败：', response.statusText);
      }
      const arrayBuffer = await response.arrayBuffer();

      // 使用 mammoth 将 docx 转换为 HTML
      const result = await mammoth.convertToHtml({ arrayBuffer });
      contentHtml.value = result.value;

      // 如果需要，可查看 result.messages 了解转换中的提示信息
      if (result.messages && result.messages.length > 0) {
        console.warn('Word 转换提示：', result.messages);
      }
    }
  } catch (error) {
    console.error('加载文章出错：', error);
    message.error('加载文章失败');
  } finally {
    loading.value = false;
  }
}

// 在组件挂载后加载文章数据
onMounted(() => {
  loadArticle();
});
</script>

<template>
  <!-- 使用 a-spin 展示加载中的效果 -->
  <a-spin :spinning="loading">
    <!-- 文章内容区域 -->
    <div class="article-content" style="margin-top: 20px;">
      <!-- 如果转换成功则展示转换后的 HTML，否则提示暂无内容 -->
      <div v-if="contentHtml" v-html="contentHtml"></div>
      <div v-else>
        <p>暂无文章内容</p>
      </div>
    </div>
  </a-spin>
</template>

<style scoped>
.article-detail {
  max-width: 800px;
  margin: 0 auto;
}

.article-content {
  /* 根据需要添加更多样式 */
}
</style>
