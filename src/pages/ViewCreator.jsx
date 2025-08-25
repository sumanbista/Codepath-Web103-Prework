import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ViewCreator.css";

const ViewCreator = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreators = async () => {
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
          setCreator(data);
        }
      } catch (error) {
        console.error("Error fetching creator:", error.message);
        setCreator(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCreators();
  }, [id]);

  const handleDelete = async () => {
    try {
      const { error } = await supabase.from("creators").delete().eq("id", id);

      if (error) {
        throw error;
      }
      console.log("Creator deleted successfully.");
      navigate("/");
    } catch (error) {
      console.error("Error deleting creator:", error.message);
    }
  };

  if (loading) {
    return <p>Fetching creator details.....</p>;
  }

  if (!creator) {
    return <p>Creator not found.</p>;
  }

  return (
    <article className="view-creator-card">
      {creator.imageURL && (
        <img
          src={creator.imageURL}
          alt={`Image of ${creator.name}`}
          className="view-creator-image"
        />
      )}
      <div className="view-creator-details">
        <h2>{creator.name}</h2>
        <p>{creator.description}</p>
        <a
          href={creator.url}
          target="_blank"
          rel="noopener noreferrer"
          className="channel-link"
        >
          Visit {creator.name}'s Channel
        </a>

        <div className="view-creator-actions">
          <Link to={`/edit/${creator.id}`}>
            <button>Edit Creator</button>
          </Link>
          <button onClick={handleDelete} className="delete-button">
            Delete Creator
          </button>
        </div>
      </div>
    </article>
  );
};

export default ViewCreator;