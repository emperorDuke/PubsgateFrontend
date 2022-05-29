import { useFormik } from 'formik'
import { NextPage } from 'next'
import Button from '../components/Button'
import Input from '../components/Input'

interface InitialValues {
  [key: string]: string
  first_name: string
  last_name: string
  email: string
  password: string
  country: string
  state: string
}

const initialValues: InitialValues = {
  first_name: 'John',
  last_name: '',
  email: '',
  password: '',
  country: '',
  state: '',
}

const Registration: NextPage = () => {
  const formik = useFormik({
    initialValues,
    onSubmit: (value: any) => {},
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
                  type="text"
                  required
                  aria-required
                  label={key.split('_').join(' ')}
                  value={formik.values[key]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
