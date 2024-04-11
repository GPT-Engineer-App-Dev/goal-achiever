import React, { useState, useEffect } from "react";
import { Box, Heading, Input, Button, Flex, Checkbox, Text, IconButton, VStack, StackDivider, HStack, Spacer, UnorderedList, ListItem } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";
import TransactionList from "./TransactionList";
import SearchBar from "../components/SearchBar";

export default function IndexPage() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [cities, setCities] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      const response = await fetch("https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json");
      const data = await response.json();
      const sortedCities = data.sort((a, b) => b.population - a.population);
      setCities(sortedCities.slice(0, 20));
      setFilteredCities(sortedCities.slice(0, 20));
    };

    fetchCities();
  }, []);

  const handleSearch = (query) => {
    const filteredTodos = todos.filter((todo) => todo.text.toLowerCase().includes(query.toLowerCase()));
    const filteredCities = cities.filter((city) => city.city.toLowerCase().includes(query.toLowerCase()));

    setFilteredTodos(filteredTodos);
    setFilteredCities(filteredCities);
  };

  const handleAddTodo = () => {
    const trimmedTodo = newTodo.trim();
    if (trimmedTodo !== "") {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setFilteredTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
  };

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Box as="nav" bg="blue.500" py={4}>
        <Box maxWidth="500px" margin="auto">
          <Text color="white" fontWeight="bold">
            My Todo App
          </Text>
        </Box>
      </Box>
      <Box maxWidth="500px" margin="auto" p={4} flex="1">
        <Heading as="h1" size="xl" textAlign="center" mb={8}>
          My Todo List
        </Heading>
        <SearchBar onSearch={handleSearch} />
        <Flex mb={8}>
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTodo();
              }
            }}
            placeholder="Enter a new todo"
            mr={4}
          />
          <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddTodo}>
            Add
          </Button>
        </Flex>
        <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
          {filteredTodos.map((todo, index) => (
            <HStack key={index}>
              <Checkbox isChecked={todo.completed} onChange={() => handleToggleComplete(index)} />
              <Text flex="1" textDecoration={todo.completed ? "line-through" : "none"}>
                {todo.text}
              </Text>
              <Spacer />
              <IconButton icon={<FaTrash />} aria-label="Delete todo" onClick={() => handleDeleteTodo(index)} />
            </HStack>
          ))}
        </VStack>
        <Box bg="gray.100" p={4} mt={8}>
          <Heading as="h2" size="lg" mb={4}>
            Top 20 Cities
          </Heading>
          <UnorderedList>
            {filteredCities.map((city, index) => (
              <ListItem key={index}>{city.city}</ListItem>
            ))}
          </UnorderedList>
        </Box>
        <TransactionList />
      </Box>
      <Box as="footer" bg="gray.100" py={4} mt="auto" width="100%">
        <Text textAlign="center">Created by GPT Engineer</Text>
      </Box>
    </Box>
  );
}
