/** @format */

import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  Divider,
  Center,
  Box,
  Burger,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import classes from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = ({ user, onCategorySelect }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  // Fetch categories from the backend
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
          console.error("Error fetching categories:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error.message);
      }
    };

    fetchCategories();
  }, []);

  const links = categories.map((category) => (
    <UnstyledButton
      className={classes.subLink}
      key={category._id}
      onClick={() => onCategorySelect(category._id)}
    >
      <Text size="sm" fw={500}>
        {category.name}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Box pb={40} mt={20}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group h="100%" gap={0} visibleFrom="sm">
            <a className={classes.link} href="" onClick={() => navigate("/")}>
              Home
            </a>
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Categories
                    </Box>
                    <IconChevronDown
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.blue[6]}
                    />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Categories</Text>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={1} spacing={0}>
                  {links}
                </SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>

          {user && (
            <>
              {user.role === "user" && (
                <>
                  <a
                    href=""
                    className={classes.link}
                    onClick={() => navigate("/favoriteAds")}
                  >
                    Favorite Ads
                  </a>
                  <a
                    href=""
                    className={classes.link}
                    onClick={() => navigate("/myAds")}
                  >
                    My ads
                  </a>
                  <a
                    href=""
                    className={classes.link}
                    onClick={() => navigate("/createAd")}
                  >
                    Upload new ad
                  </a>
                </>
              )}
              {user.role === "admin" && (
                <>
                  <a
                    href=""
                    className={classes.link}
                    onClick={() => navigate("/createCategory")}
                  >
                    Add new category
                  </a>
                  <a
                    href=""
                    className={classes.link}
                    onClick={() => navigate("/blockAdPage")}
                  >
                    Block ad
                  </a>
                  <a
                    href=""
                    className={classes.link}
                    onClick={() => navigate("/blockUserPage")}
                  >
                    Block user
                  </a>
                </>
              )}
            </>
          )}

          <Group visibleFrom="sm">
            {user ? (
              <Button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  navigate("/login");
                }}
                variant="default"
              >
                Log out
              </Button>
            ) : (
              <>
                <Button onClick={() => navigate("/login")} variant="default">
                  Log in
                </Button>
                <Button onClick={() => navigate("/register")}>Register</Button>
              </>
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
        <Divider className={classes.divider} mt="md" /> {}
      </header>
    </Box>
  );
};

export default Header;
