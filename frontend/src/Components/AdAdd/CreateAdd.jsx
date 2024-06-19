import Header from "../Header/Header";
import React, { useState, useEffect } from "react";
import {
  TextInput,
  Button,
  Container,
  Title,
  Text,
  Box,
  Paper,
  Select,
} from "@mantine/core";
import styles from "./CreateAdd.module.css";
import classes from "./CreateAdd.module.css";
import { useNavigate } from "react-router-dom";

const CreateAd = () => {
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories);
        } else {
          console.error("error fetching categories:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error.message);
      }
    };

    fetchCategories();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/ads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          image,
          price,
          description,
          categoryId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Ad created successfully");
        navigate("/myAds");
      } else {
        setMessage(`Ad creation failed: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Ad creation failed: ${error.message}`);
    }
  };

  return (
    <>
      <Header user={user} />
      <Container>
        <Title mt={200}>Create Ad</Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
            <TextInput
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <TextInput
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Select
              label="Category"
              placeholder="Select a category"
              data={categories.map((category) => ({
                value: category._id,
                label: category.name,
              }))}
              value={categoryId}
              onChange={setCategoryId}
              required
            />
            <Button type="submit" mt="xl" fullWidth>
              Create Ad
            </Button>
          </form>
          {message && (
            <Box mt="md">
              <Text color={message.includes("sucesfully") ? "green" : "red"}>
                {message}
              </Text>
            </Box>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default CreateAd;
