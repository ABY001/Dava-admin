import { ImageUpload, InputWithLabel, Sidebar } from "../components";
import { HiOutlineSave } from "react-icons/hi";
import { Link } from "react-router-dom";
import SimpleInput from "../components/SimpleInput";
import SelectInput from "../components/SelectInput";
import { stockStatusList } from "../utils/data";
import { useState } from "react";
import tab1 from "/src/assets/tablet (1).jpg";
import tab2 from "/src/assets/tablet (2).jpg";
import tab3 from "/src/assets/tablet (3).jpg";
import tab4 from "/src/assets/tablet (4).jpg";

const EditProduct = () => {
  const [formData, setInputObject] = useState({
    name: "Samsung Galaxy Tab A7 Lite",
    price: "$80",
    stock: "50",
    stockStatus: stockStatusList[0].value,
    amazonLink: "#"
  });

  const handleImageUpload = (imageUrl: string) => {
    // setInputObject({ ...formData, imageUrl });
  };

  return (
    <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full ">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-10">
          <div className="px-4 sm:px-6 lg:px-8 pb-8 border-b border-gray-800 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Edit product
              </h2>
            </div>
            <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-2 max-[370px]:items-center">

              <Link
                to="/products/add-product"
                className="dark:bg-whiteSecondary bg-blackPrimary w-48 py-2 text-lg dark:hover:bg-white hover:bg-blackSecondary duration-200 flex items-center justify-center gap-x-2"
              >
                <HiOutlineSave className="dark:text-blackPrimary text-whiteSecondary text-xl" />
                <span className="dark:text-blackPrimary text-whiteSecondary font-semibold">
                  Update product
                </span>
              </Link>
            </div>
          </div>

          {/* Add Product section here  */}
          <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-8 grid grid-cols-2 gap-x-10 max-xl:grid-cols-1 max-xl:gap-y-10">
            {/* left div */}
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Basic information
              </h3>

              <div className="mt-4 flex flex-col gap-5">
                <InputWithLabel label="Name">
                  <SimpleInput
                    type="text"
                    placeholder="Enter a product name..."
                    value={formData.name}
                    onChange={(e) =>
                      setInputObject({ ...formData, name: e.target.value })
                    }
                  />
                </InputWithLabel>
              </div>

              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary mt-16">
                Pricing & Inventory
              </h3>

              <div className="mt-4 flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-x-5 max-[500px]:grid-cols-1 max-[500px]:gap-x-0 max-[500px]:gap-y-5">
                  <InputWithLabel label="Price">
                    <SimpleInput
                      type="text"
                      placeholder="Enter a price..."
                      value={formData.price}
                      onChange={(e) =>
                        setInputObject({
                          ...formData,
                          price: e.target.value,
                        })
                      }
                    />
                  </InputWithLabel>
                  <InputWithLabel label="Stock">
                    <SimpleInput
                      type="text"
                      placeholder="Enter a product stock..."
                      value={formData.stock}
                      onChange={(e) =>
                        setInputObject({
                          ...formData,
                          stock: e.target.value,
                        })
                      }
                    />
                  </InputWithLabel>
                </div>

                <InputWithLabel label="Stock status">
                  <SelectInput
                    selectList={stockStatusList}
                    value={formData.stockStatus}
                    onChange={(e) =>
                      setInputObject({
                        ...formData,
                        stockStatus: e.target.value,
                      })
                    }
                  />
                </InputWithLabel>
              </div>

              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary mt-16">
                Product Order Link
              </h3>

              <div className="mt-4 flex flex-col gap-5">
                <InputWithLabel label="Name">
                  <SimpleInput
                    type="text"
                    placeholder="Enter the amazon order link..."
                    value={formData.amazonLink}
                    onChange={(e) =>
                      setInputObject({ ...formData, name: e.target.value })
                    }
                  />
                </InputWithLabel>
              </div>
            </div>


            {/* right div */}
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Product images
              </h3>

              <ImageUpload onImageUpload={handleImageUpload} />
              <div className="flex justify-center gap-x-2 mt-5 flex-wrap">
                <img src={tab1} alt='' className="w-36 h-32" />
                <img src={tab2} alt="" className="w-36 h-32" />
                <img src={tab3} alt='' className="w-36 h-32" />
                <img src={tab4} alt="" className="w-36 h-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditProduct;
