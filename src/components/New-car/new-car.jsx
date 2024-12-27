import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useRouter } from "next/router";


const NewCar = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [engines, setEngines] = useState([]);
  const [ecus, setEcus] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [tunings, setTunings] = useState([]);
;
const router = useRouter(); // For navigation after submission

  // Fetch data from backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/vehiclesinfos");
        setCategories(response.data.categories);
        setBrands(response.data.brands);
        setModels(response.data.models);
        setEcus(response.data.ecus);
        setEngines(response.data.engines);
        setGenerations(response.data.generations);
        setTunings(response.data.tuning);
      } catch (error) {
        console.error("Error fetching vehicle data", error);
      }
    };

    fetchData();


  }, []);


  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const dataToSend = {
        ...values,
      };

      console.log("Sending data to API:", dataToSend);

      // Make the API call
      const response = await axios.post("http://localhost:8000/api/vehicle/create", dataToSend);

      // Log the API response
      console.log("Response from API:", response.data);

      // Show a message to the user with the response message and vehicle ID
      alert(`Vehicle created successfully! Message: ${response.data.message}, Vehicle ID: ${response.data.vehicle_id}`);

      // Redirect to the new car details page using the returned vehicle ID
      router.push(`/admin/car/new-car-characteristics/${response.data.vehicle_id}`);

    } catch (error) {
      // Handle errors more comprehensively
      if (error.response) {
        // Errors from the server (status codes outside of 2xx)
        console.error("API error response:", error.response.data);
        alert(`Error: ${error.response.data.message || "Failed to create vehicle"}`);
      } else if (error.request) {
        // Network errors or no response from server
        console.error("No response received:", error.request);
        alert("Error: No response received from the server. Please check your network.");
      } else {
        // Other errors
        console.error("Error creating vehicle:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
};


  // Helper function to sort options alphabetically
  const sortOptions = (options, propertyName) => {
    return options.sort((a, b) => {
      if (a[propertyName] && b[propertyName]) {
        return a[propertyName].localeCompare(b[propertyName]);
      }
      return 0;
    });
  };

  return (
    <div className="container">
      <h2>Neues Fahrzeug anlegen</h2>
      <Formik
        initialValues={{
          // Vehicle details
          vehicle_name: "",
          vehicle_fuel: "",
          vehicle_category: "",
          vehicle_model: "",
          vehicle_brand: "",
          vehicle_engine: "",
          vehicle_ecu: "",
          vehicle_generation: "",
          vehicle_standard_power: "",
          vehicle_standard_torque: "",
          vehicle_cylinder: "",
          vehicle_bore: "",
          vehicle_compression: "",

          // Vehicle tuning
          vehicle_tuning: "",

          // Vehicle data chart
          vehicle_data_oem_power_chart: "",
          vehicle_data_oem_torque_chart: "",
          vehicle_data_rpm: "",

          // Vehicle tuning details
          vehicle_tuning_difference_power: "",
          vehicle_tuning_difference_torque: "",
          vehicle_tuning_max_power: "",
          vehicle_tuning_max_torque: "",
          vehicle_tuning_power_chart: "",
          vehicle_tuning_torque_chart: "",


        }}
        validate={(values) => {
          const errors = {};
          if (!values.vehicle_name) errors.vehicle_name = "Vehicle name is required";
          if (!values.vehicle_fuel) errors.vehicle_fuel = "Fuel type is required";
          if (!values.vehicle_category) errors.vehicle_category = "Category is required";
          if (!values.vehicle_compression) errors.vehicle_compression = "Compression is required";
          if (!values.vehicle_bore) errors.vehicle_bore = "Bore is required";
          if (!values.vehicle_cylinder) errors.vehicle_cylinder = "Cylinder is required";
          if (!values.vehicle_model) errors.vehicle_model = "Model is required";
          if (!values.vehicle_brand) errors.vehicle_brand = "Brand is required";
          if (!values.vehicle_engine) errors.vehicle_engine = "Engine is required";
          if (!values.vehicle_ecu) errors.vehicle_ecu = "ECU is required";
          if (!values.vehicle_generation) errors.vehicle_generation = "Generation is required";

          // Validate power and torque fields to be numbers
          if (!values.vehicle_standard_power) {
            errors.vehicle_standard_power = "Standard power is required";
          } else if (isNaN(values.vehicle_standard_power)) {
            errors.vehicle_standard_power = "Standard power must be a number";
          }
          if (!values.vehicle_standard_torque) {
            errors.vehicle_standard_torque = "Standard torque is required";
          } else if (isNaN(values.vehicle_standard_torque)) {
            errors.vehicle_standard_torque = "Standard torque must be a number";
          }

          // Validate that the chart fields are comma-separated numbers
          const validateChart = (fieldValue) => {
            const numbers = fieldValue.split(",").map((num) => num.trim());
            return numbers.every((num) => !isNaN(num)) ? undefined : "Invalid chart values";
          };

          if (values.vehicle_data_oem_power_chart && validateChart(values.vehicle_data_oem_power_chart)) {
            errors.vehicle_data_oem_power_chart = "OEM Power Chart values must be comma-separated numbers";
          }
          if (values.vehicle_data_oem_torque_chart && validateChart(values.vehicle_data_oem_torque_chart)) {
            errors.vehicle_data_oem_torque_chart = "OEM Torque Chart values must be comma-separated numbers";
          }
          if (values.vehicle_data_rpm && validateChart(values.vehicle_data_rpm)) {
            errors.vehicle_data_rpm = "RPM values must be comma-separated numbers";
          }
          if (values.vehicle_tuning_power_chart && validateChart(values.vehicle_tuning_power_chart)) {
            errors.vehicle_tuning_power_chart = "Tuning Power Chart values must be comma-separated numbers";
          }
          if (values.vehicle_tuning_torque_chart && validateChart(values.vehicle_tuning_torque_chart)) {
            errors.vehicle_tuning_torque_chart = "Tuning Torque Chart values must be comma-separated numbers";
          }

          return errors;
        }}

        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form className="d-flex flex-column column-gap-3 mt-4" style={{gap: "1rem"}}>
            <div className="row">
              <div className="col-4">
                <label>Category</label>
                <Field as="select" name="vehicle_category" className="form-control">
                  <option value="">Select Category</option>
                  {sortOptions(categories, 'category_name').map((category) => (
                    <option key={category.category_id} value={category.category_id}>
                      {category.category_name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="vehicle_category" component="div" className="text-danger" />
              </div>

              {/* Vehicle Name */}
              <div className="col-4">
                <label>Vehicle Name</label>
                <Field type="text" name="vehicle_name" className="form-control" />
                <ErrorMessage name="vehicle_name" component="div" className="text-danger" />
              </div>

              {/* Fuel Type */}
              <div className="col-4">
                <label>Fuel Type</label>
                <Field as="select" name="vehicle_fuel" className="form-control">
                    <option value="">Select Fuel Type</option>
                    <option value="Diesel">
                      Diesel
                    </option>
                    <option value="Petrol">
                      Petrol
                    </option>
                    <option value="Hybrid">
                      Hybrid
                    </option>
                </Field>
                <ErrorMessage name="vehicle_fuel" component="div" className="text-danger" />
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <label>Bore</label>
                <Field type="text" name="vehicle_bore" className="form-control"/>
                <ErrorMessage name="vehicle_bore" component="div" className="text-danger" />
              </div>

              {/* Vehicle Compression */}
              <div className="col-4">
                <label>Compression</label>
                <Field type="text" name="vehicle_compression" className="form-control"/>
                <ErrorMessage name="vehicle_compression" component="div" className="text-danger" />
              </div>

              {/* Fuel Cylinder */}
              <div className="col-4">
                <label>Cylinder</label>
                <Field type="text" name="vehicle_cylinder" className="form-control"/>
                <ErrorMessage name="vehicle_cylinder" component="div" className="text-danger" />
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <label>Brand</label>
                <Field as="select" name="vehicle_brand" className="form-control">
                  <option value="">Select Brand</option>
                  {sortOptions(brands, 'brand_name').map((brand) => (
                    <option key={brand.brand_id} value={brand.brand_id}>
                      {brand.brand_name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="vehicle_brand" component="div" className="text-danger" />
              </div>

              {/* Model */}
              <div className="col-4">
                <label>Model</label>
                <Field as="select" name="vehicle_model" className="form-control">
                  <option value="">Select Model</option>
                  {sortOptions(models, 'model_name').map((model) => (
                    <option key={model.model_id} value={model.model_id}>
                      {model.model_name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="vehicle_model" component="div" className="text-danger" />
              </div>

              {/* Engine */}
              <div className="col-4">
                <label>Engine</label>
                <Field as="select" name="vehicle_engine" className="form-control">
                  <option value="">Select Engine</option>
                  {sortOptions(engines, 'engine_name').map((engine) => (
                    <option key={engine.engine_id} value={engine.engine_id}>
                      {engine.engine_name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="vehicle_engine" component="div" className="text-danger" />
              </div>
            </div>

            <div className="row">
              {/* ECU */}
              <div className="col-4">
                <label>ECU</label>
                <Field as="select" name="vehicle_ecu" className="form-control">
                  <option value="">Select ECU</option>
                  {sortOptions(ecus, 'ecu_name').map((ecu) => (
                    <option key={ecu.ecu_id} value={ecu.ecu_id}>
                      {ecu.ecu_name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="vehicle_ecu" component="div" className="text-danger" />
              </div>

              {/* Generation */}
              <div className="col-4">
                <label>Generation</label>
                <Field as="select" name="vehicle_generation" className="form-control">
                  <option value="">Select Generation</option>
                  {sortOptions(generations, 'generation_name').map((generation) => (
                    <option key={generation.generation_id} value={generation.generation_id}>
                      {generation.generation_name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="vehicle_generation" component="div" className="text-danger" />
              </div>

              {/* Tuning */}
              <div className="col-4">
                <label>Tuning</label>
                <Field as="select" name="vehicle_tuning" className="form-control">
                  <option value="">Select Tuning</option>
                  {sortOptions(tunings, 'tuning_name').map((tuning) => (
                    <option key={tuning.tuning_id} value={tuning.tuning_id}>
                      {tuning.tuning_name}
                    </option>
                  ))}
                </Field>
              </div>
            </div>

            {/* New Standard Power and Torque Fields */}
            <div className="row">
              <div className="col-4">
                <label>Standard Power (hp)</label>
                <Field type="number" name="vehicle_standard_power" className="form-control" />
                <ErrorMessage name="vehicle_standard_power" component="div" className="text-danger" />
              </div>

              <div className="col-4">
                <label>Standard Torque (Nm)</label>
                <Field type="number" name="vehicle_standard_torque" className="form-control" />
                <ErrorMessage name="vehicle_standard_torque" component="div" className="text-danger" />
              </div>
            </div>

            {/* Vehicle Data Charts */}
            <div className="row">
                <div className="col-4">
                  <label>OEM Power Chart</label>
                  <Field type="text" name="vehicle_data_oem_power_chart" className="form-control" />
                  <ErrorMessage name="vehicle_data_oem_power_chart" component="div" className="text-danger" />
                </div>

                <div className="col-4">
                  <label>OEM Torque Chart</label>
                  <Field type="text" name="vehicle_data_oem_torque_chart" className="form-control" />
                  <ErrorMessage name="vehicle_data_oem_torque_chart" component="div" className="text-danger" />
                </div>

                <div className="col-4">
                  <label>RPM</label>
                  <Field type="text" name="vehicle_data_rpm" className="form-control" />
                  <ErrorMessage name="vehicle_data_rpm" component="div" className="text-danger" />
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <label>Tuning Power Chart</label>
                  <Field type="text" name="vehicle_tuning_power_chart" className="form-control" />
                  <ErrorMessage name="vehicle_tuning_power_chart" component="div" className="text-danger" />
                </div>

                <div className="col-4">
                  <label>Tuning Torque Chart</label>
                  <Field type="text" name="vehicle_tuning_torque_chart" className="form-control" />
                  <ErrorMessage name="vehicle_tuning_torque_chart" component="div" className="text-danger" />
                </div>

                <div className="col-4">
                  <label>Tuning Max Power</label>
                  <Field type="number" name="vehicle_tuning_max_power" className="form-control" />
                  <ErrorMessage name="vehicle_tuning_max_power" component="div" className="text-danger" />
                </div>
              </div>

              <div className="row row-gap-3">
                <div className="col-4">
                  <label>Tuning Max Torque</label>
                  <Field type="number" name="vehicle_tuning_max_torque" className="form-control" />
                  <ErrorMessage name="vehicle_tuning_max_torque" component="div" className="text-danger" />
                </div>

                <div className="col-4">
                  <label>Tuning Difference Torque</label>
                  <Field type="number" name="vehicle_tuning_difference_torque" className="form-control" />
                  <ErrorMessage name="vehicle_tuning_difference_torque" component="div" className="text-danger" />
                </div>

                <div className="col-4">
                  <label>Tuning Difference Power</label>
                  <Field type="number" name="vehicle_tuning_difference_power" className="form-control" />
                  <ErrorMessage name="vehicle_tuning_difference_power" component="div" className="text-danger" />
                </div>
              </div>

              <div className="row">
              <div className="col-12">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewCar;
