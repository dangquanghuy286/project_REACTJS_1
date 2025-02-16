import { useState } from "react";
import CreateProduct from "./CreateProduct";
import ProductsList from "./ProductsList";

function Products() {
    const [reload, setReload] = useState(false);
    const handleReload = () => {
        setReload(!reload);
    }
    return (
        <>
            <h2>Danh sách sản phẩm</h2>
            <CreateProduct onReload={handleReload} />
            <ProductsList reload={reload} />
        </>
    )
}
export default Products;