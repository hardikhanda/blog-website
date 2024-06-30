import express from 'express';
const router = express.Router();
import registerController from '../controllers/auth/registerController.js';
import loginController from '../controllers/auth/loginController.js';
import auth from '../middleware/auth.js';
import userController from '../controllers/auth/userController.js';
import refreshController from '../controllers/auth/refreshController.js';
import { 
  createPost, 
  getAllPosts, 
  getPostById, 
  updatePost, 
  deletePost, 
  getPostsByTag, 
  searchPosts, 
  getAllPostsByUser, 
  likePost, 
  addComment,
  getLikesPerPostByUser,
  getUserAnalyticsData
} from '../controllers/auth/postController.js';

router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.post('/logout', auth, loginController.logout);
router.get('/me', auth, userController.me);

// Post routes
router.post('/posts', createPost);
router.get('/posts', getAllPosts);
router.get('/posts/:postId', getPostById);
router.put('/posts/:postId', updatePost);
router.delete('/posts/:postId', deletePost);
router.get('/posts/user/:userId', getAllPostsByUser);
router.get('/posts/tag/:tag', (req, res, next) => {
    console.log('Tag route accessed');
    next();
}, getPostsByTag);
router.get('/posts/search', searchPosts);
router.post('/posts/:postId/like', likePost);
router.post('/posts/:postId/comment', addComment);
router.get('/posts/likes/:userId', getLikesPerPostByUser);
router.get('/analytics/user/:userId', getUserAnalyticsData);



// router.post('/refresh', refreshController.refresh);
// router.get('/me', auth, userController.me);

export default router;
