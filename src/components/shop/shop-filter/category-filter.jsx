import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
// internal
import ErrorMsg from "@/components/common/error-msg";
import { useGetCategoriesHierarchyQuery } from "@/redux/features/categoryApi";
import { handleFilterSidebarClose } from "@/redux/features/shop-filter-slice";
import ShopCategoryLoader from "@/components/loader/shop/shop-category-loader";

const CategoryFilter = ({ setCurrPage, shop_right = false }) => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useGetCategoriesHierarchyQuery();
  const router = useRouter();
  const dispatch = useDispatch();

  // handle category route
  const handleCategoryRoute = (categorySlug) => {
    setCurrPage(1);
    router.push(
      `/${shop_right ? "shop-right-sidebar" : "shop"}?category=${categorySlug}`
    );
    dispatch(handleFilterSidebarClose());
  };

  // handle subcategory route
  const handleSubCategoryRoute = (categorySlug, subCategorySlug) => {
    setCurrPage(1);
    router.push(
      `/${
        shop_right ? "shop-right-sidebar" : "shop"
      }?category=${categorySlug}&subcategory=${subCategorySlug}`
    );
    dispatch(handleFilterSidebarClose());
  };

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <ShopCategoryLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (
    !isLoading &&
    !isError &&
    (!categories?.data || categories.data.length === 0)
  ) {
    content = <ErrorMsg msg="No Categories found!" />;
  }
  if (
    !isLoading &&
    !isError &&
    categories?.data &&
    categories.data.length > 0
  ) {
    const categoryItems = categories.data;

    content = (
      <>
        {categoryItems.map((category) => (
          <li key={category._id} className="category-item">
            <a
              onClick={() => handleCategoryRoute(category.slug)}
              style={{
                cursor: "pointer",
                fontWeight: "600",
                color:
                  router.query.category === category.slug
                    ? "#ff6b35"
                    : "#2c3e50",
              }}
              className={
                router.query.category === category.slug ? "active" : ""
              }
            >
              {category.title} <span>({category.totalItems || 0})</span>
            </a>

            {/* Subcategories */}
            {category.subCategories && category.subCategories.length > 0 && (
              <ul
                style={{
                  marginLeft: "15px",
                  marginTop: "8px",
                  borderLeft: "2px solid #f0f0f0",
                  paddingLeft: "10px",
                }}
              >
                {category.subCategories.map((subCategory) => (
                  <li key={subCategory._id} style={{ marginBottom: "5px" }}>
                    <a
                      onClick={() =>
                        handleSubCategoryRoute(category.slug, subCategory.slug)
                      }
                      style={{
                        cursor: "pointer",
                        fontSize: "13px",
                        color:
                          router.query.category === category.slug &&
                          router.query.subcategory === subCategory.slug
                            ? "#ff6b35"
                            : "#6c757d",
                        display: "block",
                        padding: "2px 0",
                        transition: "color 0.2s ease",
                      }}
                      className={
                        router.query.category === category.slug &&
                        router.query.subcategory === subCategory.slug
                          ? "active"
                          : ""
                      }
                      onMouseEnter={(e) => (e.target.style.color = "#ff6b35")}
                      onMouseLeave={(e) => {
                        if (
                          !(
                            router.query.category === category.slug &&
                            router.query.subcategory === subCategory.slug
                          )
                        ) {
                          e.target.style.color = "#6c757d";
                        }
                      }}
                    >
                      • {subCategory.title}{" "}
                      <span>({subCategory.itemsCount || 0})</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </>
    );
  }

  return (
    <>
      <div className="tp-shop-widget mb-50">
        <h3 className="tp-shop-widget-title">Categories</h3>
        <div className="tp-shop-widget-content">
          <div className="tp-shop-widget-categories">
            <ul style={{ listStyle: "none", padding: 0 }}>{content}</ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryFilter;
