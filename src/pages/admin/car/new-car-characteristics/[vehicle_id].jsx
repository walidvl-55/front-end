import React from "react";
import { useRouter } from 'next/router';
import blog2Data from "../../../../data/blog2.json";
import LightTheme from "../../../../layouts/Light";
import NavbarFullMenu from "../../../../components/navbar-full-menu/navbar.full-menu";
import PageHeader from "../../../../components/Page-header/page-header";
import Footer from "../../../../components/Footer/footer";
import NewCarCharacteristics from "../../../../components/New-car-characteristics/new-car-characteristics";
import NewCar from "../../../../components/New-car/new-car";
const NewCarDetailsLight = () => {
  const [isLoading, setIsLoading] = React.useState(true); // Loading state
  const router = useRouter();
  var { vehicle_id } = router.query; // Get the blog ID from the URL


  return (
    <LightTheme>
      <div className="circle-bg">
        <div className="circle-color fixed">
          <div className="gradient-circle"></div>
          <div className="gradient-circle two"></div>
        </div>
      </div>
      <NavbarFullMenu theme="light" />
      <PageHeader  className="sub-bg" title="Details des Autos hinzuf&uuml;gen." paragraph="Alle aktuellen Auto und Veranstaltungen unseres kreativen Teams."/>

     <NewCarCharacteristics vehicleID={vehicle_id}/>

      <Footer />
    </LightTheme>
  );
};

export default NewCarDetailsLight;
