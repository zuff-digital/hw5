import Post from '../models/post_model';

const cleanPosts = (posts) => {
  return posts.map(post => {
    return { id: post._id, title: post.title, tags: post.tags };
  });
};

const cleanPost = (post) => {
  return { id: post._id, title: post.title, tags: post.tags };
};

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.save()
    .then(result => {
      res.json({ message: 'Post created!' });
    })
    .catch(error => {
      res.json({ error });
    });
};
export const getPosts = (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      console.log(err);
    }
    res.json(cleanPosts(posts));
  });
};
export const getPost = (req, res) => {
  Post.findById(req.params.id, (err, dirtyPost) => {
    if (err) {
      console.log(err);
    } else {
      res.json(cleanPost(dirtyPost));
    }
  });
};
export const deletePost = (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err, delPost) => {
    if (err) {
      console.log(err);
    } else {
      res.send('Post deleted!');
    }
  });
};
export const updatePost = (req, res) => {
  Post.findByIdAndUpdate(req.params.id,
      { title: req.body.title,
        tags: req.body.tags,
        content: req.body.content,
      }, (err, updatedPost) => {
        if (err) {
          console.log(err);
        } else {
          res.send('Post updated!');
        }
      });
};
