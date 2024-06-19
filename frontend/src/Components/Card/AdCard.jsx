/** @format */

import React from "react";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import { AiFillDollarCircle } from "react-icons/ai";
import CommentButton from "../Buttons/CommentButton";
import FavoriteButton from "../Buttons/FavoriteButton";

const AdCard = ({ ad, onBlock }) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ height: "350px", width: "100%" }}
    >
      <Card.Section>
        <Image
          src={ad.image}
          alt="<ad_picture_missing>"
          height={200}
          width={250}
          style={{ objectFit: "fill" }}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>
          <AiFillDollarCircle /> {ad.price} &#8364;
        </Text>
        <Badge color="pink">{ad.category_id.name}</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {ad.description}
      </Text>

      <Group position="apart" mt="md">
        <FavoriteButton buttonText={"Favorite"} adId={ad._id} />
        <CommentButton adId={ad._id} />
        {onBlock && <Button onClick={() => onBlock(ad._id)}>Block</Button>}
      </Group>
    </Card>
  );
};

export default AdCard;
