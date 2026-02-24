import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";

function InputForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/wishlist", { title, description, url });
      navigate("/read");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to create item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <h1 className="page-title">Add New Topic</h1>
      <p className="page-subtitle">
        Fill out the details below to create a new topic for your collection
      </p>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter topic title"
              id="title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Enter a brief description"
              id="description"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="url">Topic URL</label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="text"
              placeholder="https://example.com"
              id="url"
            />
          </div>
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Adding..." : "+ Add Topic"}
          </button>
          <p className="helper-text">
            This topic will be visible to your team immediately after creation.
          </p>
        </form>
      </div>
    </div>
  );
}

export default InputForm;
