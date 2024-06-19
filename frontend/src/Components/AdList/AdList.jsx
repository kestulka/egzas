import React, { useEffect, useState } from "react";
import AdCard from "../Card/AdCard";
import { Container, Title, Divider, TextInput } from "@mantine/core";
import styles from "./AdList.module.css";

const AdsList = ({ selectedCategory }) => {
  const [ads, setAds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/ads/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAds(data.ads);
        } else {
          console.error("Failed to fetch ads", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
        setError(error.message);
      }
    };

    fetchAds();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredAds = ads.filter((ad) => {
    const matchesSearchQuery = ad.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? String(ad.category_id._id) === String(selectedCategory)
      : true;
    return matchesSearchQuery && matchesCategory;
  });

  return (
    <Container fluid>
      <Title align="center" mb="lg">
        All ads
      </Title>
      <TextInput
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className={styles.search}
      />
      <div className={styles.adsList}>
        {filteredAds.length > 0 ? (
          filteredAds.map((ad) => (
            <div key={ad._id}>
              <AdCard ad={ad} />
            </div>
          ))
        ) : (
          <p>No ads found</p>
        )}
      </div>
      <Divider className={styles.divider} mt="md" />
    </Container>
  );
};

export default AdsList;
