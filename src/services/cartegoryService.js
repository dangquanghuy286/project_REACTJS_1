import { get } from "../utils/request";

export const getCategoryList = async () => {

    const result = await get("category")
    return result;
}