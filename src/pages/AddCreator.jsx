import React ,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";

const AddCreator = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("creators").insert([formData]);

    if (error) {
      console.error("Error adding creator", error.message);
    } else {
      console.log("Creator Added Successfully !!");
      navigate("/");
    }
  };
  return (
    <div>
      <h2>Add a New Creator</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCreator;
