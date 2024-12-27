import React, { useState } from "react";
import axios from "axios";

const AddDetails = () => {
  const [categoryName, setCategoryName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [modelName, setModelName] = useState("");
  const [engineName, setEngineName] = useState("");
  const [generationName, setGenerationName] = useState("");
  const [ecuName, setEcuName] = useState("");
  const [tuningName, setTuningName] = useState("");
  const [message, setMessage] = useState("");

  // Generic handler for submitting data
  const handleSubmit = async (apiUrl, data, setSuccessMessage) => {
    try {
      const response = await axios.post(apiUrl, data);
      setMessage(`${setSuccessMessage}: ${response.data.message}`);
    } catch (error) {
      console.error(error);
      if (error.response) {
        setMessage(error.response.data.message || "An error occurred.");
      } else {
        setMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="container section-padding mt-5">
      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}
      <div className="row gy-4">
        {/* Category */}
        <div className="col-lg-4 col-md-6">
          <label>Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="form-control"
            placeholder="Enter category name"
          />
          <button
            onClick={() =>
              handleSubmit(
                "http://127.0.0.1:8000/api/new-categorie",
                { category_name: categoryName },
                "Category Added"
              )
            }
            className="btn btn-secondary mt-2 w-100"
          >
            Add Category
          </button>
        </div>

        {/* Brand */}
        <div className="col-lg-4 col-md-6">
          <label>Brand Name</label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="form-control"
            placeholder="Enter brand name"
          />
          <button
            onClick={() =>
              handleSubmit(
                "http://127.0.0.1:8000/api/new-brand",
                { brand_name: brandName },
                "Brand Added"
              )
            }
            className="btn btn-secondary mt-2 w-100"
          >
            Add Brand
          </button>
        </div>

        {/* Model */}
        <div className="col-lg-4 col-md-6">
          <label>Model Name</label>
          <input
            type="text"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            className="form-control"
            placeholder="Enter model name"
          />
          <button
            onClick={() =>
              handleSubmit(
                "http://127.0.0.1:8000/api/new-model",
                { model_name: modelName },
                "Model Added"
              )
            }
            className="btn btn-secondary mt-2 w-100"
          >
            Add Model
          </button>
        </div>

        {/* Engine */}
        <div className="col-lg-4 col-md-6">
          <label>Engine Name</label>
          <input
            type="text"
            value={engineName}
            onChange={(e) => setEngineName(e.target.value)}
            className="form-control"
            placeholder="Enter engine name"
          />
          <button
            onClick={() =>
              handleSubmit(
                "http://127.0.0.1:8000/api/new-engine",
                { engine_name: engineName },
                "Engine Added"
              )
            }
            className="btn btn-danger mt-2 w-100"
          >
            Add Engine
          </button>
        </div>

        {/* Generation */}
        <div className="col-lg-4 col-md-6">
          <label>Generation Name</label>
          <input
            type="text"
            value={generationName}
            onChange={(e) => setGenerationName(e.target.value)}
            className="form-control"
            placeholder="Enter generation name"
          />
          <button
            onClick={() =>
              handleSubmit(
                "http://127.0.0.1:8000/api/new-generation",
                { generation_name: generationName },
                "Generation Added"
              )
            }
            className="btn btn-danger mt-2 w-100"
          >
            Add Generation
          </button>
        </div>

        {/* ECU */}
        <div className="col-lg-4 col-md-6">
          <label>ECU Name</label>
          <input
            type="text"
            value={ecuName}
            onChange={(e) => setEcuName(e.target.value)}
            className="form-control"
            placeholder="Enter ECU name"
          />
          <button
            onClick={() =>
              handleSubmit(
                "http://127.0.0.1:8000/api/new-ecu",
                { ecu_name: ecuName },
                "ECU Added"
              )
            }
            className="btn btn-danger mt-2 w-100"
          >
            Add ECU
          </button>
        </div>

        {/* Tuning */}
        <div className="col-lg-4 col-md-6">
          <label>Tuning Name</label>
          <input
            type="text"
            value={tuningName}
            onChange={(e) => setTuningName(e.target.value)}
            className="form-control"
            placeholder="Enter tuning name"
          />
          <button
            onClick={() =>
              handleSubmit(
                "http://127.0.0.1:8000/api/new-tuning",
                { tuning_name: tuningName },
                "Tuning Added"
              )
            }
            className="btn btn-dark mt-2 w-100"
          >
            Add Tuning
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDetails;
