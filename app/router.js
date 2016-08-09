import { Router } from 'express';
import * as Posts from './controllers/post_controller';


const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to zuff`s blog api!' });
});

// your routes will go here
// example!
// on routes that end in /posts
// ----------------------------------------------------
router.route('/posts')
  .post((req, res) => {
    Posts.createPost(req, res);
  })
  .get((req, res) => {
    Posts.getPosts(req, res);
  });

router.route('/posts/:id')
  .put((req, res) => {
    Posts.updatePost(req, res);
  })
  .get((req, res) => {
    Posts.getPost(req, res);
  })
  .delete((req, res) => {
    Posts.deletePost(req, res);
  });

export default router;
