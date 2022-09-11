import React from 'react'
import Input from '../Input'
import Select from '../Select'
import { FormBuilderProps } from './@types'
import FileInput from '../FileInput'

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
                required={formSchema[key].required}
                disabled={formSchema[key].disabled}
                aria-required={formSchema[key].required}
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
                required={formSchema[key].required}
                aria-required={formSchema[key].required}
                disabled={formSchema[key].disabled}
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
            return (
              <FileInput
                required={formSchema[key].required}
                disabled={formSchema[key].disabled}
                aria-required={formSchema[key].required}
                label={key}
                value={formik.values[key] as string}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={getErrorMessage(key)}
                key={key}
              />
            )
        }
      })}
    </>
  )
}

export default FormBuilder
