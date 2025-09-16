import React, { useState, useEffect } from "react";
import ErrorMsg from "../common/error-msg";
import { useSelector } from "react-redux";
import divisionData from "../../../public/data/division.json";
import districtData from "../../../public/data/district.json";
import upzillaData from "../../../public/data/upzilla.json";

const CheckoutBillingArea = ({ register, errors, watch }) => {
  const { user } = useSelector((state) => state.auth);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredUpzillas, setFilteredUpzillas] = useState([]);

  // Watch for division and district changes
  const selectedDivision = watch("division");
  const selectedDistrict = watch("district");

  console.log("user~~", user);

  // Filter districts based on selected division
  useEffect(() => {
    if (selectedDivision) {
      // Find the division ID from the selected division name
      const division = divisionData.divisions.find(
        (div) => div.name === selectedDivision
      );
      if (division) {
        // Filter districts that belong to this division
        const districts = districtData.districts.filter(
          (district) => district.division_id === division.id
        );
        setFilteredDistricts(districts);
      }
    } else {
      setFilteredDistricts([]);
    }
  }, [selectedDivision]);

  // Filter upzillas based on selected district
  useEffect(() => {
    if (selectedDistrict) {
      // Find the district ID from the selected district name
      const district = districtData.districts.find(
        (dist) => dist.name === selectedDistrict
      );
      if (district) {
        // Filter upzillas that belong to this district
        const upzillas = upzillaData.upazilas.filter(
          (upzilla) => upzilla.district_id === district.id
        );
        setFilteredUpzillas(upzillas);
      }
    } else {
      setFilteredUpzillas([]);
    }
  }, [selectedDistrict]);

  return (
    <div className="tp-checkout-bill-area">
      <h3 className="tp-checkout-bill-title">Billing Details</h3>

      <div className="tp-checkout-bill-form">
        <div className="tp-checkout-bill-inner">
          <div className="row">
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>
                  First Name <span>*</span>
                </label>
                <input
                  {...register("firstName", {
                    required: `firstName is required!`,
                  })}
                  name="firstName"
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  defaultValue={user?.firstName}
                />
                <ErrorMsg msg={errors?.firstName?.message} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>
                  Last Name <span>*</span>
                </label>
                <input
                  {...register("lastName", {
                    required: `lastName is required!`,
                  })}
                  name="lastName"
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                />
                <ErrorMsg msg={errors?.lastName?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>
                  Country <span>*</span>
                </label>
                <select
                  {...register("country", { required: `Country is required!` })}
                  name="country"
                  id="country"
                  className="tp-checkout-select"
                  defaultValue="Bangladesh"
                >
                  <option value="">Select Country</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="India">India</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                </select>
                <ErrorMsg msg={errors?.country?.message} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="tp-checkout-input">
                <label>
                  Division <span>*</span>
                </label>
                <select
                  {...register("division", {
                    required: `Division is required!`,
                  })}
                  name="division"
                  id="division"
                  className="tp-checkout-select"
                >
                  <option value="">Select Division</option>
                  {divisionData.divisions.map((division) => (
                    <option key={division.id} value={division.name}>
                      {division.name} ({division.bn_name})
                    </option>
                  ))}
                </select>
                <ErrorMsg msg={errors?.division?.message} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="tp-checkout-input">
                <label>
                  District <span>*</span>
                </label>
                <select
                  {...register("district", {
                    required: `District is required!`,
                  })}
                  name="district"
                  id="district"
                  className="tp-checkout-select"
                  disabled={!selectedDivision}
                >
                  <option value="">
                    {selectedDivision
                      ? "Select District"
                      : "Select Division First"}
                  </option>
                  {filteredDistricts.map((district) => (
                    <option key={district.id} value={district.name}>
                      {district.name} ({district.bn_name})
                    </option>
                  ))}
                </select>
                <ErrorMsg msg={errors?.district?.message} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="tp-checkout-input">
                <label>
                  Upzilla <span>*</span>
                </label>
                <select
                  {...register("upzilla", { required: `Upzilla is required!` })}
                  name="upzilla"
                  id="upzilla"
                  className="tp-checkout-select"
                  disabled={!selectedDistrict}
                >
                  <option value="">
                    {selectedDistrict
                      ? "Select Upzilla"
                      : "Select District First"}
                  </option>
                  {filteredUpzillas.map((upzilla) => (
                    <option key={upzilla.id} value={upzilla.name}>
                      {upzilla.name} ({upzilla.bn_name})
                    </option>
                  ))}
                </select>
                <ErrorMsg msg={errors?.upzilla?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>Street address</label>
                <input
                  {...register("address", { required: `Address is required!` })}
                  name="address"
                  id="address"
                  type="text"
                  placeholder="House number and street name"
                />
                <ErrorMsg msg={errors?.address?.message} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>Town / City</label>
                <input
                  {...register("city", { required: `City is required!` })}
                  name="city"
                  id="city"
                  type="text"
                  placeholder="City"
                />
                <ErrorMsg msg={errors?.city?.message} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>Postcode ZIP</label>
                <input
                  {...register("zipCode", { required: `zipCode is required!` })}
                  name="zipCode"
                  id="zipCode"
                  type="text"
                  placeholder="Postcode ZIP"
                />
                <ErrorMsg msg={errors?.zipCode?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>
                  Phone <span>*</span>
                </label>
                <input
                  {...register("contactNo", {
                    required: `ContactNumber is required!`,
                  })}
                  name="contactNo"
                  id="contactNo"
                  type="text"
                  placeholder="Phone"
                />
                <ErrorMsg msg={errors?.contactNo?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>
                  Email address <span>*</span>
                </label>
                <input
                  {...register("email", { required: `Email is required!` })}
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Email"
                  defaultValue={user?.email}
                />
                <ErrorMsg msg={errors?.email?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>Order notes (optional)</label>
                <textarea
                  {...register("orderNote", { required: false })}
                  name="orderNote"
                  id="orderNote"
                  placeholder="Notes about your order, e.g. special notes for delivery."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutBillingArea;
