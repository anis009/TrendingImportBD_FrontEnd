import React, { useState } from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";

import { useGetCategoriesHierarchyQuery } from "@/redux/features/categoryApi";
import ErrorMsg from "@/components/common/error-msg";
import Loader from "@/components/loader/loader";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";

const CategoriesPage = () => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useGetCategoriesHierarchyQuery();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const router = useRouter();

  // Handle category selection for detailed view
  const handleCategorySelect = (category) => {
    setSelectedCategory(
      selectedCategory?._id === category._id ? null : category
    );
  };

  // Navigate to shop with category filter
  const navigateToShop = (category, subCategory = null, item = null) => {
    let url = "/shop?";

    if (category) {
      url += `category=${category.slug}`;
    }

    if (subCategory) {
      url += `&subcategory=${subCategory.slug}`;
    }

    if (item) {
      url += `&item=${encodeURIComponent(item.name)}`;
    }

    router.push(url);
  };

  // Grid View Component
  const GridView = ({ categories }) => (
    <div className="row">
      {categories.map((category) => (
        <div
          key={category._id}
          className="col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-4"
        >
          <div
            className="tp-category-card"
            style={{
              background: "white",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              border:
                selectedCategory?._id === category._id
                  ? "2px solid #ff6b35"
                  : "1px solid #e9ecef",
            }}
            onClick={() => handleCategorySelect(category)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 8px 30px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 20px rgba(0, 0, 0, 0.08)";
            }}
          >
            {/* Category Header */}
            <div
              style={{
                background: "linear-gradient(135deg, #ff6b35, #ff8f65)",
                padding: "20px",
                color: "white",
                textAlign: "center",
              }}
            >
              {category.image && (
                <div style={{ marginBottom: "15px" }}>
                  <Image
                    src={category.image}
                    alt={category.title}
                    width={60}
                    height={60}
                    style={{
                      borderRadius: "50%",
                      border: "3px solid rgba(255,255,255,0.3)",
                      background: "white",
                      padding: "5px",
                    }}
                  />
                </div>
              )}
              <h4 style={{ margin: 0, fontSize: "18px", fontWeight: "700" }}>
                {category.title}
              </h4>
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "center",
                  gap: "15px",
                  fontSize: "12px",
                }}
              >
                <span>{category.totalItems || 0} items</span>
                <span>•</span>
                <span>{category.subCategoriesCount || 0} subcategories</span>
              </div>
            </div>

            {/* Category Content */}
            <div style={{ padding: "20px" }}>
              {/* Quick Actions */}
              <div
                style={{ marginBottom: "15px", display: "flex", gap: "10px" }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToShop(category);
                  }}
                  style={{
                    flex: 1,
                    background: "#f8f9fa",
                    border: "1px solid #e9ecef",
                    borderRadius: "6px",
                    padding: "8px 12px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#495057",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#ff6b35";
                    e.target.style.color = "white";
                    e.target.style.borderColor = "#ff6b35";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#f8f9fa";
                    e.target.style.color = "#495057";
                    e.target.style.borderColor = "#e9ecef";
                  }}
                >
                  View All Products
                </button>
              </div>

              {/* Subcategories Preview */}
              {category.subCategories && category.subCategories.length > 0 && (
                <div>
                  <h6
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      marginBottom: "10px",
                      color: "#2c3e50",
                    }}
                  >
                    Top Subcategories:
                  </h6>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
                  >
                    {category.subCategories.slice(0, 4).map((subCategory) => (
                      <span
                        key={subCategory._id}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToShop(category, subCategory);
                        }}
                        style={{
                          background: "#e3f2fd",
                          color: "#1976d2",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "11px",
                          fontWeight: "500",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "#1976d2";
                          e.target.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "#e3f2fd";
                          e.target.style.color = "#1976d2";
                        }}
                      >
                        {subCategory.title}
                      </span>
                    ))}
                    {category.subCategories.length > 4 && (
                      <span
                        style={{
                          background: "#f0f0f0",
                          color: "#6c757d",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "11px",
                        }}
                      >
                        +{category.subCategories.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Expand/Collapse Indicator */}
              <div
                style={{
                  textAlign: "center",
                  marginTop: "15px",
                  borderTop: "1px solid #f0f0f0",
                  paddingTop: "10px",
                }}
              >
                <i
                  className={`fa-solid fa-chevron-${
                    selectedCategory?._id === category._id ? "up" : "down"
                  }`}
                  style={{ color: "#6c757d", fontSize: "12px" }}
                ></i>
              </div>
            </div>

            {/* Detailed View (Expanded) */}
            {selectedCategory?._id === category._id && (
              <div
                style={{
                  background: "#f8f9fa",
                  borderTop: "1px solid #e9ecef",
                  padding: "20px",
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
                <h5
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    marginBottom: "15px",
                    color: "#2c3e50",
                  }}
                >
                  All Subcategories ({category.subCategories?.length || 0})
                </h5>

                <div className="row g-2">
                  {category.subCategories?.map((subCategory) => (
                    <div key={subCategory._id} className="col-6">
                      <div
                        style={{
                          background: "white",
                          border: "1px solid #e9ecef",
                          borderRadius: "8px",
                          padding: "12px",
                          transition: "all 0.2s ease",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToShop(category, subCategory);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#ff6b35";
                          e.currentTarget.style.boxShadow =
                            "0 2px 8px rgba(255, 107, 53, 0.2)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "#e9ecef";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <h6
                          style={{
                            fontSize: "13px",
                            fontWeight: "600",
                            marginBottom: "4px",
                            color: "#2c3e50",
                          }}
                        >
                          {subCategory.title}
                        </h6>
                        <span style={{ fontSize: "11px", color: "#6c757d" }}>
                          {subCategory.itemsCount || 0} items
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  // List View Component
  const ListView = ({ categories }) => (
    <div className="tp-categories-list">
      {categories.map((category) => (
        <div
          key={category._id}
          style={{
            background: "white",
            borderRadius: "8px",
            marginBottom: "15px",
            border: "1px solid #e9ecef",
            overflow: "hidden",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div
            style={{
              padding: "20px",
              borderBottom: "1px solid #f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
            onClick={() => handleCategorySelect(category)}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              {category.image && (
                <Image
                  src={category.image}
                  alt={category.title}
                  width={50}
                  height={50}
                  style={{ borderRadius: "8px" }}
                />
              )}
              <div>
                <h4
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#2c3e50",
                  }}
                >
                  {category.title}
                </h4>
                <p
                  style={{
                    margin: "5px 0 0 0",
                    fontSize: "14px",
                    color: "#6c757d",
                  }}
                >
                  {category.totalItems || 0} total items across{" "}
                  {category.subCategoriesCount || 0} subcategories
                </p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToShop(category);
                }}
                style={{
                  background: "#ff6b35",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 16px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.background = "#e55a2b")}
                onMouseLeave={(e) => (e.target.style.background = "#ff6b35")}
              >
                Shop Now
              </button>
              <i
                className={`fa-solid fa-chevron-${
                  selectedCategory?._id === category._id ? "up" : "down"
                }`}
                style={{ color: "#6c757d" }}
              ></i>
            </div>
          </div>

          {/* Expanded Subcategories */}
          {selectedCategory?._id === category._id && (
            <div style={{ padding: "20px", background: "#f8f9fa" }}>
              <div className="row">
                {category.subCategories?.map((subCategory) => (
                  <div
                    key={subCategory._id}
                    className="col-lg-3 col-md-4 col-sm-6 mb-3"
                  >
                    <div
                      style={{
                        background: "white",
                        border: "1px solid #e9ecef",
                        borderRadius: "6px",
                        padding: "15px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        height: "100%",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToShop(category, subCategory);
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#ff6b35";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#e9ecef";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <h6
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          marginBottom: "5px",
                          color: "#2c3e50",
                        }}
                      >
                        {subCategory.title}
                      </h6>
                      <span style={{ fontSize: "12px", color: "#6c757d" }}>
                        {subCategory.itemsCount || 0} items available
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // Main content
  let content = null;

  if (isLoading) {
    content = (
      <div className="text-center py-5">
        <Loader loading={isLoading} />
      </div>
    );
  }

  if (!isLoading && isError) {
    content = (
      <div className="text-center py-5">
        <ErrorMsg msg="There was an error loading categories" />
      </div>
    );
  }

  if (
    !isLoading &&
    !isError &&
    (!categories?.data || categories.data.length === 0)
  ) {
    content = (
      <div className="text-center py-5">
        <ErrorMsg msg="No categories found!" />
      </div>
    );
  }

  if (
    !isLoading &&
    !isError &&
    categories?.data &&
    categories.data.length > 0
  ) {
    content = (
      <div className="tp-categories-area pt-80 pb-80">
        <div className="container">
          {/* Header */}
          <div className="row mb-4">
            <div className="col-lg-12">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "30px",
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: "32px",
                      fontWeight: "700",
                      color: "#2c3e50",
                      margin: 0,
                    }}
                  >
                    All Categories
                  </h2>
                  <p
                    style={{
                      color: "#6c757d",
                      margin: "5px 0 0 0",
                      fontSize: "16px",
                    }}
                  >
                    Explore our {categories.data.length} main categories with{" "}
                    {categories.data.reduce(
                      (total, cat) => total + (cat.totalItems || 0),
                      0
                    )}{" "}
                    total products
                  </p>
                </div>

                {/* View Mode Toggle */}
                <div
                  style={{
                    display: "flex",
                    background: "#f8f9fa",
                    borderRadius: "8px",
                    padding: "4px",
                  }}
                >
                  <button
                    onClick={() => setViewMode("grid")}
                    style={{
                      background:
                        viewMode === "grid" ? "#ff6b35" : "transparent",
                      color: viewMode === "grid" ? "white" : "#6c757d",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 16px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <i
                      className="fa-solid fa-grid-2"
                      style={{ marginRight: "6px" }}
                    ></i>
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    style={{
                      background:
                        viewMode === "list" ? "#ff6b35" : "transparent",
                      color: viewMode === "list" ? "white" : "#6c757d",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 16px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <i
                      className="fa-solid fa-list"
                      style={{ marginRight: "6px" }}
                    ></i>
                    List
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Display */}
          {viewMode === "grid" ? (
            <GridView categories={categories.data} />
          ) : (
            <ListView categories={categories.data} />
          )}
        </div>
      </div>
    );
  }

  return (
    <Wrapper>
      <SEO pageTitle="Categories" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Categories" subtitle="Browse All Categories" />
      {content}
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default CategoriesPage;
