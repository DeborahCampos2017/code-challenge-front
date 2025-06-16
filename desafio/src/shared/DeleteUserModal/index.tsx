import { User } from "@/app/users/types";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
  useToast
} from "@chakra-ui/react";
import { useRef, useState } from "react";

type DeleteUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSuccess: (deletedUserId: number) => void;
}

export const DeleteUserModal = ({
  isOpen,
  onClose,
  user,
  onSuccess
}: DeleteUserModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir usuário');
      }
      await new Promise(resolve => setTimeout(resolve, 1000));

      onSuccess(user.id);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o usuário. Tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent mx={4}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Excluir Usuário
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              Deseja mesmo excluir este usuário?
            </Text>
            <Text mt={2} fontWeight="semibold" color="gray.700">
              {user.full_name}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {user.email}
            </Text>
            <Text mt={3} fontSize="sm" color="red.500">
              Esta ação não pode ser desfeita.
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter gap={3}>
            <Button
              ref={cancelRef}
              onClick={onClose}
              disabled={isDeleting}
              variant="outline"
            >
              Não
            </Button>
            <Button
              colorScheme="red"
              onClick={handleDelete}
              isLoading={isDeleting}
              loadingText="Excluindo..."
            >
              Sim, excluir
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
