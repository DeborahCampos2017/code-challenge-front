import { AddressData, useFormStore } from '@/app/store/useFormStore';
import { FormikFieldProps } from '@/app/types';
import { addressDataSchema } from '@/app/validationSchemas';
import {
  FormControl,
  FormErrorMessage,
  FormLabel, Input, Select,
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
    <Formik
      initialValues={addressData}
      validationSchema={addressDataSchema}
      onSubmit={handleNext}
      enableReinitialize
    >
      {({ errors, touched, isValid, setFieldValue, values }) => (
        <Form>
          <VStack spacing={4}>
            <Field name="address">
              {({ field }: FormikFieldProps) => (
                <FormControl isInvalid={!!(errors.address && touched.address)}>
                  <FormLabel color="#ff4d4d">Endereço</FormLabel>
                  <Input
                    {...field}
                    placeholder="Digite seu endereço"
                    focusBorderColor="#ff4d4d"
                    _hover={{ borderColor: '#ff4d4d' }}
                    color='black'
                  />
                  <FormErrorMessage>{errors.address}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="number">
              {({ field }: FormikFieldProps) => (
                <FormControl isInvalid={!!(errors.number && touched.number)}>
                  <FormLabel color="#ff4d4d">Número</FormLabel>
                  <Input
                    {...field}
                    placeholder="Digite o número"
                    focusBorderColor="#ff4d4d"
                    _hover={{ borderColor: '#ff4d4d' }}
                    color='black'
                  />
                  <FormErrorMessage>{errors.number}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="city">
              {({ field }: FormikFieldProps) => (
                <FormControl isInvalid={!!(errors.city && touched.city)}>
                  <FormLabel color="#ff4d4d">Cidade</FormLabel>
                  <Input
                    {...field}
                    placeholder="Digite a cidade"
                    focusBorderColor="#ff4d4d"
                    _hover={{ borderColor: '#ff4d4d' }}
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
                    focusBorderColor="#ff4d4d"
                    _hover={{ borderColor: '#ff4d4d' }}
                  >
                    {brazilianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.state}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="zip_code">
              {({ field }: FormikFieldProps) => (
                <FormControl isInvalid={!!(errors.zip_code && touched.zip_code)}>
                  <FormLabel color="#ff4d4d">CEP</FormLabel>
                  <Input
                    {...field}
                    placeholder="XXXXX-XXX"
                    focusBorderColor="#ff4d4d"
                    _hover={{ borderColor: '#ff4d4d' }}
                    onChange={(e) => {
                      const maskedValue = zipCodeMask(e.target.value);
                      setFieldValue('zip_code', maskedValue);
                    }}
                    maxLength={9}
                    color='black'
                  />
                  <FormErrorMessage>{errors.zip_code}</FormErrorMessage>
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
  );
};

export default Step2;
