import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import ErrorMsg from "@/components/common/error-msg";
import Loader from "@/components/loader/loader";
import { useGetCategoriesHierarchyQuery } from "@/redux/features/categoryApi";
import { getImageUrl } from "@/utils/common";

const styles = {
  page: {
    background: "#F5F7FA",
    borderTop: "1px solid #E7EAF0",
  },
  summary: {
    background: "#FFFFFF",
    border: "1px solid #E7EAF0",
    borderRadius: "8px",
    padding: "24px",
    boxShadow: "0 12px 30px rgba(16, 24, 40, 0.06)",
  },
  stat: {
    borderLeft: "1px solid #E7EAF0",
    paddingLeft: "22px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    margin: "26px 0 20px",
  },
  segmented: {
    display: "inline-flex",
    padding: "4px",
    borderRadius: "8px",
    background: "#FFFFFF",
    border: "1px solid #E7EAF0",
  },
  panel: {
    background: "#FFFFFF",
    border: "1px solid #E7EAF0",
    borderRadius: "8px",
    padding: "18px",
    boxShadow: "0 10px 24px rgba(16, 24, 40, 0.05)",
  },
};

const accentColors = ["#E91E63", "#2563EB", "#0F766E", "#7C3AED", "#D97706"];

const CategoryImage = ({ category, size = 72 }) => {
  if (!category.image) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "8px",
          background: "#FFF1F6",
          color: "#E91E63",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          fontWeight: 800,
          flex: "0 0 auto",
        }}
      >
        {(category.title || "C").charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <Image
      src={getImageUrl(category.image)}
      alt={category.title}
      width={size}
      height={size}
      style={{
        borderRadius: "8px",
        objectFit: "cover",
        background: "#F8FAFC",
        flex: "0 0 auto",
      }}
    />
  );
};

const Metric = ({ label, value }) => (
  <div style={styles.stat}>
    <strong
      style={{
        display: "block",
        color: "#111827",
        fontSize: "26px",
        lineHeight: 1,
      }}
    >
      {value}
    </strong>
    <span style={{ color: "#6B7280", fontSize: "13px", fontWeight: 600 }}>
      {label}
    </span>
  </div>
);

const CategoriesPage = () => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useGetCategoriesHierarchyQuery();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const router = useRouter();

  const categoryList = categories?.data || [];

  const stats = useMemo(() => {
    return categoryList.reduce(
      (total, category) => ({
        items: total.items + (category.totalItems || 0),
        subcategories:
          total.subcategories + (category.subCategories?.length || 0),
      }),
      { items: 0, subcategories: 0 }
    );
  }, [categoryList]);

  const navigateToShop = (category, subCategory = null, item = null) => {
    const params = new URLSearchParams();

    if (category?._id) params.set("categories", category._id);
    if (subCategory?._id) params.set("subcategories", subCategory._id);
    if (item?.name) params.set("item", item.name);

    router.push(`/shop?${params.toString()}`);
  };

  const activeCategory = selectedCategory || categoryList[0];

  const CategoryTile = ({ category, index }) => {
    const isActive = activeCategory?._id === category._id;
    const color = accentColors[index % accentColors.length];

    return (
      <button
        type="button"
        onClick={() => setSelectedCategory(category)}
        style={{
          width: "100%",
          height: "100%",
          textAlign: "left",
          background: "#FFFFFF",
          border: `1px solid ${isActive ? color : "#E7EAF0"}`,
          borderRadius: "8px",
          padding: "16px",
          boxShadow: isActive
            ? `0 16px 30px ${color}1F`
            : "0 8px 20px rgba(16, 24, 40, 0.05)",
          cursor: "pointer",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.transform = "translateY(-3px)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
          <CategoryImage category={category} />
          <div style={{ minWidth: 0 }}>
            <h3
              style={{
                margin: 0,
                color: "#111827",
                fontSize: "17px",
                fontWeight: 800,
                lineHeight: 1.25,
              }}
            >
              {category.title}
            </h3>
            <p style={{ margin: "6px 0 0", color: "#6B7280", fontSize: 13 }}>
              {category.totalItems || 0} items /{" "}
              {category.subCategories?.length || 0} subcategories
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "7px",
            flexWrap: "wrap",
            marginTop: "16px",
          }}
        >
          {category.subCategories?.slice(0, 4).map((subCategory) => (
            <span
              key={subCategory._id}
              style={{
                color,
                background: `${color}12`,
                borderRadius: "8px",
                padding: "6px 9px",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              {subCategory.title}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "16px",
            paddingTop: "14px",
            borderTop: "1px solid #EEF2F7",
          }}
        >
          <span style={{ color, fontSize: "13px", fontWeight: 800 }}>
            Browse category
          </span>
          <i className="fa-solid fa-arrow-right" style={{ color }}></i>
        </div>
      </button>
    );
  };

  const CategoryRow = ({ category, index }) => {
    const isActive = activeCategory?._id === category._id;
    const color = accentColors[index % accentColors.length];

    return (
      <div
        style={{
          ...styles.panel,
          borderColor: isActive ? color : "#E7EAF0",
          marginBottom: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <button
            type="button"
            onClick={() => setSelectedCategory(category)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              textAlign: "left",
              background: "transparent",
              border: 0,
              padding: 0,
              minWidth: 0,
              cursor: "pointer",
            }}
          >
            <CategoryImage category={category} size={62} />
            <span style={{ minWidth: 0 }}>
              <strong
                style={{
                  display: "block",
                  color: "#111827",
                  fontSize: "17px",
                  lineHeight: 1.2,
                }}
              >
                {category.title}
              </strong>
              <span style={{ color: "#6B7280", fontSize: "13px" }}>
                {category.totalItems || 0} items /{" "}
                {category.subCategories?.length || 0} subcategories
              </span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => navigateToShop(category)}
            style={{
              color: "#FFFFFF",
              background: color,
              border: 0,
              borderRadius: "8px",
              padding: "10px 14px",
              fontSize: "13px",
              fontWeight: 800,
              flex: "0 0 auto",
            }}
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  };

  const DetailPanel = () => {
    if (!activeCategory) return null;

    return (
      <aside style={{ ...styles.panel, position: "sticky", top: "96px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <CategoryImage category={activeCategory} size={76} />
          <div>
            <h3
              style={{
                margin: 0,
                color: "#111827",
                fontSize: "22px",
                fontWeight: 800,
              }}
            >
              {activeCategory.title}
            </h3>
            <p style={{ margin: "5px 0 0", color: "#6B7280", fontSize: 14 }}>
              {activeCategory.totalItems || 0} products available
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigateToShop(activeCategory)}
          className="mt-20"
          style={{
            width: "100%",
            color: "#FFFFFF",
            background: "#E91E63",
            border: 0,
            borderRadius: "8px",
            minHeight: "44px",
            fontWeight: 800,
          }}
        >
          View All Products
        </button>

        <div style={{ marginTop: "22px" }}>
          <h4
            style={{
              color: "#111827",
              fontSize: "15px",
              fontWeight: 800,
              marginBottom: "12px",
            }}
          >
            Subcategories
          </h4>
          <div style={{ display: "grid", gap: "8px" }}>
            {activeCategory.subCategories?.length ? (
              activeCategory.subCategories.map((subCategory) => (
                <button
                  type="button"
                  key={subCategory._id}
                  onClick={() => navigateToShop(activeCategory, subCategory)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    textAlign: "left",
                    color: "#374151",
                    background: "#F8FAFC",
                    border: "1px solid #E7EAF0",
                    borderRadius: "8px",
                    padding: "11px 12px",
                    fontSize: "13px",
                    fontWeight: 700,
                  }}
                >
                  <span>{subCategory.title}</span>
                  <span style={{ color: "#6B7280", fontWeight: 600 }}>
                    {subCategory.itemsCount || 0}
                  </span>
                </button>
              ))
            ) : (
              <p style={{ color: "#6B7280", margin: 0 }}>
                No subcategories found.
              </p>
            )}
          </div>
        </div>
      </aside>
    );
  };

  let content = null;

  if (isLoading) {
    content = (
      <div className="text-center py-5">
        <Loader loading={isLoading} />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="text-center py-5">
        <ErrorMsg msg="There was an error loading categories" />
      </div>
    );
  } else if (!categoryList.length) {
    content = (
      <div className="text-center py-5">
        <ErrorMsg msg="No categories found!" />
      </div>
    );
  } else {
    content = (
      <section style={styles.page} className="pt-40 pb-80">
        <div className="container">
          <div style={styles.summary}>
            <div className="row align-items-center gy-3">
              <div className="col-lg-7">
                <p
                  style={{
                    margin: "0 0 8px",
                    color: "#E91E63",
                    fontSize: "13px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                  }}
                >
                  Category Directory
                </p>
                <h2
                  style={{
                    margin: 0,
                    color: "#111827",
                    fontSize: "32px",
                    lineHeight: 1.15,
                    fontWeight: 800,
                  }}
                >
                  Find products by department
                </h2>
                <p
                  style={{
                    margin: "10px 0 0",
                    color: "#6B7280",
                    fontSize: "15px",
                    maxWidth: "620px",
                  }}
                >
                  Browse every category, jump into a subcategory, or open the
                  full shop collection with one click.
                </p>
              </div>
              <div className="col-lg-5">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "22px",
                    flexWrap: "wrap",
                  }}
                >
                  <Metric label="Categories" value={categoryList.length} />
                  <Metric label="Subcategories" value={stats.subcategories} />
                  <Metric label="Products" value={stats.items} />
                </div>
              </div>
            </div>
          </div>

          <div style={styles.toolbar}>
            <h3
              style={{
                margin: 0,
                color: "#111827",
                fontSize: "20px",
                fontWeight: 800,
              }}
            >
              All Categories
            </h3>
            <div style={styles.segmented} aria-label="View mode">
              {["grid", "list"].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  style={{
                    color: viewMode === mode ? "#FFFFFF" : "#4B5563",
                    background: viewMode === mode ? "#111827" : "transparent",
                    border: 0,
                    borderRadius: "6px",
                    minHeight: "34px",
                    padding: "0 13px",
                    fontSize: "13px",
                    fontWeight: 800,
                    textTransform: "capitalize",
                  }}
                >
                  <i
                    className={`fa-solid ${
                      mode === "grid" ? "fa-border-all" : "fa-list"
                    }`}
                    style={{ marginRight: "7px" }}
                  ></i>
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="row g-4">
            <div className="col-xl-8 col-lg-8">
              {viewMode === "grid" ? (
                <div className="row g-3">
                  {categoryList.map((category, index) => (
                    <div key={category._id} className="col-md-6">
                      <CategoryTile category={category} index={index} />
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {categoryList.map((category, index) => (
                    <CategoryRow
                      key={category._id}
                      category={category}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="col-xl-4 col-lg-4">
              <DetailPanel />
            </div>
          </div>
        </div>
      </section>
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
