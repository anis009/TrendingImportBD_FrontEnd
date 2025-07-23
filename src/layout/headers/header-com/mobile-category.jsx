import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
// internal
import { useGetCategoriesHierarchyQuery } from "@/redux/features/categoryApi";
import ErrorMsg from "@/components/common/error-msg";
import Loader from "@/components/loader/loader";

const MobileCategory = ({ isCategoryActive }) => {
  const {
    data: categories,
    isError,
    isLoading,
  } = useGetCategoriesHierarchyQuery();
  const [isActiveSubMenu, setIsActiveSubMenu] = useState("");
  const [activeSubCategory, setActiveSubCategory] = useState("");
  const [showAllItems, setShowAllItems] = useState({}); // Track which subcategories show all items
  const router = useRouter();

  // handleOpenSubMenu for main categories
  const handleOpenSubMenu = (categoryId) => {
    if (categoryId === isActiveSubMenu) {
      setIsActiveSubMenu("");
      setActiveSubCategory("");
      setShowAllItems({}); // Reset show all items when closing main menu
    } else {
      setIsActiveSubMenu(categoryId);
      setActiveSubCategory("");
      setShowAllItems({}); // Reset show all items when switching categories
    }
  };

  // handleOpenSubCategory for subcategories
  const handleOpenSubCategory = (subCategoryId) => {
    if (subCategoryId === activeSubCategory) {
      setActiveSubCategory("");
      setShowAllItems({}); // Reset show all items when closing subcategory
    } else {
      setActiveSubCategory(subCategoryId);
      setShowAllItems({}); // Reset show all items when switching subcategories
    }
  };

  // Toggle show all items for a specific subcategory
  const toggleShowAllItems = (subCategoryId) => {
    setShowAllItems((prev) => ({
      ...prev,
      [subCategoryId]: !prev[subCategoryId],
    }));
  };

  // handle category route
  const handleCategoryRoute = (category, subCategory = null, item = null) => {
    let route = "/shop?";

    if (category) {
      route += `category=${category.slug}`;
    }

    if (subCategory) {
      route += `&subcategory=${subCategory.slug}`;
    }

    if (item) {
      route += `&item=${encodeURIComponent(item.name)}`;
    }

    router.push(route);
  };

  // decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <div className="py-5">
        <Loader loading={isLoading} />
      </div>
    );
  }

  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error loading categories" />;
  }

  if (
    !isLoading &&
    !isError &&
    (!categories?.data || categories.data.length === 0)
  ) {
    content = <ErrorMsg msg="No categories found!" />;
  }

  if (
    !isLoading &&
    !isError &&
    categories?.data &&
    categories.data.length > 0
  ) {
    const categoryItems = categories.data;

    content = categoryItems.map((category) => (
      <li className="has-dropdown" key={category._id}>
        <a
          className="cursor-pointer"
          onClick={() => handleCategoryRoute(category)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 0",
            fontSize: "14px",
            fontWeight: "600",
            color: "#2c3e50",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {category.image && (
              <span>
                <Image
                  src={category.image}
                  alt={category.title}
                  width={24}
                  height={24}
                  style={{ borderRadius: "4px" }}
                />
              </span>
            )}
            <span>{category.title}</span>
            <span
              style={{
                fontSize: "11px",
                color: "#6c757d",
                background: "#f8f9fa",
                padding: "2px 6px",
                borderRadius: "8px",
              }}
            >
              {category.totalItems || 0}
            </span>
          </div>

          {category.subCategories && category.subCategories.length > 0 && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleOpenSubMenu(category._id);
              }}
              className="dropdown-toggle-btn"
              style={{
                background: "none",
                border: "none",
                padding: "4px",
                cursor: "pointer",
                color: "#6c757d",
                transition: "transform 0.3s ease",
                transform:
                  isActiveSubMenu === category._id
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
              }}
            >
              <i className="fa-regular fa-angle-right"></i>
            </button>
          )}
        </a>

        {/* Subcategories */}
        {category.subCategories && category.subCategories.length > 0 && (
          <ul
            className={`tp-submenu ${
              isActiveSubMenu === category._id ? "active" : ""
            }`}
            style={{
              background: "#f8f9fa",
              marginLeft: "0",
              paddingLeft: "20px",
              borderRadius: "0 0 8px 8px",
              maxHeight: isActiveSubMenu === category._id ? "500px" : "0",
              overflow: "hidden",
              transition: "all 0.3s ease",
            }}
          >
            {category.subCategories.map((subCategory) => (
              <li key={subCategory._id} className="has-dropdown">
                <a
                  className="cursor-pointer"
                  onClick={() => handleCategoryRoute(category, subCategory)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    fontSize: "13px",
                    color: "#495057",
                    borderBottom: "1px solid #e9ecef",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span>{subCategory.title}</span>
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#6c757d",
                        background: "#fff",
                        padding: "1px 4px",
                        borderRadius: "6px",
                      }}
                    >
                      {subCategory.itemsCount || 0}
                    </span>
                  </div>

                  {subCategory.items && subCategory.items.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleOpenSubCategory(subCategory._id);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        padding: "2px",
                        cursor: "pointer",
                        color: "#6c757d",
                        fontSize: "12px",
                        transition: "transform 0.3s ease",
                        transform:
                          activeSubCategory === subCategory._id
                            ? "rotate(90deg)"
                            : "rotate(0deg)",
                      }}
                    >
                      <i className="fa-regular fa-angle-right"></i>
                    </button>
                  )}
                </a>

                {/* Items */}
                {subCategory.items && subCategory.items.length > 0 && (
                  <ul
                    className={`tp-submenu-items ${
                      activeSubCategory === subCategory._id ? "active" : ""
                    }`}
                    style={{
                      background: "#fff",
                      marginLeft: "0",
                      paddingLeft: "16px",
                      borderRadius: "0 0 6px 6px",
                      maxHeight:
                        activeSubCategory === subCategory._id ? "400px" : "0",
                      overflow: "auto", // Changed from hidden to auto for scrolling
                      transition: "all 0.3s ease",
                      border:
                        activeSubCategory === subCategory._id
                          ? "1px solid #e9ecef"
                          : "none",
                    }}
                  >
                    {/* Determine which items to show */}
                    {(() => {
                      const shouldShowAll = showAllItems[subCategory._id];
                      const itemsToShow = shouldShowAll
                        ? subCategory.items
                        : subCategory.items.slice(0, 6);

                      return itemsToShow.map((item) => (
                        <li
                          key={item._id}
                          onClick={() =>
                            handleCategoryRoute(category, subCategory, item)
                          }
                          style={{
                            padding: "8px 0",
                            fontSize: "12px",
                            color: "#6c757d",
                            borderBottom: "1px solid #f0f0f0",
                            cursor: "pointer",
                            transition: "color 0.2s ease",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.color = "#ff6b35")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.color = "#6c757d")
                          }
                        >
                          <a className="cursor-pointer">• {item.name}</a>
                        </li>
                      ));
                    })()}

                    {/* Show All / Show Less Toggle */}
                    {subCategory.items.length > 6 && (
                      <li
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleShowAllItems(subCategory._id);
                        }}
                        style={{
                          padding: "8px 0",
                          fontSize: "12px",
                          color: "#ff6b35",
                          fontWeight: "600",
                          cursor: "pointer",
                          borderTop: "2px solid #e9ecef",
                          marginTop: "4px",
                          background: "#f8f9fa",
                          borderRadius: "4px",
                          textAlign: "center",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "#e9ecef";
                          e.target.style.transform = "scale(1.02)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "#f8f9fa";
                          e.target.style.transform = "scale(1)";
                        }}
                      >
                        <a
                          className="cursor-pointer"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                          }}
                        >
                          {showAllItems[subCategory._id] ? (
                            <>
                              <i className="fa-solid fa-chevron-up"></i>
                              Show Less
                            </>
                          ) : (
                            <>
                              <i className="fa-solid fa-chevron-down"></i>
                              Show All {subCategory.items.length} Items
                            </>
                          )}
                        </a>
                      </li>
                    )}

                    {/* View All in Shop Link */}
                    {subCategory.items.length > 0 && (
                      <li
                        onClick={() =>
                          handleCategoryRoute(category, subCategory)
                        }
                        style={{
                          padding: "10px 0",
                          fontSize: "12px",
                          color: "#007bff",
                          fontWeight: "600",
                          cursor: "pointer",
                          background:
                            "linear-gradient(135deg, #f8f9fa, #e9ecef)",
                          borderRadius: "6px",
                          textAlign: "center",
                          marginTop: "8px",
                          border: "1px solid #dee2e6",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background =
                            "linear-gradient(135deg, #007bff, #0056b3)";
                          e.target.style.color = "white";
                          e.target.style.transform = "translateY(-1px)";
                          e.target.style.boxShadow =
                            "0 2px 8px rgba(0,123,255,0.3)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background =
                            "linear-gradient(135deg, #f8f9fa, #e9ecef)";
                          e.target.style.color = "#007bff";
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow = "none";
                        }}
                      >
                        <a
                          className="cursor-pointer"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                          }}
                        >
                          <i className="fa-solid fa-external-link-alt"></i>
                          View All in Shop
                        </a>
                      </li>
                    )}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </li>
    ));
  }

  return (
    <ul
      className={isCategoryActive ? "active" : ""}
      style={{
        maxHeight: isCategoryActive ? "70vh" : "0",
        overflow: "auto",
        transition: "all 0.3s ease",
        padding: isCategoryActive ? "16px" : "0",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: isCategoryActive ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
      }}
    >
      {content}
    </ul>
  );
};

export default MobileCategory;
