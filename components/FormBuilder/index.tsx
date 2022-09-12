import React from 'react'
import Input from '../Input'
import Select from '../Select'
import { FormBuilderProps } from './@types'
import FileInput from '../FileInput'

const FormBuilder: React.ComponentType<FormBuilderProps> = (props) => {
  const { formik, formSchema } = props

  const getErrorMessage = (field: string) => {
    return formik.touched[field] ? (formik.errors[field] as string) : null
  }

  const handleFileChange = (field: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        formik.setFieldValue(field, e.target.files[0])
      }
    }
  }

  return (
    <>
      {Object.keys(formSchema).map((field) => {
        switch (formSchema[field].fieldType) {
          case 'input':
            return (
              <Input
                required={formSchema[field].required}
                disabled={formSchema[field].disabled}
                aria-required={formSchema[field].required}
                label={field}
                value={formik.values[field] as string}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={getErrorMessage(field)}
                key={field}
              />
            )
          case 'select':
            return (
              <Select
                required={formSchema[field].required}
                aria-required={formSchema[field].required}
                disabled={formSchema[field].disabled}
                label={field}
                value={formik.values[field] as string}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                items={formSchema[field].selectOptions}
                errorMessage={getErrorMessage(field)}
                key={field}
              ></Select>
            )
          default:
            return (
              <FileInput
                required={formSchema[field].required}
                disabled={formSchema[field].disabled}
                aria-required={formSchema[field].required}
                label={field}
                onChange={handleFileChange(field)}
                onBlur={formik.handleBlur}
                errorMessage={getErrorMessage(field)}
                key={field}
              />
            )
        }
      })}
    </>
  )
}

export default FormBuilder
