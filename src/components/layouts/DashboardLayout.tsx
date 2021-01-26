import React from 'react'
import { Wrapper } from '../../styles/dashboardLayout'
import Header from './Header'
import Sidebar from './Sidebar'

const DashboardLayout: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <aside>
        <Sidebar />
      </aside>
      <main>
        <header>
          <Header />
        </header>
        <section>{children}</section>
      </main>
    </Wrapper>
  )
}

export default DashboardLayout
