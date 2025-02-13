import { ImageUpload, InputWithLabel, Sidebar } from "../components";
import { HiOutlineSave } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import SimpleInput from "../components/SimpleInput";
import SelectInput from "../components/SelectInput";
import { stockStatusList } from "../utils/data";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useState } from "react";
import { createProduct } from "../store/productSlice";
import CustomButton from "../components/CustomButton";

const CreateProduct = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.products);

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    stock: 0,
    status: "",
    imageUrl: "",
    amazonLink: "",
    ocadoLink: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (imageUrl: string) => {
    setFormData({ ...formData, imageUrl });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.imageUrl) {
      alert("Please upload an image before submitting.");
      return;
    }

    dispatch(createProduct(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/products"); // Redirect after successful creation
      }
    });
  }

  return (
    <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full ">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-10">
          <div className="px-4 sm:px-6 lg:px-8 pb-8 border-b border-gray-800 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Add new product
              </h2>
            </div>
            <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-2 max-[370px]:items-center">
              <CustomButton
                textSize="lg"
                width="48"
                py="2"
                text="Publish product"
                loading={loading}
                onClick={(e) => handleSubmit(e)}
              >
                <HiOutlineSave className="dark:text-blackPrimary text-whiteSecondary text-xl" />
              </CustomButton>
            </div>
          </div>

          {/* Add Product section here  */}
          <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-8 grid grid-cols-2 gap-x-10 max-xl:grid-cols-1 max-xl:gap-y-10">
            {/* left div */}
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Basic information
              </h3>

              {error && <p className="text-red-500">{error}</p>}

              <div className="mt-4 flex flex-col gap-5">
                <InputWithLabel label="Name">
                  <SimpleInput
                    type="text"
                    name="name"
                    placeholder="Enter a product name..."
                    onChange={handleChange}
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
                      type="number"
                      name="price"
                      placeholder="Enter a price..."
                      onChange={handleChange}
                    />
                  </InputWithLabel>
                  <InputWithLabel label="Stock">
                    <SimpleInput
                      type="number"
                      name="stock"
                      placeholder="Enter a product stock..."
                      onChange={handleChange}
                    />
                  </InputWithLabel>
                </div>

                <InputWithLabel label="Stock status">
                  <SelectInput name="status" selectList={stockStatusList} />
                </InputWithLabel>
              </div>

              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary mt-16">
                Product Order Link
              </h3>

              <div className="mt-4 flex flex-col gap-5">
                <InputWithLabel label="Amazon">
                  <SimpleInput
                    type="text"
                    name="amazonLink"
                    placeholder="Enter the amazon order link..."
                    onChange={handleChange}
                  />
                </InputWithLabel>
                <InputWithLabel label="Ocado">
                  <SimpleInput
                    type="text"
                    name="ocadoLink"
                    placeholder="Enter the ocado order link..."
                    onChange={handleChange}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateProduct;
