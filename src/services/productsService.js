import { del, edit, get, post } from "../utils/request";

export const getProductList = async () => {
    const result = await get("products");
    return result;
}
export const createProduct = async (data) => {
    const result = await post("products", data)
    return result;
}
export const deleteProduct = async (id) => {
    const result = await del(`products/${id}`)
    return result;
};
export const editProduct = async (id, option) => {
    const result = await edit(`products/${id}`, option)
    return result;

}