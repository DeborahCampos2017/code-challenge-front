import { AddressData, useFormStore } from '@/app/store/useFormStore';
import { FormikFieldProps } from '@/app/types';
import { addressDataSchema } from '@/app/validationSchemas';
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  VStack
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { zipCodeMask } from '../Masks';
import StepButtons from '../StepButtons';

const brazilianStates = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const Step2 = () => {
  const { addressData, setAddressData, setCurrentStep, resetForm } = useFormStore();

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleNext = (values: AddressData) => {
    setAddressData(values);
    setCurrentStep(3);
  };

  return (
    <Box w="100%">
      <Formik
        initialValues={addressData}
        validationSchema={addressDataSchema}
        onSubmit={handleNext}
        enableReinitialize
      >
        {({ errors, touched, isValid, setFieldValue, values }) => (
          <Form>
            <VStack spacing={{ base: 4, md: 6 }} align="stretch">
              <Grid
                templateColumns={{ base: "1fr", md: "1fr 150px" }}
                gap={{ base: 4, md: 4 }}
              >
                <GridItem>
                  <Field name="address">
                    {({ field }: FormikFieldProps) => (
                      <FormControl isInvalid={!!(errors.address && touched.address)}>
                        <FormLabel color="#ff4d4d" fontSize={{ base: "sm", md: "md" }}>Endereço</FormLabel>
                        <Input
                          {...field}
                          placeholder="Digite seu endereço"
                          size={{ base: "md", md: "lg" }}
                          fontSize={{ base: "sm", md: "md" }}
                          _focus={{ borderColor: "#ff4d4d", boxShadow: "0 0 0 1px #ff4d4d" }}
                          color='black'
                        />
                        <FormErrorMessage>{errors.address}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </GridItem>

                <GridItem>
                  <Field name="number">
                    {({ field }: FormikFieldProps) => (
                      <FormControl isInvalid={!!(errors.number && touched.number)}>
                        <FormLabel color="#ff4d4d" fontSize={{ base: "sm", md: "md" }}>Número</FormLabel>
                        <Input
                          {...field}
                          placeholder="Digite o número"
                          size={{ base: "sm", md: "lg" }}
                          fontSize={{ base: "sm", md: "md" }}
                          _focus={{ borderColor: "#ff4d4d", boxShadow: "0 0 0 1px #ff4d4d" }}
                          color='black'
                        />
                        <FormErrorMessage>{errors.number}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </GridItem>
              </Grid>
              <Field name="city">
                {({ field }: FormikFieldProps) => (
                  <FormControl isInvalid={!!(errors.city && touched.city)}>
                    <FormLabel color="#ff4d4d" fontSize={{ base: "sm", md: "md" }}>Cidade</FormLabel>
                    <Input
                      {...field}
                      placeholder="Digite a cidade"
                      size={{ base: "md", md: "lg" }}
                      fontSize={{ base: "sm", md: "md" }}
                      _focus={{ borderColor: "#ff4d4d", boxShadow: "0 0 0 1px #ff4d4d" }}
                      color='black'
                    />
                    <FormErrorMessage>{errors.city}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="state">
                {({ field }: FormikFieldProps) => (
                  <FormControl isInvalid={!!(errors.state && touched.state)}>
                    <FormLabel color="#ff4d4d">Estado</FormLabel>
                    <Select
                      color='black'
                      {...field}
                      placeholder="Selecione o estado"
                      size={{ base: "md", md: "lg" }}
                      fontSize={{ base: "sm", md: "md" }}
                      _focus={{ borderColor: "#ff4d4d", boxShadow: "0 0 0 1px #ff4d4d" }}
                    >
                      {brazilianStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage fontSize="xs">{errors.state}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="zip_code">
                {({ field }: FormikFieldProps) => (
                  <FormControl isInvalid={!!(errors.zip_code && touched.zip_code)}>
                    <FormLabel color="#ff4d4d" fontSize={{ base: "sm", md: "md" }}>CEP</FormLabel>
                    <Input
                      {...field}
                      placeholder="XXXXX-XXX"
                      size={{ base: "md", md: "lg" }}
                      fontSize={{ base: "sm", md: "md" }}
                      _focus={{ borderColor: "#ff4d4d", boxShadow: "0 0 0 1px #ff4d4d" }}
                      onChange={(e) => {
                        const maskedValue = zipCodeMask(e.target.value);
                        setFieldValue('zip_code', maskedValue);
                      }}
                      maxLength={9}
                      color='black'
                    />
                    <FormErrorMessage fontSize="xs">{errors.zip_code}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <StepButtons
                resetForm={resetForm}
                onBack={handleBack}
                onNext
                showBackButton={true}
                isNextDisabled={!isValid || !values.address || !values.number || !values.city || !values.state || !values.zip_code}
                nextButtonText="Próximo"
              />
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Step2;
