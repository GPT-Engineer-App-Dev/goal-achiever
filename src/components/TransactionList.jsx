import React from "react";
import { Box, UnorderedList, ListItem, Text } from "@chakra-ui/react";

const TransactionList = () => {
  const transactions = [
    { id: 1, description: "Groceries", amount: -50 },
    { id: 2, description: "Salary", amount: 2000 },
    { id: 3, description: "Rent", amount: -1000 },
  ];

  const totalBudget = transactions.reduce((total, transaction) => total + transaction.amount, 0);

  return (
    <Box mt={8}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Total Budget: ${totalBudget}
      </Text>
      <UnorderedList>
        {transactions.map((transaction) => (
          <ListItem key={transaction.id}>
            {transaction.description}:
            <Text as="span" color={transaction.amount >= 0 ? "green.500" : "red.500"}>
              ${transaction.amount}
            </Text>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default TransactionList;
