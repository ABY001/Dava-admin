import { Pagination, ProductTable, RowsPerPage, Sidebar, WhiteButton } from "../components";
import { HiOutlinePlus } from "react-icons/hi";
import { HiOutlineChevronRight } from "react-icons/hi";
import { HiOutlineSearch } from "react-icons/hi";
import { useAppSelector } from "../hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { products, error } = useAppSelector((state) => state.products);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (error === "Invalid token") {
      navigate("/login");
    }
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  return (
    <div className="h-screen border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full ">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-10">
          <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                All products
              </h2>
              <p className="dark:text-whiteSecondary text-blackPrimary text-base font-normal flex items-center">
                <span>Dashboard</span>{" "}
                <HiOutlineChevronRight className="text-lg" />{" "}
                <span>All products</span>
              </p>
            </div>
          </div>
          <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center mt-5 max-sm:flex-col max-sm:gap-2">
            <div className="relative">
              <HiOutlineSearch className="text-gray-400 text-lg absolute top-3 left-3" />
              <input
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-60 h-10 border dark:bg-blackPrimary bg-white border-gray-600 dark:text-whiteSecondary text-blackPrimary outline-0 indent-10 focus:border-gray-500"
                placeholder="Search products..."
              />
            </div>
            <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-2 max-[370px]:items-center">

              <WhiteButton link="/products/create-product" text="Add a product" textSize="lg" py="2" width="48"><HiOutlinePlus className="dark:text-blackPrimary text-whiteSecondary" /></WhiteButton>
            </div>
          </div>
          <ProductTable filteredProducts={filteredProducts} />
          <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-6 max-sm:flex-col gap-4 max-sm:pt-6 max-sm:pb-0">
            <RowsPerPage />
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Products;
