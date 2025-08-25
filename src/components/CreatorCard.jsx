import React from 'react';
import { Link } from 'react-router-dom';
import "./CreatorCard.css";

const CreatorCard = ({ creator }) => {
  return (
    <article className="creator-card-container">
      <div className="creator-image-container">
        {creator.imageURL && (
          <img
            src={creator.imageURL}
            alt={`Image of ${creator.name}`}
            className="creator-image"
          />
        )}
      </div>

      <div className="creator-details">
        <h3>{creator.name}</h3>
        <p>
          <a href={creator.url} target="_blank" rel="noopener noreferrer">
            My Channel
          </a>
        </p>
        <p>{creator.description}</p>
        <div className="button-container">
          <Link to={`/edit/${creator.id}`}>
            <button className="creator-button">Edit</button>
          </Link>
          <Link to={`/view/${creator.id}`}>
            <button className="creator-button">View</button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CreatorCard;