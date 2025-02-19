import axios from 'axios';
import { message } from 'ant-design-vue';
const baseURL = 'http://127.0.0.1:5000';

export const fetchArticle = async (articleId) => {
  try {
    const response = await axios.get(`${baseURL}/api/articles/${articleId}`);
    const article = response.data;
    if (article.image_path) {
      article.image_path = `${baseURL}/uploads/images/${article.image_path.split('/').pop()}`;
    }
    if (article.file_path) {
      article.file_path = `${baseURL}/uploads/files/${article.file_path.split('/').pop()}`;
    }
    return article;
  } catch (error) {
    message.error('Failed to fetch article');
    throw error;
  }
};

export const deleteArticle = async (articleId) => {
    try {
        const response = await axios.delete(`${baseURL}/api/articles/${articleId}`);
        message.success('文章删除成功！');
        return response.data;
    } catch (error) {
        message.error('删除文章失败');
        throw error;
    }
};

export const fetchArticles = async () => {
    try {
        const response = await axios.get(`${baseURL}/api/articles`);
        const articles = response.data.map(article => {
            if (article.image_path) {
                article.image_path = `${baseURL}/uploads/images/${article.image_path.split('/').pop()}`;
            }
            if (article.file_path) {
                article.file_path = `${baseURL}/uploads/files/${article.file_path.split('/').pop()}`;
            }
            return article;
        });
        return articles;
    } catch (error) {
        message.error('无法获取文章');
        throw error;
    }
};

export const fetchArticles_by_sort = async (articleSort) => {
    try {
        const response = await axios.get(`${baseURL}/api/articles/${articleSort}`);
        const articles = response.data.map(article => {
            if (article.image_path) {
                article.image_path = `${baseURL}/uploads/images/${article.image_path.split('/').pop()}`;
            }
            if (article.file_path) {
                article.file_path = `${baseURL}/uploads/files/${article.file_path.split('/').pop()}`;
            }
            return article;
        });
        return articles;
    } catch (error) {
        message.error('无法获取文章');
        throw error;
    }
};

