import React from "react";
import Link from "next/link";

import { LuBaggageClaim } from "react-icons/lu";
import Colors from "@/constants/colors";
import { useGetAllProductsQuery } from "@/redux/features/productApi";
import ProductItem from "../products/beauty/product-item";

const Offers99 = () => {
  const { data, isError, isLoading } = useGetAllProductsQuery();

  const products = data?.data || [];

  console.log("products~~", products);
  return (
    <div className="tp-section-wrappser">
      <div className="container">
        {/* title */}
        <div className="row my-3">
          <div className="col-xl-12">
            <div className="tp-section-title-wrapper d-flex align-items-center justify-content-between ">
              <div className="tp-section-title-box d-flex align-items-center">
                {/* Shopping cart icon */}
                <div className="tp-section-title-icon me-1">
                  <LuBaggageClaim
                    style={{
                      color: Colors.primary,
                      fontSize: "24px",
                      fontWeight: "600",
                      margin: 0,
                    }}
                  />
                </div>
                <h3
                  className="tp-section-title"
                  style={{
                    color: Colors.primary,
                    fontSize: "24px",
                    fontWeight: "600",
                    margin: 0,
                    letterSpacing: "0.5px",
                  }}
                >
                  99TK OFFER
                </h3>
              </div>

              {/* See All link */}
              <div className="tp-section-title-see-all">
                <Link
                  href="/offers/99tk"
                  className="tp-link-btn d-flex align-items-center"
                  style={{
                    color: "#666",
                    textDecoration: "none",
                    fontSize: "16px",
                    fontWeight: "500",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = Colors.primary)}
                  onMouseLeave={(e) => (e.target.style.color = "#666")}
                >
                  See All
                  <svg
                    className="ms-2"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.146 4.146a.5.5 0 0 1 .708 0L10.207 7.5l-3.353 3.354a.5.5 0 0 1-.708-.708L8.793 7.5 6.146 4.854a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <br />
          <hr className="mt-2" />
        </div>

        {/* Products Grid */}
        <div className="row">
          {products &&
            products.length > 0 &&
            products.map((item) => {
              return (
                <div
                  key={item._id}
                  className="col-xl-3 col-lg-3 col-md-4 col-sm-6 mb-4"
                >
                  <ProductItem product={item} />
                </div>
              );
            })}
        </div>

        {/* Loading and Error States */}
        {isLoading && (
          <div className="row">
            <div className="col-12 text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-muted">Loading products...</p>
            </div>
          </div>
        )}

        {isError && (
          <div className="row">
            <div className="col-12 text-center py-5">
              <div className="alert alert-danger" role="alert">
                <i className="fas fa-exclamation-triangle me-2"></i>
                Error loading products. Please try again later.
              </div>
            </div>
          </div>
        )}

        {!isLoading && !isError && products.length === 0 && (
          <div className="row">
            <div className="col-12 text-center py-5">
              <div className="text-muted">
                <LuBaggageClaim size={48} className="mb-3 opacity-50" />
                <p className="h5">No products available</p>
                <p>Check back later for amazing 99TK offers!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers99;
