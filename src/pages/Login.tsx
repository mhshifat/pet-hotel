import React from 'react'
import { AuthLayout, LoginForm } from '../components'
import { SectionHeading } from '../styles'

const Login = () => {
  return (
    <AuthLayout>
      <SectionHeading>Login</SectionHeading>
      <LoginForm />
    </AuthLayout>
  )
}

export default Login
