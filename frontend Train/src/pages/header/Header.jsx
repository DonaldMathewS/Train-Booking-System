import React, { useState } from 'react'
import './Header.css'
import Navbar from '../navbar/Navbar'
import ExploreTrain from '../../components/Explore Train/ExploreTrain'
import TrainTicket from '../../components/trainTicket/TrainTicket'
import BusList from '../../components/TicketDisplay/TicketDisplay'
import Footer from '../../components/Footer/Footer'


const Header = () => {
    return (
        <>

            <Navbar />
            <ExploreTrain />
            <TrainTicket />
            <BusList />
            <Footer />


        </>
    )
}

export default Header
