import React from 'react'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Announcement from '../components/Announcement'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import NavbarLogedIn from '../components/NavbarLogedIn';

const HomeLogedInUser = () => {
  return (
    <div>
      <NavbarLogedIn/>
      <Announcement/>
      <Slider/>
      <Categories/>
      <Products/>
      <Newsletter/>
      <Footer/>
    </div>
  )
}

export default HomeLogedInUser
