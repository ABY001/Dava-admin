import { ImageUpload, InputWithLabel, Sidebar } from "../components";
import { HiOutlineSave } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import SimpleInput from "../components/SimpleInput";
import SelectInput from "../components/SelectInput";
import { stockStatusList } from "../utils/data";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { toast } from "sonner";
import { fetchProducts, updateProduct } from "../store/productSlice";
import CustomButton from "../components/CustomButton";

const EditProduct = () => {
  const { id, action } = useParams<{ id: string, action: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.products);
  const product = useAppSelector((state) => state.products.products.find((product) => product._id === id));

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    stock: 0,
    status: "",
    imageUrl: "",
    amazonLink: "",
    ocadoLink: ""
  });

  useEffect(() => {
    if (product) {
      setFormData({ name: product.name, price: product.price, stock: product.stock, amazonLink: product.amazonLink, ocadoLink: product.ocadoLink, status: product.status, imageUrl: product.imageUrl });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log('dddd', e.target);

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return
    await dispatch(updateProduct({ id, ...formData }));
    toast.success("Product edited successfully");
    dispatch(fetchProducts())
    navigate("/products");
  };

  const handleImageUpload = (imageUrl: string) => {
    setFormData({ ...formData, imageUrl });
  };

  return (
    <div className="h-screen border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full ">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-10">
          <div className="px-4 sm:px-6 lg:px-8 pb-8 border-b border-gray-800 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
            <div className="flex flex-col gap-3">
              {action && <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                {action.charAt(0).toUpperCase() + action.slice(1)} product
              </h2>}
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {action === 'edit' && <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-2 max-[370px]:items-center">
              <CustomButton
                textSize="lg"
                width="48"
                py="2"
                text="Update product"
                loading={loading}
                onClick={(e) => handleSubmit(e)}
              >
                <HiOutlineSave className="dark:text-blackPrimary text-whiteSecondary text-xl" />
              </CustomButton>
            </div>}
          </div>

          {/* Add Product section here  */}
          <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-8 grid grid-cols-2 gap-x-10 max-xl:grid-cols-1 max-xl:gap-y-10">
            {/* left div */}
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Basic information
              </h3>

              <div className="mt-4 flex flex-col gap-5">
                {action !== 'edit' && <InputWithLabel label="Id">
                  <SimpleInput
                    type="text"
                    disabled={true}
                    value={product?._id}
                  />
                </InputWithLabel>}

                <InputWithLabel label="Name">
                  <SimpleInput
                    type="text"
                    name="name"
                    disabled={action !== 'edit'}
                    placeholder="Enter a product name..."
                    value={formData.name}
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
                      disabled={action !== 'edit'}
                      placeholder="Enter a price..."
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </InputWithLabel>
                  <InputWithLabel label="Stock">
                    <SimpleInput
                      type="number"
                      name="stock"
                      disabled={action !== 'edit'}
                      placeholder="Enter a product stock..."
                      value={formData.stock}
                      onChange={handleChange}
                    />
                  </InputWithLabel>
                </div>

                <InputWithLabel label="Stock status">
                  <SelectInput
                    name="status"
                    disabled={action !== 'edit'}
                    selectList={stockStatusList}
                    value={formData.status}
                    onChange={handleChange}
                  />
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
                    disabled={action !== 'edit'}
                    placeholder="Enter the amazon order link..."
                    value={formData.amazonLink}
                    onChange={handleChange}
                  />
                </InputWithLabel>
                <InputWithLabel label="Ocado">
                  <SimpleInput
                    type="text"
                    name="ocadoLink"
                    disabled={action !== 'edit'}
                    placeholder="Enter the ocado order link..."
                    value={formData.ocadoLink}
                    onChange={handleChange}
                  />
                </InputWithLabel>
              </div>
            </div>


            {/* right div */}
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Product image
              </h3>

              {action === 'edit' && <ImageUpload onImageUpload={handleImageUpload} />}
              <div className="flex justify-start gap-x-2 mt-5 flex-wrap">
                <img src={product?.imageUrl} alt='' className="w-36 h-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditProduct;
