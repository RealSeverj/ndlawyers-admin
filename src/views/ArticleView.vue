<script setup>
import { ref, onMounted } from 'vue';
import { EyeOutlined } from '@ant-design/icons-vue';
import HeaderSort from "../components/HeaderSort.vue";
import { fetchArticles, fetchArticles_by_sort, deleteArticle } from '../api/article';

const listData = ref([]);
const pagination = { pageSize: 8 };
const isModalVisible = ref(false);
const articleToDelete = ref(null);

const loadArticles = async (sort = '') => {
  try {
    if (sort) {
      listData.value = await fetchArticles_by_sort(sort);
      console.log(listData.value);
    } else {
      listData.value = await fetchArticles();
    }
  } catch (error) {
    console.error(error);
  }
};

const showDeleteConfirm = (articleId) => {
  articleToDelete.value = articleId;
  isModalVisible.value = true;
};

const handleDelete = async () => {
  try {
    await deleteArticle(articleToDelete.value); // 调用删除 API
    window.location.reload();
  } catch (error) {
    console.error(error);
  } finally {
    isModalVisible.value = false;
  }
};

const updateSort = (newSort) => {
  loadArticles(newSort);
};

onMounted(() => {
  loadArticles();
});
</script>

<template>
  <a-col justify="space-around">
    <a-row align="middle">
      <b style="font-size: 18px">分类查找：</b>
      <HeaderSort @update-sort="updateSort" />
    </a-row>
    <a-row>
      <a-list
          class="list"
          item-layout="vertical"
          size="middle"
          :pagination="pagination"
          :data-source="listData"
      >
        <template #footer>
          <div>
            <b>宁德市律师协会</b>
            权威发布
          </div>
        </template>
        <template #renderItem="{ item }">
          <a-list-item>
            <template #actions>
              <!-- 显示浏览图标和浏览次数 -->
              <component :is="EyeOutlined" />
              {{ item.views }}
              <!-- 添加删除按钮，点击后调用 showDeleteConfirm(item.id) -->
              <a-button type="link" @click="() => showDeleteConfirm(item.id)">删除</a-button>
            </template>

            <template #extra>
              <img
                  style="width: 272px; height: 163px; object-fit: cover; object-position: center; border-radius: 8px"
                  :src="item.image_path"
                  alt="Article Image"
                  v-if="item.image_path"
              />
            </template>
            <a-list-item-meta :description="item.time">
              <template #title>
                <a :href="`/article/${item.id}`">{{ item.title }}</a>
              </template>
            </a-list-item-meta>
            <div>{{ item.description }}</div>
          </a-list-item>
        </template>
      </a-list>
    </a-row>
  </a-col>

  <!-- 删除确认提示框 -->
  <a-modal
    v-model:visible="isModalVisible"
    title="确认删除"
    ok-text="确认"
    cancel-text="取消"
    @ok="handleDelete"
    @cancel="() => isModalVisible = false"
  >
    <p>您确定要删除这篇文章吗？</p>
  </a-modal>
</template>

<style scoped>
:deep(.list) {
  min-width: 1000px;
  margin: 0 auto; /* 居中显示 */
}
</style>
