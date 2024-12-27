import React, { useEffect, useState, useRef } from "react";
import axios from "axios"; // Import axios to make API requests
import Navbar from "../../components/Navbar/navbar";
import WorksHeader from "../../components/Works-header/works-header";
import LightTheme from "../../layouts/Light";
import CarDetails from "../../components/Car-details/car-details";
import CarAdditionalOptions from "../../components/Car-additional-options/car-additional-options";
import Footer from "../../components/Footer/footer";
import Head from "next/head"; // Import Head from next/head

const Cardetailsvg = () => {
  const fixedHeader = React.useRef(null);
  const MainContent = React.useRef(null);
  const navbarRef = React.useRef(null);
  const logoRef = React.useRef(null);

  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [additionalOptions, setAdditionalOptions] = useState([]);
  const [error, setError] = useState(null);
  const [vehicleBrand, setVehicleBrand] = useState('');
  const [vehicleName, setVehicleName] = useState('');

  React.useEffect(() => {
    setInterval(() => {
      if (fixedHeader.current) {
        var slidHeight = fixedHeader.current.offsetHeight;
      }
      if (MainContent.current) {
        MainContent.current.style.marginTop = slidHeight + "px";
      }
    }, 1000);
    var navbar = navbarRef.current;
    if (window.pageYOffset > 300) {
      navbar.classList.add("nav-scroll");
    } else {
      navbar.classList.remove("nav-scroll");
    }
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        navbar.classList.add("nav-scroll");
      } else {
        navbar.classList.remove("nav-scroll");
      }
    });
  }, [fixedHeader, MainContent, navbarRef]);


  useEffect(() => {


    // Retrieve stored values from localStorage
    const selectedCategory = localStorage.getItem("selectedCategory");
    const selectedBrand = localStorage.getItem("selectedBrand");
    const selectedModel = localStorage.getItem("selectedModel");
    const selectedGeneration = localStorage.getItem("selectedGeneration");
    const selectedEngine = localStorage.getItem("selectedEngine");
    const selectedEcu = localStorage.getItem("selectedEcu");

    // Check if any of the required data is missing
    const missingData = [];
    if (!selectedCategory) missingData.push("selectedCategory");
    if (!selectedBrand) missingData.push("selectedBrand");
    if (!selectedModel) missingData.push("selectedModel");
    if (!selectedGeneration) missingData.push("selectedGeneration");
    if (!selectedEngine) missingData.push("selectedEngine");
    if (!selectedEcu) missingData.push("selectedEcu");

    if (missingData.length > 0) {
      setError(`Missing data in localStorage: ${missingData.join(", ")}`);
      return; // Stop further execution if data is missing
    }

    // Prepare the request data
    const requestData = {
      category_id: selectedCategory,
      brand_id: selectedBrand,
      model_id: selectedModel,
      generation_id: selectedGeneration,
      engine_id: selectedEngine,
      ecu_id: selectedEcu,
    };

    console.log("Request Data: ", requestData); // Log the request data

    // Fetch vehicle details from the API using the selected values
    axios
      .get("http://127.0.0.1:8000/api/vehicles/details", { params: requestData })
      .then((response) => {
        const [vehicle, additional] = response.data; // Destructure the response data
        setVehicleDetails(vehicle); // Set the first object (vehicle details)
        setAdditionalOptions(additional); // Set the second object (additional options)
        setVehicleBrand(vehicle.brand.brand_name);
        setVehicleName(vehicle.vehicle_name);
        // Log the fetched additional options
        console.log("Fetched Additional Options: ", additional);
      })
      .catch((err) => {
        setError("Error fetching vehicle details: " + err.message);
        console.error(err); // Log the error for debugging
      });
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  // Conditional rendering based on error state
  if (error) {
    return (
      <LightTheme>
        <Head>
          <title>Error - Vehicle Details</title>
        </Head>
        <div className="circle-bg">
          <div className="circle-color fixed">
            <div className="gradient-circle"></div>
            <div className="gradient-circle two"></div>
          </div>
        </div>
        <Navbar nr={navbarRef} lr={logoRef} theme="themeL" />
        <WorksHeader sliderRef={fixedHeader} />
        <div className="main-content">
          <p>{error}</p> {/* Show error message */}
        </div>
        <Footer />
      </LightTheme>
    );
  }

  return (
    <LightTheme>
      <Head>
        <title>
          {vehicleDetails ? `${vehicleDetails.vehicle_name} - Vehicle Details` : "Loading Vehicle Details..."}
        </title>
      </Head>
      <div className="circle-bg">
        <div className="circle-color fixed">
          <div className="gradient-circle"></div>
          <div className="gradient-circle two"></div>
        </div>
      </div>
      <Navbar nr={navbarRef} lr={logoRef} theme="themeL" />

      <WorksHeader sliderRef={fixedHeader} brand={vehicleBrand} vehicle_name={vehicleName}/>

      <div className="main-content" ref={MainContent}> {/* Attach MainContent ref here */}
        {/* Pass the first object (vehicle details) to CarDetails */}
        {vehicleDetails ? (
          <CarDetails vehicleDetails={vehicleDetails} />
        ) : (
          <p>Loading vehicle details...</p>
        )}

        {/* Pass the second object (additional options) to CarAdditionalOptions */}
        {additionalOptions && additionalOptions.length > 0 ? (
          <CarAdditionalOptions additionalOptions={additionalOptions} />
        ) : (
          <p>Loading additional options...</p>
        )}

        <Footer />
      </div>
    </LightTheme>
  );
};

export default Cardetailsvg;
