import { FormikProps } from 'formik'
import { FieldSchema } from '../../@globalTypes'

export interface FormBuilderProps {
  formSchema: FieldSchema<any>
  formik: FormikProps<any>
}
