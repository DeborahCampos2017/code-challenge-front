import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  VStack
} from '@chakra-ui/react';
import { Field } from 'formik';
import { FormikFieldProps } from '@/app/types';
import { AddressDataValues, FormErrors, FormTouched, SetFieldValueFunction } from '../FormTypes';
import { zipCodeMask } from '@/shared/Masks';

const brazilianStates = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
] as const;

type AddressFieldsProps = {
  errors: FormErrors;
  touched: FormTouched;
  setFieldValue: SetFieldValueFunction;
  values: AddressDataValues;
  showLabels?: boolean;
  labelColor?: string;
  inputSize?: string | Record<string, string>;
  fontSize?: string | Record<string, string>;
  useGrid?: boolean;
}

export const AddressFields = ({
  errors,
  touched,
  setFieldValue,
  showLabels = true,
  labelColor = "#ff4d4d",
  inputSize = { base: "md", md: "lg" },
  fontSize = { base: "sm", md: "md" },
  useGrid = true
}: AddressFieldsProps) => {
  const AddressAndNumber: React.FC = () => (
    <>
      <Field name="address">
        {({ field }: FormikFieldProps) => (
          <FormControl isInvalid={!!(errors.address && touched.address)}>
            {showLabels && (
              <FormLabel color={labelColor} fontSize={fontSize}>
                Endereço
              </FormLabel>
            )}
            <Input
              {...field}
              placeholder="Digite o endereço"
              size={inputSize}
              fontSize={fontSize}
              _focus={{ borderColor: labelColor, boxShadow: `0 0 0 1px ${labelColor}` }}
              color='black'
            />
            <FormErrorMessage>{errors.address}</FormErrorMessage>
          </FormControl>
        )}
      </Field>

      <Field name="number">
        {({ field }: FormikFieldProps) => (
          <FormControl isInvalid={!!(errors.number && touched.number)}>
            {showLabels && (
              <FormLabel color={labelColor} fontSize={fontSize}>
                Número
              </FormLabel>
            )}
            <Input
              {...field}
              placeholder="Digite o número"
              size={inputSize}
              fontSize={fontSize}
              _focus={{ borderColor: labelColor, boxShadow: `0 0 0 1px ${labelColor}` }}
              color='black'
            />
            <FormErrorMessage>{errors.number}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </>
  );

  return (
    <VStack spacing={4}>
      {useGrid ? (
        <Grid templateColumns={{ base: "1fr", md: "1fr 150px" }} gap={4} width="100%">
          <GridItem>
            <Field name="address">
              {({ field }: FormikFieldProps) => (
                <FormControl isInvalid={!!(errors.address && touched.address)}>
                  {showLabels && (
                    <FormLabel color={labelColor} fontSize={fontSize}>
                      Endereço
                    </FormLabel>
                  )}
                  <Input
                    {...field}
                    placeholder="Digite o endereço"
                    size={inputSize}
                    fontSize={fontSize}
                    _focus={{ borderColor: labelColor, boxShadow: `0 0 0 1px ${labelColor}` }}
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
                  {showLabels && (
                    <FormLabel color={labelColor} fontSize={fontSize}>
                      Número
                    </FormLabel>
                  )}
                  <Input
                    {...field}
                    placeholder="Digite o número"
                    size={inputSize}
                    fontSize={fontSize}
                    _focus={{ borderColor: labelColor, boxShadow: `0 0 0 1px ${labelColor}` }}
                    color='black'
                  />
                  <FormErrorMessage>{errors.number}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </GridItem>
        </Grid>
      ) : (
        <AddressAndNumber />
      )}

      <Field name="city">
        {({ field }: FormikFieldProps) => (
          <FormControl isInvalid={!!(errors.city && touched.city)}>
            {showLabels && (
              <FormLabel color={labelColor} fontSize={fontSize}>
                Cidade
              </FormLabel>
            )}
            <Input
              {...field}
              placeholder="Digite a cidade"
              size={inputSize}
              fontSize={fontSize}
              _focus={{ borderColor: labelColor, boxShadow: `0 0 0 1px ${labelColor}` }}
              color='black'
            />
            <FormErrorMessage>{errors.city}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <Field name="state">
        {({ field }: FormikFieldProps) => (
          <FormControl isInvalid={!!(errors.state && touched.state)}>
            {showLabels && (
              <FormLabel color={labelColor} fontSize={fontSize}>
                Estado
              </FormLabel>
            )}
            <Select
              {...field}
              placeholder="Selecione o estado"
              size={inputSize}
              fontSize={fontSize}
              _focus={{ borderColor: labelColor, boxShadow: `0 0 0 1px ${labelColor}` }}
              _placeholder={{ color: 'gray.500' }}
              color={field.value ? 'black' : 'gray.500'}
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
            {showLabels && (
              <FormLabel color={labelColor} fontSize={fontSize}>
                CEP
              </FormLabel>
            )}
            <Input
              {...field}
              placeholder="XXXXX-XXX"
              size={inputSize}
              fontSize={fontSize}
              _focus={{ borderColor: labelColor, boxShadow: `0 0 0 1px ${labelColor}` }}
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
    </VStack>
  );
};