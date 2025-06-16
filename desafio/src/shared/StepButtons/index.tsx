"use client";

import { Button, HStack, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

type StepButtonsProps = {
  resetForm: () => void;
  onBack?: () => void;
  onNext?: boolean;
  onFinish?: () => void;
  isNextDisabled?: boolean;
  isFinishDisabled?: boolean;
  isLoading?: boolean;
  nextButtonText?: string;
  finishButtonText?: string;
  showBackButton?: boolean;
}

const StepButtons = ({
  resetForm,
  onBack,
  onNext,
  onFinish,
  isNextDisabled = false,
  isFinishDisabled = false,
  isLoading = false,
  nextButtonText = 'Próximo',
  finishButtonText = 'Finalizar Cadastro',
  showBackButton = false,
}: StepButtonsProps) => {
  const router = useRouter(); 

  const handleCancel = () => {
    resetForm();
    router.push('/users');
  };

  return (
    <HStack spacing={4} width="100%" justify="center" mt={6}>
      <Button
        variant="outline"
        onClick={handleCancel}
        isDisabled={isLoading}
      >
        Cancelar
      </Button>

      {showBackButton && onBack && (
        <Button
          onClick={onBack}
          isDisabled={isLoading}
          bg="#ff4d4d"
          color="white"
          _hover={{ bg: "#e60000" }}
        >
          Voltar
        </Button>
      )}

      {onNext && (
        <Button
          type="submit"
          bg="#ff4d4d"
          color="white"
          _hover={{ bg: "#e60000" }}
          isDisabled={isNextDisabled || isLoading}
        >
          {nextButtonText}
        </Button>
      )}

      {onFinish && (
        <Button
          bg="#ff4d4d"
          color="white"
          _hover={{ bg: "#e60000" }}
          onClick={onFinish}
          isDisabled={isFinishDisabled || isLoading}
          leftIcon={isLoading ? <Spinner size="sm" /> : undefined}
        >
          {isLoading ? 'Finalizando...' : finishButtonText}
        </Button>
      )}
    </HStack>
  );
};

export default StepButtons;
