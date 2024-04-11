import React from "react";
import { Box, Heading, Text, UnorderedList, ListItem } from "@chakra-ui/react";

const TransactionList = () => {
  const transactions = [
    { id: 1, description: "Groceries", amount: -50 },
    { id: 2, description: "Salary", amount: 2000 },
    { id: 3, description: "Rent", amount: -1000 },
  ];

  const totalBudget = transactions.reduce((total, transaction) => total + transaction.amount, 0);

  return (
    <Box bg="gray.100" p={4} mt={8}>
      <Heading as="h2" size="lg" mb={4}>
        Transactions
      </Heading>
      <Text fontWeight="bold" mb={2}>
        Total Budget: ${totalBudget}
      </Text>
      <UnorderedList>
        {transactions.map((transaction) => (
          <ListItem key={transaction.id}>
            <Text color={transaction.amount >= 0 ? "green.500" : "red.500"}>
              {transaction.description}: ${transaction.amount}
            </Text>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default TransactionList;