import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import CategoryService from "./cateogryService";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [toastMessage, setToastMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, [searchQuery]);

    const fetchCategories = async () => {
        try {
            const response = await CategoryService.getCategories();
            let filteredCategories = response.data;
             console.log(filteredCategories)
            if (searchQuery) {
                filteredCategories = response.data.filter((category) =>
                    category.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }
 
            setCategories(filteredCategories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            await CategoryService.deleteCategory(deleteId);
            setShowModal(false);
            fetchCategories();
            setToastMessage("Category deleted successfully!");
            setTimeout(() => setToastMessage(""), 3000);
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Categories</h2>
                <div>
                    <input
                        type="text"
                        className="form-control d-inline-block me-2"
                        placeholder="Search categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ width: "300px" }}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("./category-detail/new")}

                    >
                        New
                    </button>
                </div>
            </div>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Category Name</th>
                        <th>Description</th>
                        <th>Code</th>
                        <th>AvailableStatus</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>{category.code}</td>
                            <td>{category.availableStatus}</td>
                            <td>
                                <Link to={`./category-detail/${category.id}`}>
                                    <FaEdit className="me-3 text-primary" />
                                </Link>
                            
                                <FaTrash
                                    className="text-danger"
                                    onClick={() => handleDeleteClick(category.id)}
                                />
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

            {showModal && (
                <div className="modal show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this category?
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button className="btn btn-danger" onClick={confirmDelete}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categories;
