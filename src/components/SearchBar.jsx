import React, { useState } from "react";
import { Input } from "@chakra-ui/react";

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return <Input value={searchQuery} onChange={handleSearch} placeholder="Search..." mb={4} />;
}
