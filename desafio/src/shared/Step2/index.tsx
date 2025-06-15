import { AddressData } from '@/app/store/types';
import { useUserStore } from '@/app/store/useUserStore';
import { addressDataSchema } from '@/app/validationSchemas';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik } from 'formik';
import { ButtonsFooter } from '../ButtonsFooter';
import { cepMask } from '../Masks';

export const Step2 = () => {
  const { addressData, setAddressData, setCurrentStep, resetForm } = useUserStore();

  const handleNext = (values: AddressData) => {
    setAddressData(values);
    setCurrentStep(3);
  };

  return (
    <Formik
      initialValues={addressData}
      validationSchema={addressDataSchema}
      onSubmit={handleNext}
      enableReinitialize={true}
    >
      {({ errors, touched, setFieldValue, values, isValid }) => {
        const hasAllFields = values.endereco && values.numero && values.bairro &&
          values.cidade && values.estado && values.cep;
        const isFormValid = isValid && hasAllFields;

        return (
          <Form>
            <VStack spacing={4}>
              <Field name="endereco">
                {({ field }: FieldProps<string>) => (
                  <FormControl isInvalid={!!(errors.endereco && touched.endereco)}>
                    <FormLabel>Endereço</FormLabel>
                    <Input {...field} placeholder="Digite seu endereço" />
                    <FormErrorMessage>{errors.endereco}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="numero">
                {({ field }: FieldProps<string>) => (
                  <FormControl isInvalid={!!(errors.numero && touched.numero)}>
                    <FormLabel>Número</FormLabel>
                    <Input {...field} placeholder="Digite o número" />
                    <FormErrorMessage>{errors.numero}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="bairro">
                {({ field }: FieldProps<string>) => (
                  <FormControl isInvalid={!!(errors.bairro && touched.bairro)}>
                    <FormLabel>Bairro</FormLabel>
                    <Input {...field} placeholder="Digite o bairro" />
                    <FormErrorMessage>{errors.bairro}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="cidade">
                {({ field }: FieldProps<string>) => (
                  <FormControl isInvalid={!!(errors.cidade && touched.cidade)}>
                    <FormLabel>Cidade</FormLabel>
                    <Input {...field} placeholder="Digite a cidade" />
                    <FormErrorMessage>{errors.cidade}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="estado">
                {({ field }: FieldProps<string>) => (
                  <FormControl isInvalid={!!(errors.estado && touched.estado)}>
                    <FormLabel>Estado</FormLabel>
                    <Input
                      {...field}
                      placeholder="Digite a sigla do estado (ex: SP)"
                      maxLength={2}
                      onChange={(e) => {
                        setFieldValue('estado', e.target.value.toUpperCase());
                      }}
                    />
                    <FormErrorMessage>{errors.estado}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="cep">
                {({ field }: FieldProps<string>) => (
                  <FormControl isInvalid={!!(errors.cep && touched.cep)}>
                    <FormLabel>CEP</FormLabel>
                    <Input
                      {...field}
                      placeholder="XXXXX-XXX"
                      maxLength={9}
                      onChange={(e) => {
                        const masked = cepMask(e.target.value);
                        setFieldValue('cep', masked);
                      }}
                    />
                    <FormErrorMessage>{errors.cep}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <ButtonsFooter
                isFormValid={!!isFormValid}
                resetForm={resetForm}
                currentStepValue={2} />
            </VStack>
          </Form>
        );
      }}
    </Formik>
  );
};