"use client";

import { Box, Button, HStack, Spinner, useBreakpointValue, VStack } from '@chakra-ui/react';
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
  const isMobile = useBreakpointValue({ base: true, md: false });
  const buttonSize = useBreakpointValue({ base: "md", md: "lg" });

  const ButtonContainer = isMobile ? VStack : HStack;
  const containerProps = isMobile
    ? { spacing: 3, width: "100%", align: "end" }
    : { spacing: 4, width: "100%", justify: "end" };

  const handleCancel = () => {
    resetForm();
    router.push('/users');
  };

  return (
    <Box mt={6} px={{ base: 0, md: 4 }}>
      <ButtonContainer {...containerProps}>
        <Button
          variant="outline"
          onClick={handleCancel}
          isDisabled={isLoading}
          size={buttonSize}
          borderColor="gray.300"
          _hover={{ borderColor: "gray.400", bg: "gray.50" }}
          order={{ base: 3, md: 1 }}
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
            _active={{ bg: "#cc0000" }}
            size={buttonSize}
            order={{ base: 2, md: 2 }}
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
            _active={{ bg: "#cc0000" }}
            isDisabled={isNextDisabled || isLoading}
            size={buttonSize}
            order={{ base: 1, md: 3 }}
          >
            {nextButtonText}
          </Button>
        )}

        {onFinish && (
          <Button
            bg="#ff4d4d"
            color="white"
            _hover={{ bg: "#e60000" }}
            _active={{ bg: "#cc0000" }}
            onClick={onFinish}
            isDisabled={isFinishDisabled || isLoading}
            leftIcon={isLoading ? <Spinner size="sm" /> : undefined}
            size={buttonSize}
            order={{ base: 1, md: 3 }}
          >
            {isLoading ? 'Finalizando...' : finishButtonText}
          </Button>
        )}
      </ButtonContainer>
    </Box>
  );
};

export default StepButtons;
