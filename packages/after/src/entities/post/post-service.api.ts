import { DEFAULT_POSTS, POSTS_STORAGE_KEY } from './post-constants.config';
import type { Post } from './post-type.model';
import {
  addNewPost,
  changePostStatus,
  createNewPost,
  createUpdatedPost,
  filterPostById,
  findPostById,
  updatePostInArray,
  validateIsArchived,
  validateNotPublished,
  validatePostExists,
  validatePostTitle,
} from './post-utils.lib';

// TODO: 로컬 스토리지 유틸 shared로 이동
const getPosts = (): Post[] => {
  const data = localStorage.getItem(POSTS_STORAGE_KEY);
  return data ? JSON.parse(data) : DEFAULT_POSTS;
};

// TODO: 로컬 스토리지 유틸 shared로 이동
const savePosts = (posts: Post[]) => {
  localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
};

export const postService = {
  async getAll(): Promise<Post[]> {
    return getPosts();
  },

  async getById(id: number): Promise<Post | null> {
    const posts = getPosts();
    return findPostById(posts, id);
  },

  async create(
    postData: Omit<Post, 'id' | 'createdAt' | 'views'>,
  ): Promise<Post> {
    const posts = getPosts();

    validatePostTitle(postData.title);

    const newPost = createNewPost(posts, postData);
    const updatedPosts = addNewPost(posts, newPost);

    savePosts(updatedPosts);
    return newPost;
  },

  async update(
    id: number,
    postData: Partial<Omit<Post, 'id' | 'createdAt' | 'views'>>,
  ): Promise<Post> {
    const posts = getPosts();
    const post = findPostById(posts, id);

    validatePostExists(post);

    const updatedPost = createUpdatedPost(post!, postData);
    const updatedPosts = updatePostInArray(posts, updatedPost);

    savePosts(updatedPosts);
    return updatedPost;
  },

  async delete(id: number): Promise<void> {
    const posts = getPosts();
    const post = findPostById(posts, id);

    validatePostExists(post);

    const filteredPosts = filterPostById(posts, id);
    savePosts(filteredPosts);
  },

  async publish(id: number): Promise<Post> {
    const posts = getPosts();
    const post = findPostById(posts, id);

    validatePostExists(post);
    validateNotPublished(post!);

    const publishedPost = changePostStatus(post!, 'published');
    const updatedPosts = updatePostInArray(posts, publishedPost);

    savePosts(updatedPosts);
    return publishedPost;
  },

  async archive(id: number): Promise<Post> {
    const posts = getPosts();
    const post = findPostById(posts, id);

    validatePostExists(post);

    const archivedPost = changePostStatus(post!, 'archived');
    const updatedPosts = updatePostInArray(posts, archivedPost);

    savePosts(updatedPosts);
    return archivedPost;
  },

  async restore(id: number): Promise<Post> {
    const posts = getPosts();
    const post = findPostById(posts, id);

    validatePostExists(post);
    validateIsArchived(post!);

    const restoredPost = changePostStatus(post!, 'published');
    const updatedPosts = updatePostInArray(posts, restoredPost);

    savePosts(updatedPosts);
    return restoredPost;
  },
};
