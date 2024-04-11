import React, { useState } from "react";
import { Box, Heading, Input, Button, Checkbox, Text } from "@chakra-ui/react";

const TransactionTodoList = ({ searchQuery }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const filteredTodos = todos.filter((todo) => todo.text.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const handleToggleTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Box bg="gray.200" p={4} mb={4}>
      <Heading as="h3" size="md" mb={2}>
        Transaction Todo List
      </Heading>
      <Box display="flex" mb={2}>
        <Input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Enter a new todo" mr={2} />
        <Button onClick={handleAddTodo}>Add</Button>
      </Box>
      {filteredTodos.map((todo) => (
        <Box key={todo.id} display="flex" alignItems="center">
          <Checkbox isChecked={todo.completed} onChange={() => handleToggleTodo(todo.id)} mr={2} />
          <Text textDecoration={todo.completed ? "line-through" : "none"}>{todo.text}</Text>
          <Button size="xs" onClick={() => handleDeleteTodo(todo.id)} ml={2}>
            Delete
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default TransactionTodoList;
