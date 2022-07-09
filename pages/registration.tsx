import { useFormik } from 'formik'
import { NextPage } from 'next'
import * as yup from 'yup'
import Button from '../components/Button'
import Input from '../components/Input'
import { PASSWORD_REGEX } from '../utils'

interface InitialValues {
  [key: string]: string
  first_name: string
  last_name: string
  email: string
  password: string
  confirm_password: string
  country: string
  state: string
}

const validationSchema = yup.object({
  first_name: yup
    .string()
    .required('Please input your first name')
    .min(1, 'Please inout a valid first name')
    .max(20, 'Please input a valid first name'),
  last_name: yup
    .string()
    .required('Please input your last name')
    .min(2, 'Please input a valid last name')
    .max(20, 'Please input a valid last name'),
  email: yup
    .string()
    .email('please input a valid Email')
    .required('Please input your email'),
  password: yup
    .string()
    .required('Please enter your password')
    .matches(
      PASSWORD_REGEX,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character',
    ),
  confirm_password: yup
    .string()
    .required('Please confirm your password')
    .when('password', {
      is: (password: string | undefined) => !!password,
      then: yup.string().oneOf([yup.ref('password')], "Password doesn't match"),
    }),
  country: yup.string().required('Please input your country'),
  state: yup.string().required('Please input your state'),
})

const initialValues: InitialValues = {
  first_name: 'John',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
  country: '',
  state: '',
}

const inputType: InitialValues = {
  first_name: 'text',
  last_name: 'text',
  email: 'email',
  password: 'password',
  confirm_password: 'password',
  country: 'text',
  state: 'text',
}

const Registration: NextPage = () => {
  const formik = useFormik({
    initialValues,
    onSubmit: (value: any) => {},
    validationSchema: validationSchema,
  })

  return (
    <main>
      <div className="container mx-auto">
        <div className="grid grid-cols-6 gap-6 py-3">
          <div className="col-start-3 col-span-2">
            <h1 className="text-2xl font-bold mb-6">Registration</h1>
            <form onSubmit={formik.handleSubmit}>
              {Object.keys(initialValues).map((key) => (
                <Input
                  type={inputType[key]}
                  required
                  aria-required
                  label={key}
                  value={formik.values[key]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={formik.touched[key] ? formik.errors[key] : null}
                  key={key}
                />
              ))}
              <Button type="submit" fullWidth>
                submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Registration
