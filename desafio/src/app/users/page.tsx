"use client";

import { Box, Button, Center, Container, Flex, Heading, Input, InputGroup, InputLeftElement, Select, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useToast, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useUserStore } from "../store/useUsersStore";
import { useFiltersAndSort } from "./Hooks/useFiltersAndSort";
import { usePagination } from "./Hooks/usePagination";
import { useEffect, useState } from "react";
import { User } from "./types";
import { getCurrentPageItems, ITEMS_PER_PAGE_OPTIONS, THEME_COLOR, THEME_COLOR_ACTIVE, THEME_COLOR_HOVER } from "./utils";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { SortableTableHeader } from "./SortableTableHeader";
import { UserTableRow } from "./UserTableRow";
import { PaginationControls } from "./PaginationControls";
import { EditUserModal } from "@/shared/EditUserModal";
import { DeleteUserModal } from "@/shared/DeleteUserModal";

const UsersPage: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  
  const { users, loading, fetchUsers, updateUser, removeUser } = useUserStore();
  const { 
    searchTerm, 
    setSearchTerm, 
    sortField, 
    sortOrder, 
    filteredAndSortedUsers, 
    handleSort 
  } = useFiltersAndSort(users);
  const { pagination, handlePageChange, handleItemsPerPageChange } = usePagination(filteredAndSortedUsers.length);
  
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  const handleEditSuccess = (updatedUser: User) => {
    updateUser(updatedUser);
    setEditingUser(null);
    
    toast({
      title: 'Sucesso',
      description: 'Usuário atualizado com sucesso',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDeleteSuccess = (deletedUserId: number) => {
    removeUser(deletedUserId);
    setDeletingUser(null);
    
    toast({
      title: 'Sucesso',
      description: 'Usuário excluído com sucesso',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const currentPageUsers = getCurrentPageItems(filteredAndSortedUsers, pagination);

  if (loading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Center h="200px">
          <Spinner size="xl" color={THEME_COLOR} />
        </Center>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8} backgroundColor="white" minH={"100vh"}>
      <VStack spacing={6} align="stretch">
        <Flex justify="space-between" align="center">
          <Heading size="lg" color="gray.700">
            Gerenciamento de Usuários
          </Heading>
          
          <Button
            bg={THEME_COLOR}
            color="white"
            _hover={{ bg: THEME_COLOR_HOVER }}
            _active={{ bg: THEME_COLOR_ACTIVE }}
            leftIcon={<AddIcon />}
            onClick={() => router.push('/')}
          >
            Novo Usuário
          </Button>
        </Flex>

        <Box bg="white" p={4} borderRadius="lg" boxShadow="sm">
          <Flex gap={4} wrap="wrap" align="center">
            <InputGroup maxW="300px">
              <InputLeftElement>
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                _focus={{
                  borderColor: THEME_COLOR,
                  boxShadow: `0 0 0 1px ${THEME_COLOR}`
                }}
              />
            </InputGroup>
            <Select
              maxW="150px"
              value={pagination.itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(e.target.value)}
              _focus={{
                borderColor: THEME_COLOR,
                boxShadow: `0 0 0 1px ${THEME_COLOR}`
              }}
            >
              {ITEMS_PER_PAGE_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            <Text fontSize="sm" color="gray.600">
              {pagination.totalItems} usuário(s) encontrado(s)
            </Text>
          </Flex>
        </Box>
        <Box bg="white" borderRadius="lg" boxShadow="sm" overflow="hidden">
          <TableContainer>
            <Table variant="simple">
              <Thead bg={THEME_COLOR}>
                <Tr>
                  <SortableTableHeader
                    field="full_name"
                    label="Nome"
                    currentField={sortField}
                    currentOrder={sortOrder}
                    onClick={handleSort}
                  />
                  <SortableTableHeader
                    field="email"
                    label="Email"
                    currentField={sortField}
                    currentOrder={sortOrder}
                    onClick={handleSort}
                  />
                  <Th color="white">Telefone</Th>
                  <SortableTableHeader
                    field="city"
                    label="Cidade"
                    currentField={sortField}
                    currentOrder={sortOrder}
                    onClick={handleSort}
                  />
                  <SortableTableHeader
                    field="state"
                    label="Estado"
                    currentField={sortField}
                    currentOrder={sortOrder}
                    onClick={handleSort}
                  />
                  <Th color="white">Status</Th>
                  <Th width="120px" color="white">Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentPageUsers.length === 0 ? (
                  <Tr>
                    <Td colSpan={7} textAlign="center" py={8}>
                      <Text color="gray.500">
                        {searchTerm
                          ? 'Nenhum usuário encontrado com os filtros aplicados'
                          : 'Nenhum usuário cadastrado'}
                      </Text>
                    </Td>
                  </Tr>
                ) : (
                  currentPageUsers.map((user, index) => (
                    <UserTableRow
                      key={user.id}
                      user={user}
                      index={index}
                      onEdit={setEditingUser}
                      onDelete={setDeletingUser}
                    />
                  ))
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <PaginationControls
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </VStack>
      {editingUser && (
        <EditUserModal
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          user={editingUser}
          onSuccess={handleEditSuccess}
        />
      )}
      {deletingUser && (
        <DeleteUserModal
          isOpen={!!deletingUser}
          onClose={() => setDeletingUser(null)}
          user={deletingUser}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </Container>
  );
};

export default UsersPage;
