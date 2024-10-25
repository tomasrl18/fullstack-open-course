import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog,
      );
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { setBlogs, addBlog, updateBlog, deleteBlog } = blogSlice.actions;

export const fetchBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
};

export const createBlog = (blog) => async (dispatch) => {
  const newBlog = await blogService.create(blog);
  dispatch(addBlog(newBlog));
};

export const likeBlog = (id) => async (dispatch, getState) => {
  const blog = getState().blogs.find((b) => b.id === id);
  const updatedBlog = { ...blog, likes: blog.likes + 1 };
  const response = await blogService.update(id, updatedBlog);
  dispatch(updateBlog(response));
};

export const removeBlog = (id) => async (dispatch) => {
  await blogService.destroy(id);
  dispatch(deleteBlog(id));
};

export default blogSlice.reducer;
