import { FieldInputProps, FieldMetaProps } from 'formik';

export type FormikFieldProps = {
  field: FieldInputProps<string>;
  form: {
    touched: Record<string, boolean>;
    errors: Record<string, string>;
    setFieldValue: (field: string, value: string) => void;
  };
  meta: FieldMetaProps<string>;
}
