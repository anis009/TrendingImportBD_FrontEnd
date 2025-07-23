import React, { useState } from "react";
import Link from "next/link";

// Simple inline SVG components to avoid import issues
const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
  </svg>
);

const ChevronDownIcon = ({ isOpen }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{
      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.3s ease",
    }}
  >
    <path d="M7 10l5 5 5-5z" />
  </svg>
);

const MegaMenu = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [expandedSubCategories, setExpandedSubCategories] = useState({}); // Track expanded subcategories

  // Handle case where categories data might be undefined
  const categoriesData = categories?.data || [];

  // Toggle expanded state for a subcategory
  const toggleSubCategoryExpansion = (subCategoryId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedSubCategories((prev) => ({
      ...prev,
      [subCategoryId]: !prev[subCategoryId],
    }));
  };

  // Reset expanded state when category changes
  const handleCategoryHover = (category) => {
    if (activeCategory?._id !== category._id) {
      setExpandedSubCategories({});
    }
    setActiveCategory(category);
  };

  return (
    <div className="tp-mega-menu-wrapper" style={{ position: "relative" }}>
      {/* Categories Button */}
      <button
        className="tp-mega-menu-btn"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "8px",
          padding: "12px 20px",
          color: "white",
          fontSize: "14px",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          backdropFilter: "blur(10px)",
        }}
      >
        <GridIcon />
        <span>All Categories</span>
        <ChevronDownIcon isOpen={isOpen} />
      </button>

      {/* Mega Menu Dropdown */}
      {isOpen && (
        <div
          className="tp-mega-menu-dropdown"
          onMouseLeave={() => {
            setIsOpen(false);
            setActiveCategory(null);
            setExpandedSubCategories({});
          }}
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            width: "80vw",
            maxWidth: "1200px",
            background: "white",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
            borderRadius: "12px",
            zIndex: 1000,
            marginTop: "8px",
            border: "1px solid #e9ecef",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", minHeight: "400px" }}>
            {/* Categories Sidebar */}
            <div
              style={{
                width: "300px",
                background: "#f8f9fa",
                borderRight: "1px solid #e9ecef",
                overflowY: "auto",
              }}
            >
              {categoriesData.map((category) => (
                <div
                  key={category._id}
                  className="tp-mega-category-item"
                  onMouseEnter={() => handleCategoryHover(category)}
                  style={{
                    padding: "16px 20px",
                    cursor: "pointer",
                    borderBottom: "1px solid #e9ecef",
                    background:
                      activeCategory?._id === category._id
                        ? "#fff"
                        : "transparent",
                    borderLeft:
                      activeCategory?._id === category._id
                        ? "4px solid #ff6b35"
                        : "4px solid transparent",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div>
                    <h6
                      style={{
                        margin: 0,
                        fontSize: "15px",
                        fontWeight: "600",
                        color:
                          activeCategory?._id === category._id
                            ? "#ff6b35"
                            : "#2c3e50",
                        marginBottom: "4px",
                      }}
                    >
                      {category.title}
                    </h6>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#6c757d",
                      }}
                    >
                      {category.totalItems || 0} items •{" "}
                      {category.subCategoriesCount || 0} categories
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Subcategories Content */}
            <div style={{ flex: 1, padding: "20px" }}>
              {activeCategory ? (
                <div>
                  <div style={{ marginBottom: "20px" }}>
                    <h4
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#2c3e50",
                        marginBottom: "8px",
                      }}
                    >
                      {activeCategory.title}
                    </h4>
                    <p
                      style={{
                        color: "#6c757d",
                        margin: 0,
                        fontSize: "14px",
                      }}
                    >
                      Explore {activeCategory.subCategoriesCount || 0}{" "}
                      subcategories with {activeCategory.totalItems || 0} total
                      items
                    </p>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: "16px",
                      maxHeight: "320px",
                      overflowY: "auto",
                    }}
                  >
                    {activeCategory.subCategories?.map((subCategory) => {
                      const isExpanded = expandedSubCategories[subCategory._id];
                      const itemsToShow = isExpanded
                        ? subCategory.items
                        : subCategory.items?.slice(0, 3);

                      return (
                        <div
                          key={subCategory._id}
                          style={{
                            background: "#f8f9fa",
                            borderRadius: "8px",
                            padding: "16px",
                            transition: "all 0.3s ease",
                            border: "1px solid #e9ecef",
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#fff";
                            e.currentTarget.style.boxShadow =
                              "0 4px 12px rgba(0,0,0,0.1)";
                            e.currentTarget.style.transform =
                              "translateY(-2px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#f8f9fa";
                            e.currentTarget.style.boxShadow = "none";
                            e.currentTarget.style.transform = "translateY(0)";
                          }}
                        >
                          <Link
                            href={`/shop?category=${activeCategory.slug}&subcategory=${subCategory.slug}`}
                            style={{ textDecoration: "none" }}
                          >
                            <h6
                              style={{
                                fontSize: "16px",
                                fontWeight: "600",
                                color: "#2c3e50",
                                marginBottom: "8px",
                              }}
                            >
                              {subCategory.title}
                            </h6>
                            <span
                              style={{
                                fontSize: "12px",
                                color: "#6c757d",
                                marginBottom: "12px",
                                display: "block",
                              }}
                            >
                              {subCategory.itemsCount || 0} items available
                            </span>
                          </Link>

                          {/* Show items */}
                          <div
                            style={{
                              marginTop: "12px",
                              maxHeight: isExpanded ? "200px" : "auto",
                              overflowY: isExpanded ? "auto" : "visible",
                              transition: "max-height 0.3s ease",
                            }}
                          >
                            {itemsToShow?.map((item) => (
                              <Link
                                key={item._id}
                                href={`/shop?category=${
                                  activeCategory.slug
                                }&subcategory=${
                                  subCategory.slug
                                }&item=${encodeURIComponent(item.name)}`}
                                style={{
                                  display: "block",
                                  fontSize: "12px",
                                  color: "#495057",
                                  textDecoration: "none",
                                  padding: "3px 0",
                                  transition: "color 0.2s ease",
                                }}
                                onMouseEnter={(e) =>
                                  (e.target.style.color = "#ff6b35")
                                }
                                onMouseLeave={(e) =>
                                  (e.target.style.color = "#495057")
                                }
                              >
                                • {item.name}
                              </Link>
                            ))}

                            {/* Show More/Less Toggle */}
                            {(subCategory.items?.length || 0) > 3 && (
                              <button
                                onClick={(e) =>
                                  toggleSubCategoryExpansion(subCategory._id, e)
                                }
                                style={{
                                  display: "block",
                                  fontSize: "12px",
                                  color: "#ff6b35",
                                  background: "none",
                                  border: "none",
                                  padding: "4px 0",
                                  fontWeight: "600",
                                  cursor: "pointer",
                                  textAlign: "left",
                                  transition: "all 0.2s ease",
                                  borderRadius: "4px",
                                  marginTop: "4px",
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.background = "#fff3f0";
                                  e.target.style.padding = "4px 8px";
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.background = "none";
                                  e.target.style.padding = "4px 0";
                                }}
                              >
                                {isExpanded ? (
                                  <>
                                    <i
                                      className="fa-solid fa-chevron-up"
                                      style={{
                                        marginRight: "6px",
                                        fontSize: "10px",
                                      }}
                                    ></i>
                                    Show Less
                                  </>
                                ) : (
                                  <>
                                    <i
                                      className="fa-solid fa-chevron-down"
                                      style={{
                                        marginRight: "6px",
                                        fontSize: "10px",
                                      }}
                                    ></i>
                                    + {(subCategory.items?.length || 0) - 3}{" "}
                                    more items
                                  </>
                                )}
                              </button>
                            )}

                            {/* View All in Shop Link */}
                            {isExpanded && subCategory.items?.length > 0 && (
                              <Link
                                href={`/shop?category=${activeCategory.slug}&subcategory=${subCategory.slug}`}
                                style={{
                                  display: "block",
                                  fontSize: "12px",
                                  color: "#007bff",
                                  textDecoration: "none",
                                  padding: "6px 8px",
                                  fontWeight: "600",
                                  background:
                                    "linear-gradient(135deg, #e3f2fd, #bbdefb)",
                                  borderRadius: "4px",
                                  textAlign: "center",
                                  marginTop: "8px",
                                  border: "1px solid #90caf9",
                                  transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.background =
                                    "linear-gradient(135deg, #2196f3, #1976d2)";
                                  e.target.style.color = "white";
                                  e.target.style.transform = "translateY(-1px)";
                                  e.target.style.boxShadow =
                                    "0 2px 8px rgba(33,150,243,0.3)";
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.background =
                                    "linear-gradient(135deg, #e3f2fd, #bbdefb)";
                                  e.target.style.color = "#007bff";
                                  e.target.style.transform = "translateY(0)";
                                  e.target.style.boxShadow = "none";
                                }}
                              >
                                <i
                                  className="fa-solid fa-external-link-alt"
                                  style={{ marginRight: "6px" }}
                                ></i>
                                View All in Shop
                              </Link>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "300px",
                    color: "#6c757d",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <GridIcon />
                    <p style={{ marginTop: "16px", fontSize: "16px" }}>
                      Hover over a category to see subcategories
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MegaMenu;
