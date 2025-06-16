"use client";

import { useEffect } from 'react';
import { Box, Container, Heading, useToast } from '@chakra-ui/react';
import { useFormStore } from './store/useFormStore';
import Step1 from '@/shared/Step1';
import Step2 from '@/shared/Step2';
import Step3 from '@/shared/Step3';
import StepIndicator from '@/shared/StepIndicator';

const RegisterPage = () => {
  const { currentStep, apiState } = useFormStore();
  const toast = useToast();

  useEffect(() => {
    if (apiState.isSuccess) {
      toast({
        title: 'Sucesso!',
        description: 'Operação realizada com sucesso',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [apiState.isSuccess, toast]);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      default:
        return <Step1 />;
    }
  };

  return (
    <Box
      minH="100vh"
      bg={{ base: "gray.50", md: "gray.100" }}
      py={{ base: 4, md: 3 }}
      px={{ base: 4, md: 0 }}
    >
      <Container
        p={{ base: 4, sm: 6, md: 2 }}
        maxW={{ base: "100%", sm: "md", md: "2xl", lg: "4xl" }}
        centerContent
      >
        <Box
          bg="white"
          p={{ base: 4, sm: 6, md: 8 }}
          borderRadius={{ base: "lg", md: "xl" }}
          boxShadow={{ base: "md", md: "xl" }}
          w="100%"
          maxW={{ base: "100%", md: "800px" }}
        >
          <Heading
            textAlign="center"
            mb={{ base: 6, md: 8 }}
            fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
            color="gray.800"
          >
            Cadastro de Usuário
          </Heading>
          <StepIndicator currentStep={currentStep} />
          <Box mt={{ base: 4, md: 6 }}>
            {renderCurrentStep()}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterPage;
