import React, { useEffect, useState } from "react";
import Link from "next/link";

const COLORS = {
  primary: "#E91E63",
  primaryDark: "#AD1457",
  text: "#212121",
  muted: "#757575",
  soft: "#FFF1F6",
  border: "#ECEFF3",
};

const GridIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z" />
  </svg>
);

const ChevronDownIcon = ({ isOpen }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{
      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.2s ease",
    }}
  >
    <path d="M7 10l5 5 5-5z" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="m13 5 7 7-7 7v-4H4v-6h9V5z" />
  </svg>
);

const CategoryInitial = ({ title, isActive }) => (
  <span
    style={{
      width: "34px",
      height: "34px",
      borderRadius: "8px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "0 0 auto",
      color: isActive ? "#fff" : COLORS.primary,
      background: isActive ? COLORS.primary : COLORS.soft,
      fontSize: "13px",
      fontWeight: 800,
    }}
  >
    {(title || "C").charAt(0).toUpperCase()}
  </span>
);

const MegaMenu = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [expandedSubCategories, setExpandedSubCategories] = useState({});

  const categoriesData = categories?.data || [];

  useEffect(() => {
    if (isOpen && !activeCategory && categoriesData.length > 0) {
      setActiveCategory(categoriesData[0]);
    }
  }, [activeCategory, categoriesData, isOpen]);

  const openMenu = () => {
    setIsOpen(true);
    if (!activeCategory && categoriesData.length > 0) {
      setActiveCategory(categoriesData[0]);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setExpandedSubCategories({});
  };

  const toggleSubCategoryExpansion = (subCategoryId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedSubCategories((prev) => ({
      ...prev,
      [subCategoryId]: !prev[subCategoryId],
    }));
  };

  const handleCategoryHover = (category) => {
    if (activeCategory?._id !== category._id) {
      setExpandedSubCategories({});
    }
    setActiveCategory(category);
  };

  return (
    <div className="tp-mega-menu-wrapper" style={{ position: "relative" }}>
      <button
        className="tp-mega-menu-btn"
        onClick={() => (isOpen ? closeMenu() : openMenu())}
        onMouseEnter={openMenu}
        style={{
          minHeight: "44px",
          background: isOpen ? COLORS.soft : "#fff",
          border: `1px solid ${isOpen ? COLORS.primary : COLORS.border}`,
          borderRadius: "8px",
          padding: "0 16px",
          color: isOpen ? COLORS.primary : COLORS.text,
          fontSize: "14px",
          fontWeight: 700,
          display: "inline-flex",
          alignItems: "center",
          gap: "9px",
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: isOpen
            ? "0 10px 24px rgba(233, 30, 99, 0.12)"
            : "0 1px 2px rgba(0, 0, 0, 0.04)",
          whiteSpace: "nowrap",
        }}
      >
        <GridIcon />
        <span>All Categories</span>
        <ChevronDownIcon isOpen={isOpen} />
      </button>

      {isOpen && (
        <div
          className="tp-mega-menu-dropdown"
          onMouseLeave={closeMenu}
          style={{
            position: "fixed",
            top: "76px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "calc(100vw - 48px)",
            maxWidth: "1120px",
            background: "#fff",
            boxShadow: "0 24px 70px rgba(15, 23, 42, 0.18)",
            borderRadius: "8px",
            zIndex: 9999,
            border: `1px solid ${COLORS.border}`,
            overflow: "visible",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "292px minmax(0, 1fr)",
              minHeight: "420px",
              maxHeight: "calc(100vh - 100px)",
              overflow: "hidden",
              borderRadius: "8px",
            }}
          >
            <aside
              style={{
                background: "#FAFBFC",
                borderRight: `1px solid ${COLORS.border}`,
                overflowY: "auto",
                maxHeight: "calc(100vh - 100px)",
              }}
            >
              <div
                style={{
                  padding: "18px 18px 12px",
                  borderBottom: `1px solid ${COLORS.border}`,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: COLORS.primary,
                    fontSize: "12px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                  }}
                >
                  Shop by category
                </p>
              </div>

              <div style={{ padding: "10px" }}>
                {categoriesData.map((category) => {
                  const isActive = activeCategory?._id === category._id;

                  return (
                    <div
                      key={category._id}
                      className="tp-mega-category-item"
                      onMouseEnter={() => handleCategoryHover(category)}
                      style={{
                        padding: "11px 12px",
                        cursor: "pointer",
                        borderRadius: "8px",
                        background: isActive ? "#fff" : "transparent",
                        boxShadow: isActive
                          ? "0 8px 20px rgba(15, 23, 42, 0.08)"
                          : "none",
                        border: `1px solid ${
                          isActive ? COLORS.border : "transparent"
                        }`,
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <CategoryInitial
                          title={category.title}
                          isActive={isActive}
                        />
                        <div style={{ minWidth: 0 }}>
                          <h6
                            style={{
                              margin: 0,
                              fontSize: "14px",
                              fontWeight: 700,
                              color: isActive ? COLORS.primary : COLORS.text,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {category.title}
                          </h6>
                          <span
                            style={{
                              display: "block",
                              marginTop: "2px",
                              fontSize: "12px",
                              color: COLORS.muted,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {category.totalItems || 0} items /{" "}
                            {category.subCategoriesCount || 0} categories
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>

            <section
              style={{
                minWidth: 0,
                padding: "22px",
                overflowY: "auto",
                maxHeight: "calc(100vh - 100px)",
                background:
                  "linear-gradient(180deg, #ffffff 0%, #ffffff 64%, #fff8fb 100%)",
              }}
            >
              {activeCategory ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "20px",
                      alignItems: "flex-start",
                      marginBottom: "18px",
                    }}
                  >
                    <div>
                      <h4
                        style={{
                          margin: 0,
                          color: COLORS.text,
                          fontSize: "22px",
                          lineHeight: 1.25,
                          fontWeight: 800,
                        }}
                      >
                        {activeCategory.title}
                      </h4>
                      <p
                        style={{
                          color: COLORS.muted,
                          margin: "6px 0 0",
                          fontSize: "13px",
                        }}
                      >
                        {activeCategory.subCategoriesCount || 0} subcategories
                        with {activeCategory.totalItems || 0} total items
                      </p>
                    </div>

                    <Link
                      href={`/shop?category=${activeCategory.slug}`}
                      style={{
                        color: COLORS.primary,
                        border: `1px solid ${COLORS.primary}`,
                        background: "#fff",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        fontSize: "13px",
                        lineHeight: 1,
                        fontWeight: 800,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "7px",
                        flex: "0 0 auto",
                      }}
                    >
                      View all
                      <ArrowIcon />
                    </Link>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(230px, 1fr))",
                      gap: "14px",
                    }}
                  >
                    {activeCategory.subCategories?.map((subCategory) => {
                      const isExpanded = expandedSubCategories[subCategory._id];
                      const itemsToShow = isExpanded
                        ? subCategory.items
                        : subCategory.items?.slice(0, 4);

                      return (
                        <div
                          key={subCategory._id}
                          style={{
                            background: "#fff",
                            borderRadius: "8px",
                            padding: "15px",
                            border: `1px solid ${COLORS.border}`,
                            boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor =
                              "rgba(233, 30, 99, 0.35)";
                            e.currentTarget.style.transform =
                              "translateY(-2px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = COLORS.border;
                            e.currentTarget.style.transform = "translateY(0)";
                          }}
                        >
                          <Link
                            href={`/shop?category=${activeCategory.slug}&subcategory=${subCategory.slug}`}
                            style={{ textDecoration: "none" }}
                          >
                            <h6
                              style={{
                                margin: 0,
                                fontSize: "15px",
                                lineHeight: 1.3,
                                fontWeight: 800,
                                color: COLORS.text,
                              }}
                            >
                              {subCategory.title}
                            </h6>
                            <span
                              style={{
                                fontSize: "12px",
                                color: COLORS.muted,
                                marginTop: "5px",
                                display: "block",
                              }}
                            >
                              {subCategory.itemsCount || 0} items available
                            </span>
                          </Link>

                          <div
                            style={{
                              marginTop: "12px",
                              paddingTop: "10px",
                              borderTop: `1px solid ${COLORS.border}`,
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
                                  lineHeight: 1.55,
                                  color: "#4B5563",
                                  textDecoration: "none",
                                  padding: "3px 0",
                                }}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.color = COLORS.primary)
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.color = "#4B5563")
                                }
                              >
                                - {item.name}
                              </Link>
                            ))}

                            {(subCategory.items?.length || 0) > 4 && (
                              <button
                                onClick={(e) =>
                                  toggleSubCategoryExpansion(subCategory._id, e)
                                }
                                style={{
                                  marginTop: "7px",
                                  fontSize: "12px",
                                  color: COLORS.primary,
                                  background: COLORS.soft,
                                  border: "none",
                                  borderRadius: "8px",
                                  padding: "6px 9px",
                                  fontWeight: 800,
                                  cursor: "pointer",
                                  textAlign: "left",
                                }}
                              >
                                {isExpanded
                                  ? "Show less"
                                  : `+ ${
                                      (subCategory.items?.length || 0) - 4
                                    } more`}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div
                  style={{
                    height: "100%",
                    minHeight: "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: COLORS.muted,
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <GridIcon />
                    <p style={{ margin: "12px 0 0", fontSize: "14px" }}>
                      Categories will appear here
                    </p>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default MegaMenu;
