import React, { Suspense } from 'react'
import DashboardPage from './page';
import { BarLoader } from 'react-spinners';

const Dashboardlayout = () => {
  return (
    <div className='px-5'>
            <h1 className='text-6xl font-bold gradient-title mb-2'>Dashboard</h1>
            <p className='text-gray-600 mb-2'>Welcome to your dashboard. Here you can manage your settings and view your data.</p>

            {/*Dashboard Page*/}
            <Suspense fallback={<BarLoader className='mt-4' width={"100%"} color='#9333ea'/>}>
                <DashboardPage />
            </Suspense>
    </div>
  )
}

export default Dashboardlayout;