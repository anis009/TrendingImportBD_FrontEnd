import React from "react";
import Link from "next/link";
import { LuBaggageClaim } from "react-icons/lu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Colors from "@/constants/colors";
import { useGetAllProductsQuery } from "@/redux/features/productApi";
import ProductItem from "../products/beauty/product-item";
import styles from "./offers99.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Offers199 = () => {
  const { data, isError, isLoading } = useGetAllProductsQuery();

  const products = data?.data || [];

  // console.log("products~~", products);

  // Custom Arrow Components
  const CustomPrevArrow = (props) => (
    <button
      {...props}
      className={`${props.className} ${styles.slickArrow} ${styles.slickPrev}`}
      style={{
        ...props.style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#EC1766",
        border: "none",
        borderRadius: "50%",
        width: "36px", // smaller width
        height: "36px", // smaller height
        zIndex: 2,
        left: "-18px", // adjust position if needed
        top: "40%",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        cursor: "pointer",
      }}
      aria-label="Previous"
    >
      <FaChevronLeft color="#fff" size={18} /> {/* smaller icon */}
    </button>
  );

  const CustomNextArrow = (props) => (
    <button
      {...props}
      className={`${props.className} ${styles.slickArrow} ${styles.slickNext}`}
      style={{
        ...props.style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#EC1766",
        border: "none",
        borderRadius: "50%",
        width: "36px",
        height: "36px",
        zIndex: 2,
        right: "-18px",
        top: "40%",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        cursor: "pointer",
      }}
      aria-label="Next"
    >
      <FaChevronRight color="#fff" size={18} />
    </button>
  );

  const sliderSettings = {
    dots: false,
    infinite: products.length > 5,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="tp-section-wrappser mt-3">
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
                  199TK OFFER
                </h3>
              </div>

              {/* See All link */}
              <div className="tp-section-title-see-all">
                <Link
                  href="/offers/199TK"
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

        {/* Products Slideshow */}
        <Slider {...sliderSettings}>
          {products &&
            products.length > 0 &&
            products.map((item) => (
              <div key={item._id} className="px-2">
                <ProductItem product={item} />
              </div>
            ))}
        </Slider>

        {/* Loading and Error States */}
        {isLoading && (
          <div className="row">
            {[...Array(8)].map((_, idx) => (
              <div
                key={idx}
                className="col-xl-3 col-lg-3 col-md-4 col-sm-6 mb-4"
              >
                <div className="card border-0 shadow-sm">
                  <div
                    className={`${styles.skeleton} ${styles["skeleton-img"]}`}
                    style={{
                      height: "180px",
                      width: "100%",
                      borderRadius: "8px",
                    }}
                  ></div>
                  <div className="card-body">
                    <div
                      className={`${styles.skeleton} ${styles["skeleton-text"]} mb-2`}
                      style={{
                        height: "20px",
                        width: "80%",
                        borderRadius: "4px",
                      }}
                    ></div>
                    <div
                      className={`${styles.skeleton} ${styles["skeleton-text"]}`}
                      style={{
                        height: "16px",
                        width: "60%",
                        borderRadius: "4px",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
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
                <p>Check back later for amazing 199TK offers!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers199;
