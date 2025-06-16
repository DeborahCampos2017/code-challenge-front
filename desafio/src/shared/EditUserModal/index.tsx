"use client";

import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  useToast,
  Divider,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { AllFormValues } from '../FormFields/FormTypes';
import PersonalDataFields from '../FormFields/PersonalDataFields';
import { AddressFields } from '../FormFields/AddressFields';

type User = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  number: string;
  city: string;
  state: string;
  zip_code: string;
  terms_accepted: boolean;
}

type EditUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSuccess: (updatedUser: User) => void;
}

type ApiResponse = {
  data?: User;
  message?: string;
}

type ApiError = {
  message?: string;
}

const brazilianStates = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
] as const;

type BrazilianState = typeof brazilianStates[number];

const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
const zipCodeRegex = /^\d{5}-\d{3}$/;

const validationSchema = Yup.object().shape({
  full_name: Yup.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .required('Nome completo é obrigatório'),
  email: Yup.string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  phone: Yup.string()
    .matches(phoneRegex, 'Telefone deve ter formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX')
    .required('Telefone é obrigatório'),
  address: Yup.string()
    .min(5, 'Endereço deve ter pelo menos 5 caracteres')
    .required('Endereço é obrigatório'),
  number: Yup.string()
    .required('Número é obrigatório'),
  city: Yup.string()
    .min(2, 'Cidade deve ter pelo menos 2 caracteres')
    .required('Cidade é obrigatório'),
  state: Yup.string()
    .oneOf(brazilianStates, 'Estado deve ser uma sigla válida do Brasil')
    .required('Estado é obrigatório'),
  zip_code: Yup.string()
    .matches(zipCodeRegex, 'CEP deve ter formato XXXXX-XXX')
    .required('CEP é obrigatório'),
  terms_accepted: Yup.boolean()
});

export const EditUserModal = ({
  isOpen,
  onClose,
  user,
  onSuccess,
}: EditUserModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const initialValues: AllFormValues = {
    full_name: user.full_name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    number: user.number,
    city: user.city,
    state: user.state as BrazilianState,
    zip_code: user.zip_code,
    terms_accepted: user.terms_accepted,
  };

  const handleSubmit = async (
    values: AllFormValues,
    { setSubmitting }: FormikHelpers<AllFormValues>
  ): Promise<void> => {
    setIsLoading(true);
    setSubmitting(true);

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          phone: values.phone.replace(/\D/g, ''),
          zip_code: values.zip_code.replace(/\D/g, ''),
        }),
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.message || 'Erro ao atualizar usuário');
      }

      const updatedUserResponse: ApiResponse = await response.json();
      const updatedUser = updatedUserResponse.data || { ...user, ...values };

      onSuccess(updatedUser);
      onClose();

      toast({
        title: 'Sucesso',
        description: 'Usuário atualizado com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

    } catch (error) {
      toast({
        title: 'Erro',
        description: error instanceof Error ? error.message : 'Erro ao atualizar usuário',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Usuário</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue, values, isValid, isSubmitting }) => (
            <Form>
              <ModalBody>
                <VStack spacing={4}>
                  <Text fontSize="md" fontWeight="bold" alignSelf="flex-start">
                    Dados Pessoais
                  </Text>
                  <PersonalDataFields
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    values={{
                      full_name: values.full_name,
                      email: values.email,
                      phone: values.phone
                    }}
                    showLabels={true}
                    labelColor="#ff4d4d"
                    inputSize="md"
                    fontSize="md"
                  />
                  <Divider />
                  <Text fontSize="md" fontWeight="bold" alignSelf="flex-start">
                    Endereço
                  </Text>
                  <AddressFields
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    values={{
                      address: values.address,
                      number: values.number,
                      city: values.city,
                      state: values.state,
                      zip_code: values.zip_code
                    }}
                    showLabels={true}
                    labelColor="#ff4d4d"
                    inputSize="md"
                    fontSize="md"
                    useGrid={false}
                  />
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="ghost"
                  mr={3}
                  onClick={onClose}
                  isDisabled={isLoading || isSubmitting}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  bg="#ff4d4d"
                  color="white"
                  _hover={{ bg: "#e60000" }}
                  isDisabled={!isValid || isLoading || isSubmitting}
                  leftIcon={(isLoading || isSubmitting) ? <Spinner size="sm" /> : undefined}
                >
                  {(isLoading || isSubmitting) ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};
