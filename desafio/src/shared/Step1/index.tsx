import { PersonalData } from '@/app/store/types';
import { useUserStore } from '@/app/store/useUserStore';
import { personalDataSchema } from '@/app/validationSchemas';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik } from 'formik';
import { ButtonsFooter } from '../ButtonsFooter';
import { phoneMask } from '../Masks';

export const Step1 = () => {
  const { personalData, setPersonalData, setCurrentStep, resetForm } = useUserStore();

  const handleNext = (values: PersonalData) => {
    setPersonalData(values);
    setCurrentStep(2);
  };

  return (
    <Formik
      initialValues={personalData}
      validationSchema={personalDataSchema}
      onSubmit={handleNext}
      enableReinitialize={true}
    >
      {({ errors, touched, setFieldValue, values, isValid }) => {
        const hasAllFields = values.nome && values.email && values.telefone && values.genero;
        const isFormValid = isValid && hasAllFields;

        return (
          <Form>
            <VStack spacing={4}>
              <Field name="nome">
                {({ field }: FieldProps<string>) => (
                  <FormControl isInvalid={!!(errors.nome && touched.nome)}>
                    <FormLabel>Nome</FormLabel>
                    <Input {...field} placeholder="Digite seu nome completo" />
                    <FormErrorMessage>{errors.nome}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="email">
                {({ field }: FieldProps<string>) => (
                  <FormControl isInvalid={!!(errors.email && touched.email)}>
                    <FormLabel>Email</FormLabel>
                    <Input {...field} type="email" placeholder="Digite seu email" />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="telefone">
                {({ field }: FieldProps<string>) => (
                  <FormControl isInvalid={!!(errors.telefone && touched.telefone)}>
                    <FormLabel>Telefone</FormLabel>
                    <Input
                      {...field}
                      placeholder="(XX) XXXXX-XXXX"
                      maxLength={15}
                      onChange={(e) => {
                        const masked = phoneMask(e.target.value);
                        setFieldValue('telefone', masked);
                      }}
                    />
                    <FormErrorMessage>{errors.telefone}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="genero">
                {({ field }: FieldProps<string>) => (
                  <FormControl isInvalid={!!(errors.genero && touched.genero)}>
                    <FormLabel>Gênero</FormLabel>
                    <Select {...field} placeholder="Selecione seu gênero">
                      <option value="masculino">Masculino</option>
                      <option value="feminino">Feminino</option>
                      <option value="outro">Outro</option>
                      <option value="prefiro-nao-informar">Prefiro não informar</option>
                    </Select>
                    <FormErrorMessage>{errors.genero}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <ButtonsFooter isFormValid={!!isFormValid} resetForm={resetForm} />
            </VStack>
          </Form>
        );
      }}
    </Formik>
  );
};