import { Post } from '../../models/blog.js';
import { Comment } from '../../models/comment.js';

// Create a new blog post
export const createPost = async (req, res) => {
  try {
    const { title, content, tags, author } = req.body;
    const post = new Post({
      title,
      content,
      tags,
      author,
    });
    await post.save();
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
};

// Get all blog posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name email').populate('comments');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving posts', error });
  }
};

// Get all blog posts by a specific user
export const getAllPostsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({ author: userId })
      .populate('author', 'name email')
      .populate('comments')
      .sort({ createdAt: -1 }); // Sort by creation date in descending order
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving posts', error });
  }
};

// Get a single blog post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate('author', 'name email').populate('comments');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error('Error retrieving post:', error);
    res.status(500).json({ message: 'Error retrieving post', error });
  }
};

// Update a blog post by ID
export const updatePost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.postId,
      { title, content, tags, updatedAt: Date.now() },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json({ message: 'Post updated successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error });
  }
};

// Delete a blog post by ID
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
};

// Get posts by tag
export const getPostsByTag = async (req, res) => {
  try {
    const tagName = req.params.tag;
    const posts = await Post.find({ tags: tagName }).populate('author', 'name email').populate('comments');
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error retrieving posts by tag', error });
  }
};

// Search posts by title or content
// controllers/postController.js



// Search posts by title or content
export const searchPosts = async (req, res) => {
  try {
    const query = req.query.q; // Extract query from request query string
    if (!query) {
      return res.status(400).json({ message: 'Query parameter (q) is required' });
    }

    // Perform case-insensitive search on title or content
    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: 'i' } }, // Case-insensitive search for title
        { content: { $regex: query, $options: 'i' } }, // Case-insensitive search for content
      ],
    }).populate('author', 'name email'); // Example: Populate author field if necessary

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error searching posts:', error);
    res.status(500).json({ message: 'Error searching posts', error });
  }
};

// Like a post
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.likes += 1;
    await post.save();
    res.status(200).json({ message: 'Post liked successfully', likes: post.likes });
  } catch (error) {
    res.status(500).json({ message: 'Error liking post', error });
  }
};

// Add a comment to a post
export const addComment = async (req, res) => {
  try {
    const { content, author } = req.body;
    const post = req.params.postId;

    const comment = new Comment({
      content,
      author,
      post,
    });
    await comment.save();

    const postToUpdate = await Post.findById(post);
    if (!postToUpdate) {
      return res.status(404).json({ message: 'Post not found' });
    }
    postToUpdate.comments.push(comment._id);
    await postToUpdate.save();

    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
};
