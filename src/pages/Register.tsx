import React from 'react'
import { AuthLayout, RegisterForm } from '../components'
import { SectionHeading } from '../styles'

const Register = () => {
  return (
    <AuthLayout>
      <SectionHeading>Register</SectionHeading>
      <RegisterForm />
    </AuthLayout>
  )
}

export default Register
