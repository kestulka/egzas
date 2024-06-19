import React, { useEffect, useState } from "react";
import Header from "../Header/Header"; // norint importinti user specific headeri, reikia eiluciu: 16, 45, 99.
import AdCard from "../Card/AdCard";
import { Container, Title, Divider, TextInput, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import styles from "./UserAdsList.module.css";
import EditAdModal from "./EditAdModal";

const UserAdsList = () => {
  const [ads, setAds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingAd, setEditingAd] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUserAds = async () => {
      const token = localStorage.getItem("token");
      const userId = user ? user._id : null;

      try {
        const response = await fetch(
          `http://localhost:5000/api/ads/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setAds(data.ads);
        } else {
          console.error("Failed to fetch user ads", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user ads:", error);
      }
    };
    fetchUserAds();
  }, [user]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSave = async (updatedAd) => {
    setAds((prevAds) =>
      prevAds.map((ad) => (ad._id === updatedAd._id ? updatedAd : ad)),
    );

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/api/ads/${updatedAd._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedAd),
        },
      );
      if (!response.ok) {
        console.error("Failed to update ad:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating ad:", error);
    }
  };

  const handleEdit = (ad) => {
    setEditingAd(ad);
    setShowEditModal(true);
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setEditingAd(null);
  };

  const handleConfirmEdit = (updatedAd) => {
    handleSave(updatedAd);
    handleModalClose();
  };

  const filteredAds = ads.filter((ad) =>
    ad.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <Header user={user} />
      <Container fluid>
        <Title align="center" mb="lg">
          My Ads
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
                <AdCard ad={ad} onSave={handleSave} />
                <Button onClick={() => handleEdit(ad)} variant="outline">
                  Edit
                </Button>
              </div>
            ))
          ) : (
            <p>No ads found</p>
          )}
        </div>
        <Divider className={styles.divider} mt="md" />
        {showEditModal && editingAd && (
          <EditAdModal
            ad={editingAd}
            onSave={handleSave}
            onClose={handleModalClose}
            onConfirmEdit={handleConfirmEdit}
            showEditModal={showEditModal}
          />
        )}
      </Container>
    </>
  );
};

export default UserAdsList;
