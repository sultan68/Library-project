import axios from "axios";

const BASE_URL = "http://localhost:3001/categories";

const CategoryService = {
  getCategories: () => axios.get(BASE_URL),
  deleteCategory: (id) => axios.delete(`${BASE_URL}/${id}`),
  getCategoryById: (id) => axios.get(`${BASE_URL}?id=${id}`),
  createCategory: async (categoryData) => {
    const response = await axios.get(BASE_URL);
    const categories = response.data;
    const lastId = categories.length ? Math.max(...categories.map(cat => parseInt(cat.id))) : 0;
    const newId = lastId + 1; // Generate the next available ID
    const newCategory = { ...categoryData, id: newId };
    return axios.post(BASE_URL, newCategory);
  },

  updateCategory: (id, categoryData) => axios.put(`${BASE_URL}/${id}`, categoryData),


};


export default CategoryService;
