import {Post} from '../../models/blog.js';
//import Comment from '../../models/Comment.js';
//import User from '../models/User.js';
//import {tags} from '../../models/tags.js';

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
      //.populate('comments')
      .sort({ createdAt: -1 }); // Sort by creation date in descending order
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving posts', error });
  }
};


// Get a single blog post by ID
export const getPostById = async (req, res) => {
    try {
      //const { postId } = req.params;
      const post = await Post.findById(req.params.postId);
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
    console.log(`Tag received: ${req.params.tag}`);
    const tagName = req.params.tag;
    const posts = await Post.find({ tags: tagName });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error retrieving posts by tag', error });
  }
};

// Search posts by title or content
export const searchPosts = async (req, res) => {
  try {
    const query = req.query.query;
    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
      ],
    }).populate('author', 'name email');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error searching posts', error });
  }
};
