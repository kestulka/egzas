import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import React, { useState, useEffect } from "react";
import styles from "./CreateCategory.module.css";
import {
  TextInput,
  Button,
  Container,
  Title,
  Text,
  Box,
  Paper,
  List,
  Divider,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
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
          throw new Error(response.statusText);
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
      const response = await fetch("http://localhost:5000/api/categories/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Category created successfully");
        navigate("/");
      } else {
        setMessage(`Category creation failed: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Category creation failed: ${error.message}`);
    }
  };

  return (
    <>
      <Header user={user} />
      <Container>
        <Title mt={200}>Create Category</Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Box mb="md">
            <Title order={4}>Existing Categories: </Title>
            <List>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <List.Item key={category._id}>{category.name}</List.Item>
                ))
              ) : (
                <Text>No categories are present</Text>
              )}
            </List>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Button type="submit" mt="xl" fullWidth>
              Create Category
            </Button>
          </form>
          {message && (
            <Box mt="md">
              <Text color={message.includes("sucessfully") ? "green" : "red"}>
                {message}
              </Text>
            </Box>
          )}
        </Paper>
      </Container>
      <Divider className={styles.divider} mt="md" />
      <Footer />
    </>
  );
};

export default CreateCategory;
