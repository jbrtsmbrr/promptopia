"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PrompCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/prompt", {
        method: "POST",
        body: JSON.stringify({ keyword: searchText }),
      });
      const data = await response.json();
      setPosts(data);
    })();
  }, [searchText]);

  const handleSearchChange = async (e) => {
    e.persist();
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleTagClick = (tag) => {
    setSearchText(tag);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PrompCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
