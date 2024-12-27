import React from "react";

const CarAdditionalOptions = ({ additionalOptions }) => {
  console.log(additionalOptions);

  // Function to handle the sanitization of the image names
  const sanitizeImageName = (name) => {
    switch (name) {
      case "Dtc OFF":
        return "dtc-removal";
      case "Cold Start Noise":
        return "cold-start-noise";
      case "Hardcut Popcorn Limiter (Diesel Only)":
        return "pop-bang-crackle-map";
      case "Gpf/Opf OFF":
        return "gpf_removal";
      case "Dpf/Fap OFF":
        return "dpf-off";
      case "Readiness Calibration":
        return "readiness_calibration";
      case "Bmw Sports Display":
        return "bmw";
      case "Adblue/Src OFF":
        return "adblue";
      case "Maf OFF":
        return "maf_removal";
      case "Speed Limit OFF":
        return "bune";
      case "TQ Monitoring Off":
        return "detac";
      case "Pop&Bang":
        return "pop-bang-crackle-map";
      case "Start/Stop Disable":
        return "start-stop-off";
      case "Tva Off":
        return "anti-lag";
      case "Immo OFF":
        return "immo-off";
      case "Sap Delete":
        return "sap_removal";
      case "Evap Removal":
        return "evap_removal";
      case "Swirl Flaps":
        return "flaps";
      case "Exhaust Flap Removal":
        return "flaps";
      case "O2/Lamba OFF":
        return "lambda-o2-off";
      case "Hot Start":
        return "launch_control";
      case "Egr OFF":
        return "egr";
      default:
        // For any other name, replace spaces with underscores (if needed)
        return name.replace(/[^a-zA-Z0-9]/g, "_");
    }
  };

  return (
    <section className="sub-bg ">
      <div className="container">
        <div className="row">
          <h3>Zus&#228;tzliche Optionen</h3>
        </div>
        <div className="row mt-30 line-height-35">
          {additionalOptions && additionalOptions.length > 0 ? (
            additionalOptions.map((option) => {
              const sanitizedImageName = sanitizeImageName(option.characteristic_name); // Get sanitized image name

              return (
                <div
                  key={option.characteristic_id}
                  className="col-lg-3 col-md-4 col-4 mb-3 mr-5 p-1 d-flex align-items-center butn curve"
                  style={{ backgroundColor: "#2b2d42", color: "white" }}
                >
                  <div className="">
                    {/* Dynamically set the image source based on the sanitized characteristic name */}
                    <img
                     src={`/img/caroptions/${sanitizedImageName}.png`}
                      alt={option.characteristic_name}
                      className="img-fluid"
                    />
                  </div>
                  <div className="ml-3">
                    <span>{option.characteristic_name}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No additional options available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CarAdditionalOptions;
