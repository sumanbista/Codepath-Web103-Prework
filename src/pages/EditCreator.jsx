import React, { useState } from "react";
import { useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const { data, error } = await supabase
          .from("creators")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }
        if (data) {
          setFormData({
            name: data.name,
            url: data.url,
            description: data.description,
            imageURL: data.imageURL,
          });
        }
      } catch (error) {
        console.error("Error fetching creator:", error.message);

      } finally {
        setLoading(false);
      }
    };
    fetchCreator();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from("creators")
        .update(formData)
        .eq("id", id);

      if (error) {
        throw error;
      }

      console.log("Creator updated successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error updating creator:", error.message);
    }
  };

  if (loading) {
    return <p>Loading creator details.....</p>;
  }

  return (
    <div>
      <h2>Add a New Creator</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="imageURL">Image</label>
          <input
            type="text"
            id="imageURL"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <h3>Social Media Links</h3>
        <div>
          <div>
            <label htmlFor="url">Youtube</label>
            <input
              type="text"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit">Update Creator</button>
      </form>
    </div>
  );
};

export default EditCreator;
