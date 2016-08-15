import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as User from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';


const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to zuff`s blog api!' });
});

// your routes will go here
// example!
// on routes that end in /posts
// ----------------------------------------------------

router.post('/signin', requireSignin, User.signin);
router.post('/signup', User.signup);

router.route('/posts')
  .post(requireAuth, (req, res) => {
    Posts.createPost(req, res);
  })
  .get((req, res) => {
    Posts.getPosts(req, res);
  });

router.route('/posts/:id')
  .put(requireAuth, (req, res) => {
    Posts.updatePost(req, res);
  })
  .get((req, res) => {
    Posts.getPost(req, res);
  })
  .delete(requireAuth, (req, res) => {
    Posts.deletePost(req, res);
  });

export default router;
