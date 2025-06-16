import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack
} from '@chakra-ui/react';
import { Field } from 'formik';
import { FormikFieldProps } from '@/app/types';
import { phoneMask } from '@/shared/Masks';
import { FormErrors, FormTouched, PersonalDataValues, SetFieldValueFunction } from '../FormTypes';

type PersonalDataFieldsProps = {
  errors: FormErrors;
  touched: FormTouched;
  setFieldValue: SetFieldValueFunction;
  values: PersonalDataValues;
  showLabels?: boolean;
  labelColor?: string;
  inputSize?: string | Record<string, string>;
  fontSize?: string | Record<string, string>;
}

const PersonalDataFields = ({
  errors,
  touched,
  setFieldValue,
  showLabels = true,
  labelColor = "#ff4d4d",
  inputSize = { base: "md", md: "lg" },
  fontSize = { base: "sm", md: "md" }
}: PersonalDataFieldsProps) => {
  return (
    <VStack spacing={4}>
      <Field name="full_name">
        {({ field }: FormikFieldProps) => (
          <FormControl isInvalid={!!(errors.full_name && touched.full_name)}>
            {showLabels && (
              <FormLabel fontSize={fontSize} color={labelColor}>
                Nome Completo
              </FormLabel>
            )}
            <Input
              {...field}
              placeholder="Digite o nome completo"
              size={inputSize}
              fontSize={fontSize}
              _focus={{ borderColor: labelColor, boxShadow: `0 0 0 1px ${labelColor}` }}
              color='black'
            />
            <FormErrorMessage>{errors.full_name}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <Field name="email">
        {({ field }: FormikFieldProps) => (
          <FormControl isInvalid={!!(errors.email && touched.email)}>
            {showLabels && (
              <FormLabel fontSize={fontSize} color={labelColor}>
                Email
              </FormLabel>
            )}
            <Input
              {...field}
              type="email"
              placeholder="Digite o email"
              size={inputSize}
              fontSize={fontSize}
              _focus={{ borderColor: labelColor, boxShadow: `0 0 0 1px ${labelColor}` }}
              color='black'
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <Field name="phone">
        {({ field }: FormikFieldProps) => (
          <FormControl isInvalid={!!(errors.phone && touched.phone)}>
            {showLabels && (
              <FormLabel color={labelColor} fontSize={fontSize}>
                Telefone
              </FormLabel>
            )}
            <Input
              {...field}
              placeholder="(XX) XXXXX-XXXX"
              size={inputSize}
              fontSize={fontSize}
              _focus={{ borderColor: labelColor, boxShadow: `0 0 0 1px ${labelColor}` }}
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
    </VStack>
  );
};

export default PersonalDataFields;
