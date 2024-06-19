import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AdCard from "../Card/AdCard";
import styles from "./BlockAdPage.module.css";
import {
  Container,
  Title,
  Card,
  Button,
  Modal,
  Group,
  Text,
  TextInput,
  Divider,
} from "@mantine/core"; // Import Mantine components

const BlockAdPage = () => {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchAds();
  }, [user]);

  const fetchAds = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/ads", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAds(data.ads);
    } catch (error) {
      console.error("Error fetching ads:", error);
      setError("Error fetching ads.");
    }
  };

  const handleBlockAd = async () => {
    if (!selectedAd) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/ads/${selectedAd}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setAds((prevAds) => prevAds.filter((ad) => ad._id !== selectedAd));
      setModalOpened(false);
      setSelectedAd(null);
    } catch (error) {
      console.error("Error blocking ad:", error);
      setError("Error blocking ad.");
    }
  };

  const openModal = (adId) => {
    setSelectedAd(adId);
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
    setSelectedAd(null);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredAds = ads.filter((ad) =>
    ad.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <Header user={user} />
      <Container fluid>
        <Title align="center" mb="lg">
          Block Ads{" "}
        </Title>
        <TextInput
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className={styles.search}
        />
        {error && <p>{error}</p>}
        <div className={styles.adsList}>
          {filteredAds.length === 0 ? (
            <p>No ads available</p>
          ) : (
            filteredAds.map((ad) => (
              <Card key={ad._id} shadow="sm" padding="lg">
                <AdCard ad={ad} />
                <Button color="red" onClick={() => openModal(ad._id)}>
                  Block
                </Button>
              </Card>
            ))
          )}
        </div>

        <Divider className={styles.divider} mt="md" />
        <Footer />
        <Modal opened={modalOpened} onClose={closeModal} title="Confirm Block">
          <Text>Are you sure you want to block this ad?</Text>
          <Group position="apart" mt="md">
            <Button variant="default" onClick={closeModal}>
              Cancel
            </Button>
            <Button color="red" onClick={handleBlockAd}>
              Block
            </Button>
          </Group>
        </Modal>
      </Container>
    </>
  );
};

export default BlockAdPage;
