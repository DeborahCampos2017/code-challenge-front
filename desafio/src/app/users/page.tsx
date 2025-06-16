'use client'

import {
  Box,
  Container,
  Heading,
  VStack,
  Button,
  Flex,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';

const UsersPage = () => {
  const router = useRouter();

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Flex align="center">
          <Box>
            <Heading size="lg" color="gray.800">
              Gerenciamento de Usuários
            </Heading>
            <Text color="gray.600" mt={1}>
              Gerencie todos os usuários do sistema
            </Text>
          </Box>
          <Spacer />
          <Button
            leftIcon={<AddIcon />}
            colorScheme="blue"
            size="md"
            onClick={() => router.push('/')}
          >
            Novo Usuário
          </Button>
        </Flex>
      </VStack>
    </Container>
  );
}

export default UsersPage;
