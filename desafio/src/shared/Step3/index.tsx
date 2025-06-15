"use client";

import { useUserStore } from '@/app/store/useUserStore';
import {
  Box,
  Checkbox,
  Divider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ButtonsFooter } from '../ButtonsFooter';

export const Step3 = () => {
  const {
    personalData,
    addressData,
    acceptTerms,
    setAcceptTerms,
    resetForm
  } = useUserStore();

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Dados Pessoais
        </Text>
        <VStack align="stretch" spacing={2}>
          <Text><strong>Nome:</strong> {personalData.nome}</Text>
          <Text><strong>Email:</strong> {personalData.email}</Text>
          <Text><strong>Telefone:</strong> {personalData.telefone}</Text>
          <Text><strong>Gênero:</strong> {personalData.genero}</Text>
        </VStack>
      </Box>

      <Divider />

      <Box>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Endereço
        </Text>
        <VStack align="stretch" spacing={2}>
          <Text><strong>Endereço:</strong> {addressData.endereco}</Text>
          <Text><strong>Número:</strong> {addressData.numero}</Text>
          <Text><strong>Bairro:</strong> {addressData.bairro}</Text>
          <Text><strong>Cidade:</strong> {addressData.cidade}</Text>
          <Text><strong>Estado:</strong> {addressData.estado}</Text>
          <Text><strong>CEP:</strong> {addressData.cep}</Text>
        </VStack>
      </Box>

      <Divider />

      <Checkbox
        isChecked={acceptTerms}
        onChange={(e) => setAcceptTerms(e.target.checked)}
      >
        Aceito os termos e condições
      </Checkbox>
      <ButtonsFooter
        resetForm={resetForm}
        currentStepValue={2}
        isFormValid={acceptTerms} />
    </VStack>
  );
};
