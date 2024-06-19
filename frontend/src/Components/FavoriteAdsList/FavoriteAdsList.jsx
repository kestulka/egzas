import Header from "../Header/Header";

import React, { useEffect, useState } from "react";
import AdCard from "../Card/AdCard";
import { Container, Title, Divider, TextInput } from "@mantine/core";
import styles from "./FavoriteAdsList.module.css";

const FavoriteAdsList = ({ user, setUser }) => {
  const [ads, setAds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoriteAds = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      // checkinam ar gauna token, userid
      const userId = user ? user._id : null;
      console.log("Token:", token);
      console.log("User id:", userId);

      try {
        const response = await fetch(
          `http://localhost:5000/api/ads/favorites/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setAds(data.ads);
        } else {
          console.error("Failed to fetch favorite ads", response.StatusText);
        }
      } catch (error) {
        console.error("Error fetching favorite ads:", error);
        setError(error.message);
      }
    };
    fetchFavoriteAds();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredAds = ads.filter((ad) =>
    ad.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container fluid>
      <Header user={user} setUser={setUser} />
      <Title align="center" mb="lg">
        Favorite Ads
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
              {console.log(ad)}
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

export default FavoriteAdsList;
