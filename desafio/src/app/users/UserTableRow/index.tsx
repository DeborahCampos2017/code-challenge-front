import { HStack, IconButton, Td, Tr } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { User } from "../types";

interface UserTableRowProps {
  user: User;
  index: number;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export const UserTableRow = ({
  user,
  index,
  onEdit,
  onDelete
}: UserTableRowProps) => {

  return (
    <Tr bg={index % 2 === 0 ? "white" : "gray.50"} _hover={{ bg: "gray.100" }}>
      <Td>{user.full_name}</Td>
      <Td>{user.email}</Td>
      <Td>{user.phone}</Td>
      <Td>{user.city}</Td>
      <Td>{user.state}</Td>
      <Td>
        <HStack spacing={2}>
          <IconButton
            aria-label="Editar usuário"
            icon={<EditIcon />}
            size="sm"
            colorScheme="blue"
            variant="ghost"
            onClick={() => onEdit(user)}
            _hover={{ bg: "blue.100" }}
          />
          <IconButton
            aria-label="Excluir usuário"
            icon={<DeleteIcon />}
            size="sm"
            colorScheme="red"
            variant="ghost"
            onClick={() => onDelete(user)}
            _hover={{ bg: "red.100" }}
          />
        </HStack>
      </Td>
    </Tr>
  );
};
