"use client";

import { useState, useEffect } from "react";
import Profile from "@components/Profile";
import { useRouter } from "next/navigation";

const MyProfile = (props) => {
  const [posts, setPosts] = useState([]);
  const userId = props.params.id;
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();

      setPosts(data);
    };
    if (userId) {
      fetchPosts();
    }
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filtedPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filtedPosts);
      } catch (error) {
        console.error(error);
      }
    }
  };


  const username = props.searchParams.name;

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username}'s personalize profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
