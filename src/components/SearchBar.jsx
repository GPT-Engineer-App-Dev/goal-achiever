import React from "react";
import { Input } from "@chakra-ui/react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." mb={4} />;
};

export default SearchBar;
