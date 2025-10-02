import React, { useState, useEffect } from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import ShopArea from "@/components/shop/shop-area";
import { useGetAllProductsQuery } from "@/redux/features/productApi";
import { useGetCategoriesHierarchyQuery } from "@/redux/features/categoryApi";
import ErrorMsg from "@/components/common/error-msg";
import Footer from "@/layout/footers/footer";
import ShopFilterOffCanvas from "@/components/common/shop-filter-offcanvas";
import ShopLoader from "@/components/loader/shop/shop-loader";

const ShopPage = ({ query }) => {
  const { data: products, isError, isLoading } = useGetAllProductsQuery(query);
  const { data: categories } = useGetCategoriesHierarchyQuery();
  const [priceValue, setPriceValue] = useState([0, 1000]); // Set a default valid range
  const [selectValue, setSelectValue] = useState("");
  const [currPage, setCurrPage] = useState(1);

  console.log("Query~~", query);

  console.log("productst~~", products);

  // Load the maximum price once the products have been loaded
  useEffect(() => {
    if (!isLoading && !isError && products?.data?.length > 0) {
      const maxPrice = products.data.reduce((max, product) => {
        return product.price > max ? product.price : max;
      }, 0);
      // Ensure we always have a valid range (maxPrice should be greater than 0)
      const validMaxPrice = maxPrice > 0 ? maxPrice : 1000;
      setPriceValue([0, validMaxPrice]);
    } else if (
      !isLoading &&
      !isError &&
      (!products?.data || products.data.length === 0)
    ) {
      // If no products, set a default range to prevent Range component errors
      setPriceValue([0, 1000]);
    }
  }, [isLoading, isError, products]);

  // Helper function to find category by slug (keep for breadcrumb display)
  const findCategoryBySlug = (slug) => {
    if (!categories?.data) return null;
    return categories.data.find((cat) => cat.slug === slug);
  };

  // Helper function to find subcategory by slug (keep for breadcrumb display)
  const findSubCategoryBySlug = (categorySlug, subCategorySlug) => {
    const category = findCategoryBySlug(categorySlug);
    if (!category?.subCategories) return null;
    return category.subCategories.find(
      (subCat) => subCat.slug === subCategorySlug
    );
  };

  // handleChanges
  const handleChanges = (val) => {
    setCurrPage(1);
    setPriceValue(val);
  };

  // selectHandleFilter
  const selectHandleFilter = (e) => {
    setSelectValue(e.value);
  };

  // other props
  const otherProps = {
    priceFilterValues: {
      priceValue,
      handleChanges,
    },
    selectHandleFilter,
    currPage,
    setCurrPage,
    query, // Pass query to components
    categories: categories?.data || [], // Pass categories for filtering
  };

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <ShopLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = (
      <div className="pb-80 text-center">
        <ErrorMsg msg="There was an error loading products" />
      </div>
    );
  }
  // if (!isLoading && !isError && products?.data?.length === 0) {
  //   content = <ErrorMsg msg="No Products found!" />;
  // }
  if (!isLoading && !isError) {
    // products - backend handles all filtering, so use data directly
    let product_items = products.data || [];

    // Only keep client-side sorting since it doesn't affect data fetching
    if (selectValue) {
      if (selectValue === "Default Sorting") {
        product_items = [...product_items]; // Keep original order
      } else if (selectValue === "Low to High") {
        product_items = [...product_items].sort(
          (a, b) => Number(a.price) - Number(b.price)
        );
      } else if (selectValue === "High to Low") {
        product_items = [...product_items].sort(
          (a, b) => Number(b.price) - Number(a.price)
        );
      } else if (selectValue === "New Added") {
        product_items = [...product_items].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      } else if (selectValue === "On Sale") {
        product_items = [...product_items].sort(
          (a, b) => (b.discount || 0) - (a.discount || 0)
        );
      } else {
        product_items = [...product_items]; // Keep original order
      }
    }

    // Remove all filtering logic - backend handles:
    // - price filter
    // - status filter
    // - category filter
    // - subcategory filter
    // - item filter
    // - color filter
    // - brand filter

    content = (
      <>
        <ShopArea
          all_products={products.data}
          products={product_items}
          otherProps={otherProps}
          query={query} // Pass query for breadcrumb and filtering info
        />
        <ShopFilterOffCanvas
          all_products={products.data}
          otherProps={otherProps}
        />
      </>
    );
  }

  // Generate dynamic page title based on filters
  let pageTitle = "Shop";
  if (query.category) {
    const category = findCategoryBySlug(query.category);
    if (category) {
      pageTitle = category.title;
      if (query.subcategory) {
        const subCategory = findSubCategoryBySlug(
          query.category,
          query.subcategory
        );
        if (subCategory) {
          pageTitle += ` - ${subCategory.title}`;
        }
      }
    }
  }

  return (
    <Wrapper>
      <SEO pageTitle={pageTitle} />
      <HeaderTwo style_2={true} />
      <ShopBreadcrumb
        title={pageTitle}
        subtitle="Shop Grid"
        category={query.category ? findCategoryBySlug(query.category) : null}
        subCategory={
          query.subcategory
            ? findSubCategoryBySlug(query.category, query.subcategory)
            : null
        }
      />
      {content}
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default ShopPage;

export const getServerSideProps = async (context) => {
  const { query } = context;

  return {
    props: {
      query,
    },
  };
};
