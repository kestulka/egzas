// CommentsButton.jsx
import React, { useState, useEffect } from "react";
import { Button } from "@mantine/core";
import { AiOutlineComment } from "react-icons/ai";
import { useDisclosure } from "@mantine/hooks";
import CommentsModal from "../CommentsModal/CommentsModal";

export default function CommentButton({ adId }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    fetchCommentsCount();
  }, []);

  const fetchCommentsCount = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/comments/ad/${adId}`,
      );
      if (response.ok) {
        const data = await response.json();
        const commentsCount = data.comments.length;
        setCommentsCount(commentsCount);
      } else {
        console.error("Failed to fetch comments count");
      }
    } catch (error) {
      console.error(`Failed to fetch comments count: ${error.message}`);
    }
  };

  const handleNewComment = () => {
    fetchCommentsCount(); // Re-fetch the comments count when new comment is added by the user
  };

  return (
    <>
      <Button
        onClick={open}
        size="sm"
        variant="outline"
        color="darkgray"
        rightSection={<AiOutlineComment />}
      >
        {commentsCount}
      </Button>
      <CommentsModal
        adId={adId}
        opened={opened}
        close={close}
        onNewComment={handleNewComment}
      />
    </>
  );
}
