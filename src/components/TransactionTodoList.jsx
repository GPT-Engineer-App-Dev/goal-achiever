import React, { useState } from "react";
import { Box, Input, Button, Flex, Checkbox, Text, IconButton, VStack, StackDivider, HStack, Spacer } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const TransactionTodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    const trimmedTodo = newTodo.trim();
    if (trimmedTodo !== "") {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <Box mb={8}>
      <Flex mb={4}>
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTodo();
            }
          }}
          placeholder="Enter a new transaction todo"
          mr={4}
        />
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddTodo}>
          Add
        </Button>
      </Flex>
      <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
        {todos.map((todo, index) => (
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
    </Box>
  );
};

export default TransactionTodoList;
