import React from 'react'
import Input from '../Input'
import Select from '../Select'
import { FormBuilderProps } from './@types'

const FormBuilder: React.ComponentType<FormBuilderProps> = (props) => {
  const { formik, formSchema } = props

  const getErrorMessage = (key: string) => {
    return formik.touched[key] ? (formik.errors[key] as string) : null
  }

  return (
    <>
      {Object.keys(formSchema).map((key) => {
        switch (formSchema[key].fieldType) {
          case 'input':
            return (
              <Input
                required
                aria-required
                label={key}
                value={formik.values[key] as string}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={getErrorMessage(key)}
                key={key}
              />
            )
          case 'select':
            return (
              <Select
                required
                aria-required
                label={key}
                value={formik.values[key] as string}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                items={formSchema[key].selectOptions}
                errorMessage={getErrorMessage(key)}
                key={key}
              ></Select>
            )
          default:
            return <input type="file" />
        }
      })}
    </>
  )
}

export default FormBuilder
