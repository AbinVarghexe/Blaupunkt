import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './Components/Common/Navbar'
import Footer from './Components/Common/Footer'
import ErrorBoundary from './Components/Common/ErrorBoundary'
import HomePage from './Pages/HomePage'
import Products from './Pages/Products'
import ChargingCables from './Pages/ChargingCables'
import ChargingStations from './Pages/ChargingStations'

import ContactPage from './Pages/Contact'

import DCChargingStation from './Pages/DCChargingStation'
import DCSuperFastChargingStation from './Pages/DCSuperFastChargingStation'
import PortableEVCharging from './Pages/PortableEVCharging'
import NotFound from './Pages/NotFound'
import Services from './Pages/Services'
import Company from './Pages/Company'
import WhatsAppButton from './Components/Common/WhatsAppButton'


const App = () => {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router>
          <div className='min-h-screen flex flex-col'>
            <Navbar />
            <main className='flex-grow pt-20 lg:pt-24'>
              <ErrorBoundary>
                <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/products' element={<Products />} />
                  <Route path='/charging-cables' element={<ChargingCables />} />
                  <Route path='/charging-stations' element={<ChargingStations />} />
                  <Route path='/dc-charging-station' element={<DCChargingStation />} />
                  <Route path='/dc-super-fast-charging-station' element={<DCSuperFastChargingStation />} />
                  <Route path='/portable-ev-charging' element={<PortableEVCharging />} />
                  <Route path='/services' element={<Services />} />
                  <Route path='/company' element={<Company />} />
                  <Route path='/contact' element={<ContactPage />} />
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </ErrorBoundary>
            </main>
            {/* Global floating WhatsApp button */}
            <WhatsAppButton />
            <Footer />
          </div>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  )
}

export default App
