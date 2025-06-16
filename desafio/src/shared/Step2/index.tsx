import React from 'react';
import { AddressData, useFormStore } from '@/app/store/useFormStore';
import { addressDataSchema } from '@/app/validationSchemas';
import { Box, VStack } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { AddressFields } from '../FormFields/AddressFields';
import StepButtons from '../StepButtons';
import { AddressDataValues } from '../FormFields/FormTypes';

const Step2: React.FC = () => {
  const { addressData, setAddressData, setCurrentStep, resetForm } = useFormStore();

  const handleBack = (): void => {
    setCurrentStep(1);
  };

  const handleNext = (
    values: AddressDataValues, 
    { setSubmitting }: FormikHelpers<AddressDataValues>
  ): void => {
    setAddressData(values as AddressData);
    setCurrentStep(3);
    setSubmitting(false);
  };

  const initialValues: AddressDataValues = {
    address: addressData.address,
    number: addressData.number,
    city: addressData.city,
    state: addressData.state,
    zip_code: addressData.zip_code
  };

  return (
    <Box w="100%">
      <Formik
        initialValues={initialValues}
        validationSchema={addressDataSchema}
        onSubmit={handleNext}
        enableReinitialize
      >
        {({ errors, touched, isValid, setFieldValue, values, isSubmitting }) => (
          <Form>
            <VStack spacing={{ base: 4, md: 6 }} align="stretch">
              <AddressFields
                errors={errors}
                touched={touched}
                setFieldValue={setFieldValue}
                values={values}
                showLabels={true}
                labelColor="#ff4d4d"
                inputSize={{ base: "md", md: "lg" }}
                fontSize={{ base: "sm", md: "md" }}
                useGrid={true}
              />
              
              <StepButtons
                resetForm={resetForm}
                onBack={handleBack}
                onNext
                showBackButton={true}
                isNextDisabled={
                  !isValid || 
                  !values.address || 
                  !values.number || 
                  !values.city || 
                  !values.state || 
                  !values.zip_code ||
                  isSubmitting
                }
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
