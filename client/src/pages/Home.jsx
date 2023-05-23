import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import ScrollToTop from "react-scroll-to-top";

const Home = () => {
  return (
    // <div>
    //   <Navbar />
    //   <Slider />
    //   <Categories />
    //   <Products/>
    //   <Newsletter/>
    //   <Footer/>
    // </div>
     <div>
     <ScrollToTop smooth color="white" style={{backgroundColor: "gray",opacity:"50%"}}/>
     <Navbar />
     <Announcement />
     <Slider />
     <Categories />
     <Products/>
     <Newsletter/>
     <Footer/>
   </div>
  );
};

export default Home;
