import CreateProduct from "../CreateProduct";
import ProductsList from "./ProductsList";

function Products() {
    return (
        <>
            <h2>Danh sách sản phẩm</h2>
            <CreateProduct />
            <ProductsList />
        </>
    )
}
export default Products;