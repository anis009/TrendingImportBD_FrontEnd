import React from "react";
import Link from "next/link";
import { useGetAllCategoriesQuery } from "@/redux/features/categoryApi";
import Colors from "@/constants/colors";
import { FaCheck } from "react-icons/fa";
// Import JSON file from the correct path
import topCategories from "../../../public/data/topCategories.json";

const TopCategories = () => {
  // const { data, isError, isLoading } = useGetAllCategoriesQuery();
  const categories = topCategories || [];
  console.log("topCategories~~", topCategories);

  // Color mapping for each category group
  const getBackgroundColor = (title) => {
    switch (title) {
      case "Be Beautiful":
        return "#F5E6E8"; // Pink
      case "Be Gorgeous":
        return "#E8E6F5"; // Purple
      case "Be Elegant":
        return "#E6F5F0"; // Light teal
      case "Be Pretty":
        return "#F0F5E6"; // Light green
      default:
        return "#F8F9FA";
    }
  };

  return (
    <div className="tp-section-wrapper">
      <div className="container">
        {/* Header Section */}
        <div className="row my-4">
          <div className="col-12">
            <div className="d-flex align-items-center justify-content-between">
              {/* Title with icon */}
              <div className="d-flex align-items-center">
                <div className="me-2">
                  <FaCheck
                    style={{
                      color: Colors.primary,
                      fontSize: "24px",
                      fontWeight: "600",
                      margin: 0,
                    }}
                  />
                </div>
                <h2
                  className="mb-0"
                  style={{
                    color: Colors.primary,
                    fontSize: "24px",
                    fontWeight: "600",
                    letterSpacing: "0.5px",
                  }}
                >
                  TOP CATEGORIES
                </h2>
              </div>

              {/* Browse All Link */}
              <div>
                <Link
                  href="/categories"
                  className="d-flex align-items-center text-decoration-none"
                  style={{
                    color: "#666",
                    fontSize: "16px",
                    fontWeight: "500",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = Colors.primary)}
                  onMouseLeave={(e) => (e.target.style.color = "#666")}
                >
                  Browse all
                  <svg
                    className="ms-1"
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
        </div>

        {/* Divider Line */}
        <div className="row">
          <div className="col-12">
            <hr
              style={{
                border: "none",
                height: "2px",
                background: `linear-gradient(to right, ${Colors.primary}, transparent)`,
                margin: "0 0 2rem 0",
              }}
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="row g-4">
          {categories.length === 0 && (
            <div className="col-12 text-center py-5">
              <div className="text-muted">
                <FaCheck
                  style={{
                    fontSize: "48px",
                    opacity: 0.5,
                    marginBottom: "1rem",
                  }}
                />
                <p className="h5">No categories available</p>
                <p>Categories will appear here soon!</p>
              </div>
            </div>
          )}

          {categories.length > 0 &&
            categories.map((categoryGroup, groupIndex) => (
              <div key={groupIndex} className="col-xl-6 col-lg-6 col-md-12 mb-4">
                <div
                  className="category-group-card p-4"
                  style={{
                    backgroundColor: getBackgroundColor(categoryGroup.title),
                    borderRadius: "20px",
                    minHeight: "300px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Group Title */}
                  <div className="text-center mb-4">
                    <h3
                      style={{
                        color: "#666",
                        fontSize: "20px",
                        fontWeight: "600",
                        margin: "0",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {categoryGroup.title}
                    </h3>
                  </div>

                  {/* Items Grid */}
                  <div className="row g-3">
                    {categoryGroup.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="col-6 col-sm-3"
                      >
                        <Link
                          href={`/shop?category=${item.categories}&subcategory=${item.subCategories}`}
                          className="text-decoration-none"
                        >
                          <div
                            className="category-item text-center"
                            style={{
                              transition: "all 0.3s ease",
                              cursor: "pointer",
                              padding: "15px 10px",
                              borderRadius: "15px",
                              background: "rgba(255,255,255,0.3)",
                              backdropFilter: "blur(10px)",
                              border: "1px solid rgba(255,255,255,0.4)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = "translateY(-5px)";
                              e.currentTarget.style.background = "rgba(255,255,255,0.5)";
                              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "translateY(0)";
                              e.currentTarget.style.background = "rgba(255,255,255,0.3)";
                              e.currentTarget.style.boxShadow = "none";
                            }}
                          >
                            {/* Item Image */}
                            <div className="mb-3 d-flex justify-content-center">
                              <div
                                style={{
                                  width: "80px",
                                  height: "80px",
                                  borderRadius: "12px",
                                  overflow: "hidden",
                                  background: "rgba(255,255,255,0.8)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  border: "2px solid rgba(255,255,255,0.6)",
                                }}
                              >
                                <img
                                  src={item.img || "/assets/img/category/category-placeholder.svg"}
                                  alt={item.name}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                  onError={(e) => {
                                    e.target.src = "/assets/img/category/category-placeholder.svg";
                                  }}
                                />
                              </div>
                            </div>

                            {/* Item Name */}
                            <h6
                              style={{
                                color: "#333",
                                fontSize: "14px",
                                fontWeight: "600",
                                margin: "0",
                                textAlign: "center",
                                lineHeight: "1.2",
                              }}
                            >
                              {item.name}
                            </h6>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Show More Button */}
        <div className="row">
          <div className="col-12 text-center mt-4">
            <Link
              href="/categories"
              className="btn px-5 py-3"
              style={{
                background: Colors.primary,
                color: "white",
                border: "none",
                borderRadius: "25px",
                fontWeight: "600",
                textDecoration: "none",
                fontSize: "16px",
                transition: "all 0.3s ease",
                boxShadow: `0 4px 15px ${Colors.primary}30`,
              }}
              onMouseEnter={(e) => {
                e.target.style.background = Colors.primary;
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = `0 8px 25px ${Colors.primary}40`;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = Colors.primary;
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = `0 4px 15px ${Colors.primary}30`;
              }}
            >
              View All Categories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCategories;
