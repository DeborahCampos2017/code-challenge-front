import { PersonalData, useFormStore } from '@/app/store/useFormStore';
import { FormikFieldProps } from '@/app/types';
import { personalDataSchema } from '@/app/validationSchemas';
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel, Input,
  VStack
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { phoneMask } from '../Masks';
import StepButtons from '../StepButtons';

const Step1 = () => {
  const { personalData, setPersonalData, setCurrentStep, resetForm } = useFormStore();

  const handleNext = (values: PersonalData) => {
    setPersonalData(values);
    setCurrentStep(2);
  };

  return (
    <Box w="100%">
      <Formik
        initialValues={personalData}
        validationSchema={personalDataSchema}
        onSubmit={handleNext}
        enableReinitialize
      >
        {({ errors, touched, isValid, setFieldValue, values }) => (
          <Form>
            <VStack spacing={{ base: 4, md: 6 }} align="stretch">
              <Field name="full_name">
                {({ field }: FormikFieldProps) => (
                  <FormControl isInvalid={!!(errors.full_name && touched.full_name)}>
                    <FormLabel fontSize={{ base: "sm", md: "md" }} color="#ff4d4d">Nome Completo</FormLabel>
                    <Input
                      {...field}
                      placeholder="Digite seu nome completo"
                      size={{ base: "md", md: "lg" }}
                      fontSize={{ base: "sm", md: "md" }}
                      _focus={{ borderColor: "#ff4d4d", boxShadow: "0 0 0 1px #ff4d4d" }}
                      color='black'
                    />
                    <FormErrorMessage>{errors.full_name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="email">
                {({ field }: FormikFieldProps) => (
                  <FormControl isInvalid={!!(errors.email && touched.email)}>
                    <FormLabel fontSize={{ base: "sm", md: "md" }} color="#ff4d4d">Email</FormLabel>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Digite seu email"
                      size={{ base: "md", md: "lg" }}
                      fontSize={{ base: "sm", md: "md" }}
                      _focus={{ borderColor: "#ff4d4d", boxShadow: "0 0 0 1px #ff4d4d" }}
                      color='black'
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="phone">
                {({ field }: FormikFieldProps) => (
                  <FormControl isInvalid={!!(errors.phone && touched.phone)}>
                    <FormLabel color="#ff4d4d" fontSize={{ base: "sm", md: "md" }}>Telefone</FormLabel>
                    <Input
                      {...field}
                      placeholder="(XX) XXXXX-XXXX"
                      size={{ base: "md", md: "lg" }}
                      fontSize={{ base: "sm", md: "md" }}
                      _focus={{ borderColor: "#ff4d4d", boxShadow: "0 0 0 1px #ff4d4d" }}
                      onChange={(e) => {
                        const maskedValue = phoneMask(e.target.value);
                        setFieldValue('phone', maskedValue);
                      }}
                      maxLength={15}
                      color='black'
                    />
                    <FormErrorMessage>{errors.phone}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <StepButtons
                resetForm={resetForm}
                onNext
                isNextDisabled={!isValid || !values.full_name || !values.email || !values.phone}
                nextButtonText="Próximo"
              />
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Step1;
