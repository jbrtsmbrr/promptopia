"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Profile from "@components/Profile";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user?.id) {
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

  return (
    <Profile
      name={`${session?.user?.id ? "My" : "404"}`}
      desc={`${
        session?.user?.id
          ? "Welcome to your personalized profile page"
          : "Profile not found."
      }`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
