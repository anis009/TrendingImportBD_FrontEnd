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
  const { data: products, isError, isLoading } = useGetAllProductsQuery();
  const { data: categories } = useGetCategoriesHierarchyQuery();
  const [priceValue, setPriceValue] = useState([0, 0]);
  const [selectValue, setSelectValue] = useState("");
  const [currPage, setCurrPage] = useState(1);

  // Load the maximum price once the products have been loaded
  useEffect(() => {
    if (!isLoading && !isError && products?.data?.length > 0) {
      const maxPrice = products.data.reduce((max, product) => {
        return product.price > max ? product.price : max;
      }, 0);
      setPriceValue([0, maxPrice]);
    }
  }, [isLoading, isError, products]);

  // Helper function to find category by slug
  const findCategoryBySlug = (slug) => {
    if (!categories?.data) return null;
    return categories.data.find((cat) => cat.slug === slug);
  };

  // Helper function to find subcategory by slug
  const findSubCategoryBySlug = (categorySlug, subCategorySlug) => {
    const category = findCategoryBySlug(categorySlug);
    if (!category?.subCategories) return null;
    return category.subCategories.find(
      (subCat) => subCat.slug === subCategorySlug
    );
  };

  // Helper function to find item by name
  const findItemByName = (categorySlug, subCategorySlug, itemName) => {
    const subCategory = findSubCategoryBySlug(categorySlug, subCategorySlug);
    if (!subCategory?.items) return null;
    return subCategory.items.find(
      (item) => item.name === decodeURIComponent(itemName)
    );
  };

  // Helper function to create URL-safe slug
  const createSlug = (text) => {
    return text
      ?.toLowerCase()
      .replace(/&/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .split(/\s+/)
      .join("-");
  };

  // Helper function to check if product matches category/subcategory
  const productMatchesCategory = (
    product,
    categorySlug,
    subCategorySlug = null
  ) => {
    // Check if product has category information
    if (!product.parent && !product.children && !product.category) {
      return false;
    }

    // Try different product category field names (adjust based on your actual product structure)
    const productCategory =
      product.parent || product.category?.name || product.categoryName;
    const productSubCategory =
      product.children || product.subCategory?.name || product.subCategoryName;

    if (categorySlug && productCategory) {
      const productCategorySlug = createSlug(productCategory);
      if (productCategorySlug !== categorySlug) {
        return false;
      }
    }

    if (subCategorySlug && productSubCategory) {
      const productSubCategorySlug = createSlug(productSubCategory);
      if (productSubCategorySlug !== subCategorySlug) {
        return false;
      }
    }

    return true;
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
  if (!isLoading && !isError && products?.data?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }
  if (!isLoading && !isError && products?.data?.length > 0) {
    // products
    let product_items = products.data;

    // select sort filtering
    if (selectValue) {
      if (selectValue === "Default Sorting") {
        product_items = products.data;
      } else if (selectValue === "Low to High") {
        product_items = products.data
          .slice()
          .sort((a, b) => Number(a.price) - Number(b.price));
      } else if (selectValue === "High to Low") {
        product_items = products.data
          .slice()
          .sort((a, b) => Number(b.price) - Number(a.price));
      } else if (selectValue === "New Added") {
        product_items = products.data
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (selectValue === "On Sale") {
        product_items = products.data.filter((p) => p.discount > 0);
      } else {
        product_items = products.data;
      }
    }

    // price filter
    product_items = product_items.filter(
      (p) => p.price >= priceValue[0] && p.price <= priceValue[1]
    );

    // status filter
    if (query.status) {
      if (query.status === "on-sale") {
        product_items = product_items.filter((p) => p.discount > 0);
      } else if (query.status === "in-stock") {
        product_items = product_items.filter((p) => p.status === "in-stock");
      }
    }

    // NEW: Category filter using new hierarchy API
    if (query.category) {
      product_items = product_items.filter((product) =>
        productMatchesCategory(product, query.category)
      );
    }

    // NEW: Subcategory filter using new hierarchy API
    if (query.subcategory) {
      product_items = product_items.filter((product) =>
        productMatchesCategory(product, query.category, query.subcategory)
      );
    }

    // NEW: Item filter (if you want to filter by specific items)
    if (query.item) {
      const decodedItem = decodeURIComponent(query.item);
      product_items = product_items.filter((product) => {
        // You might want to check product names, tags, or specific item matches
        return (
          product.title?.toLowerCase().includes(decodedItem.toLowerCase()) ||
          product.tags?.some((tag) =>
            tag.toLowerCase().includes(decodedItem.toLowerCase())
          )
        );
      });
    }

    // color filter (keep existing logic)
    if (query.color) {
      product_items = product_items.filter((product) => {
        if (!product.imageURLs || !Array.isArray(product.imageURLs)) {
          return false;
        }
        for (let i = 0; i < product.imageURLs.length; i++) {
          const color = product.imageURLs[i]?.color;
          if (color && createSlug(color.name) === query.color) {
            return true;
          }
        }
        return false;
      });
    }

    // brand filter (keep existing logic but use helper function)
    if (query.brand) {
      product_items = product_items.filter((product) => {
        if (!product.brand?.name) return false;
        return createSlug(product.brand.name) === query.brand;
      });
    }

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
