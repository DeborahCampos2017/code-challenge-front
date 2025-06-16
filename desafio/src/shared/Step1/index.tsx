import React from 'react';
import { PersonalData, useFormStore } from '@/app/store/useFormStore';
import { personalDataSchema } from '@/app/validationSchemas';
import { Box, VStack } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import StepButtons from '../StepButtons';
import PersonalDataFields from '../FormFields/PersonalDataFields';
import { PersonalDataValues } from '../FormFields/FormTypes';

const Step1 = () => {
  const { personalData, setPersonalData, setCurrentStep, resetForm } = useFormStore();

  const handleNext = (
    values: PersonalDataValues, 
    { setSubmitting }: FormikHelpers<PersonalDataValues>
  ): void => {
    setPersonalData(values as PersonalData);
    setCurrentStep(2);
    setSubmitting(false);
  };

  const initialValues: PersonalDataValues = {
    full_name: personalData.full_name,
    email: personalData.email,
    phone: personalData.phone
  };

  return (
    <Box w="100%">
      <Formik
        initialValues={initialValues}
        validationSchema={personalDataSchema}
        onSubmit={handleNext}
        enableReinitialize
      >
        {({ errors, touched, isValid, setFieldValue, values, isSubmitting }) => (
          <Form>
            <VStack spacing={{ base: 4, md: 6 }} align="stretch">
              <PersonalDataFields
                errors={errors}
                touched={touched}
                setFieldValue={setFieldValue}
                values={values}
                showLabels={true}
                labelColor="#ff4d4d"
                inputSize={{ base: "md", md: "lg" }}
                fontSize={{ base: "sm", md: "md" }}
              />
              
              <StepButtons
                resetForm={resetForm}
                onNext
                isNextDisabled={
                  !isValid || 
                  !values.full_name || 
                  !values.email || 
                  !values.phone ||
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

export default Step1;
