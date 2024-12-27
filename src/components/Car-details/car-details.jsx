import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import Split from "../Split";

const CarDetails = ({ vehicleDetails }) => {
  // Initialize the data arrays
  let rpm = [];
  let power = [];
  let torque = [];
  let tuningPower = [];
  let tuningTorque = [];
console.log(vehicleDetails);
  // Extract and convert the vehicle data
  if (vehicleDetails) {
    // RPM Data
    let test = vehicleDetails?.data_chart?.vehicle_data_rpm?.split(",") || [];
    rpm = test.map((item) => Number(item));

    // OEM Power Data
    test =
      vehicleDetails?.data_chart?.vehicle_data_oem_power_chart?.split(",") ||
      [];
    power = test.map((item) => Number(item));

    // OEM Torque Data
    test =
      vehicleDetails?.data_chart?.vehicle_data_oem_torque_chart?.split(",") ||
      [];
    torque = test.map((item) => Number(item));

    // Tuning Power Data
    test =
      vehicleDetails?.vehicle_tuning?.vehicle_tuning_power_chart?.split(",") ||
      [];
    tuningPower = test.map((item) => Number(item));

    // Tuning Torque Data
    test =
      vehicleDetails?.vehicle_tuning?.vehicle_tuning_torque_chart?.split(",") ||
      [];
    tuningTorque = test.map((item) => Number(item));
  }

  const FinalPower = vehicleDetails.vehicle_standard_power + vehicleDetails.vehicle_tuning.vehicle_tuning_difference_power ;
  const FinaleTorque = vehicleDetails.vehicle_standard_torque + vehicleDetails.vehicle_tuning.vehicle_tuning_difference_torque;

  return (
    <section className="sub-bg">
      <div className="container">
        <div className="row">
          <div className="col-md-8 mt-50">
            <div key="1" className="col-md-3 col-6 brands">
              <div className="item wow fadeIn" data-wow-delay=".3s">
                <div className="img">
                  <img src="" alt="" />
                  <Split>
                    <a
                      href="#0"
                      className="link words chars splitting"
                      data-splitting
                    >
                      {vehicleDetails
                        ? vehicleDetails.brand.brand_name
                        : "Loading..."}
                    </a>
                  </Split>
                </div>
              </div>
            </div>
            <h4>
              {vehicleDetails
                ? `${vehicleDetails.vehicle_name}`
                : "Loading vehicle details..."}
            </h4>
            <h6 className="mb-70">
              Geschätzte 30%:Leistung mehr Leistung und 40%:Drehmoment mehr
              Drehmoment
            </h6>
          </div>

          <div className="col-md-6 mt-40">
            <table className="table table-bordered text-center">
              <thead>
                <tr style={{ backgroundColor: "#f0f0f0" }}>
                  <th>Parameter</th>
                  <th> Original</th>
                  <th>
                    {vehicleDetails
                      ? vehicleDetails.tuning.tuning_name
                      : "Loading..."}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: "#f0f0f0" }}>
                  <th>Pferdest&auml;rken (Bhp)</th>
                  <td style={{ backgroundColor: "#e0f7fa" }}>
                    {vehicleDetails
                      ? vehicleDetails.vehicle_standard_power
                      : "Loading..."}
                  </td>
                  <td style={{ backgroundColor: "#ffe0b2" }}>
                    <strong>{FinalPower} </strong> Bhp
                  </td>
                </tr>

                <tr style={{ backgroundColor: "#f0f0f0" }}>
                  <th>Drehmoment (Nm)</th>
                  <td style={{ backgroundColor: "#e0f7fa" }}>
                    {vehicleDetails
                      ? vehicleDetails.vehicle_standard_torque
                      : "Loading..."}
                  </td>
                  <td style={{ backgroundColor: "#ffe0b2" }}>
                    <strong>{FinaleTorque}</strong> Nm
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Line Chart on the left side */}
          <div className="col-md-6 ml-60 mt-30">
            <LineChart
              width={500}
              height={350}
              series={[
                { curve: "linear", data: power, label: "OEM Power" },
                { curve: "linear", data: torque, label: "OEM Torque" },
                { curve: "linear", data: tuningPower, label: "Stage 1 Power" },
                {
                  curve: "linear",
                  data: tuningTorque,
                  label: "Stage 1 Torque",
                },
              ]}
              xAxis={[{ scaleType: "point", data: rpm }]}
            />
          </div>
        </div>
        <div className="row">
          <h2> Motoreigenschaften</h2>
        </div>
        <div className="row">
          <table class="table table-striped table-hover">
            <tbody>
              <tr>
                <th className="col-lg-6 col-md-4" scope="row">
                Kraftstofftyp
                </th>
                <td>        {vehicleDetails
                ? `${vehicleDetails.vehicle_fuel}`
                : "Loading vehicle details..."} </td>
              </tr>
              <tr>
                <th className="col-lg-6 col-md-4" scope="row">
                Abstimmungstyp
                </th>
                <td>         {vehicleDetails
                ? `${vehicleDetails.tuning.tuning_name}`
                : "Loading vehicle details..."}</td>
              </tr>
              <tr>
                <th className="col-lg-6 col-md-4" scope="row">
                Motor-Steuerger&auml;t
                </th>
                <td>         {vehicleDetails
                ? `${vehicleDetails.ecu.ecu_name}`
                : "Loading vehicle details..."} </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CarDetails;
