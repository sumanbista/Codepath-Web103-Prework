import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import CreatorCard from "../components/CreatorCard";

const ShowCreator = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data, error } = await supabase.from("creators").select("*");

        if (error) {
          throw error;
        }
        setCreators(data);
      } catch (error) {
        console.error("Error fetching creators:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCreators();
  }, []);

  if (loading) {
    return <p>Fetching Creators....</p>;
  }
  console.log(creators)
  return (
    <>
      <div>
        <h2>All Content Creators</h2>
        {creators.length === 0 ? (
          <p>No Creators have been added.</p>
        ) : (
          creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))
        )}
      </div>
    </>
  );
};

export default ShowCreator;
