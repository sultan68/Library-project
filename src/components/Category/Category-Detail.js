import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CategoryService from "./cateogryService";

const CategoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
//   const [category, setCategory] = useState({""});
  const [category, setCategory] = useState({
    name: "",
    description: "",
    code: "",
    availableStatus: "",
  });

  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (id) {
      fetchCategoryDetails();
    }
  }, [id]);

  const fetchCategoryDetails = async () => {
    try {
      const response = await CategoryService.getCategoryById(id);
      console.log(response.data)
      setCategory({ name: response.data[0].name,
        description: response.data[0].description,
        code: response.data[0].code,
        availableStatus: response.data[0].availableStatus,

      });
    } catch (error) {
      console.error("Error fetching category details:", error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCategory((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    try {
      if (id) {
        await CategoryService.updateCategory(id, category);
        setToastMessage("Category updated successfully!");
      } else {
        await CategoryService.createCategory(category);
        setToastMessage("Category added successfully!");
        navigate("/categories");
      }
      setTimeout(() => setToastMessage(""), 3000);
 
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  return (
    <div>
      <h2>{id ? "Edit Category" : "New Category"}</h2>
      <div className="mb-3">
        <label>Category Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={category.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label>Category Description</label>
        <textarea
          className="form-control"
          name="description"
          value={category.description}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="mb-3">
        <label>Category Code</label>
        <input
          type="text"
          className="form-control"
          name="code"
          value={category.code}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label>Availability Status</label>
        <select
          className="form-select"
          name="availableStatus"
          value={category.availableStatus}
          onChange={handleInputChange}
        >
          <option value="Available">Available</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>
      <button
        className="btn btn-secondary ms-2"
        onClick={() => navigate("/categories")}
      >
        Cancel
      </button>
         {/* Toast Notification */}
         {toastMessage && (
        <div className="position-fixed top-0 end-0" style={{ zIndex: 5 ,paddingTop:"4.5rem"}}>
          <div className="toast show bg-success text-white">
            <div className="toast-body">{toastMessage}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDetail;
