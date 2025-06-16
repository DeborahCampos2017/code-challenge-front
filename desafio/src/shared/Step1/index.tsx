import { PersonalData, useFormStore } from '@/app/store/useFormStore';
import { FormikFieldProps } from '@/app/types';
import { personalDataSchema } from '@/app/validationSchemas';
import {
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
    <Formik
      initialValues={personalData}
      validationSchema={personalDataSchema}
      onSubmit={handleNext}
      enableReinitialize
    >
      {({ errors, touched, isValid, setFieldValue, values }) => (
        <Form>
          <VStack spacing={4}>
            <Field name="full_name">
              {({ field }: FormikFieldProps) => (
                <FormControl isInvalid={!!(errors.full_name && touched.full_name)}>
                  <FormLabel color="#ff4d4d">Nome Completo</FormLabel>
                  <Input
                    {...field}
                    placeholder="Digite seu nome completo"
                    focusBorderColor="#ff4d4d"
                    _hover={{ borderColor: '#ff4d4d' }}
                  />
                  <FormErrorMessage>{errors.full_name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="email">
              {({ field }: FormikFieldProps) => (
                <FormControl isInvalid={!!(errors.email && touched.email)}>
                  <FormLabel color="#ff4d4d">Email</FormLabel>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Digite seu email"
                    focusBorderColor="#ff4d4d"
                    _hover={{ borderColor: '#ff4d4d' }}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="phone">
              {({ field }: FormikFieldProps) => (
                <FormControl isInvalid={!!(errors.phone && touched.phone)}>
                  <FormLabel color="#ff4d4d">Telefone</FormLabel>
                  <Input
                    {...field}
                    placeholder="(XX) XXXXX-XXXX"
                    focusBorderColor="#ff4d4d"
                    _hover={{ borderColor: '#ff4d4d' }}
                    onChange={(e) => {
                      const maskedValue = phoneMask(e.target.value);
                      setFieldValue('phone', maskedValue);
                    }}
                    maxLength={15}
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
  );
};

export default Step1;
