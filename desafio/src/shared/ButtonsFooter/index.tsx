'use client';

import { useUserStore } from "@/app/store/useUserStore";
import { Button, HStack, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

type ButtonsFooterProps = {
  isFormValid?: boolean;
  resetForm: () => void
  currentStepValue?: number;
}

export const ButtonsFooter = ({
  isFormValid = false,
  resetForm,
  currentStepValue,
}: ButtonsFooterProps) => {
  const router = useRouter();
  const toast = useToast();
  const { setCurrentStep, currentStep } = useUserStore();

  const handleCancel = () => {
    resetForm();
    router.push('/users');
  };

  const handleBack = () => {
    if (setCurrentStep) {
      setCurrentStep(currentStepValue ? currentStepValue - 1 : currentStep - 1);
    };
  };

  const handleFinish = () => {
    toast({
      title: 'Cadastro realizado com sucesso!',
      description: 'Seus dados foram salvos.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    resetForm();
    router.push('/users');
  };

  return (
    <HStack spacing={4} width="100%" justify="flex-end">
      <Button variant="outline" onClick={handleCancel}>
        Cancelar
      </Button>
      <HStack spacing={4}>
        {currentStep !== 1 && (
          <Button variant="outline" onClick={handleBack}>
            Voltar
          </Button>
        )}
        {currentStep === 3 ? (
          <Button
            colorScheme="green"
            onClick={handleFinish}
            isDisabled={!isFormValid}
          >
            Finalizar
          </Button>
        ) : (
          < Button
            type="submit"
            colorScheme="blue"
            isDisabled={!isFormValid}
          >
            Próximo
          </Button>
        )}
      </HStack>
    </HStack >
  );
}