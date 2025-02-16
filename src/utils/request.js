const API_DOMAIN = "http://localhost:3002/";
export const get = async (path) => {

    const response = await fetch(API_DOMAIN + path);
    const result = await response.json();
    return result;
}
export const post = async (path, data) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const result = await response.json();

    return result;
}
export const del = async (path, id) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "DELETE", // Sử dụng DELETE để xóa sản phẩm
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    return data;
};
export const edit = async (path, option) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "PUT", // Sử dụng phương thức PUT để cập nhật dữ liệu (có thể dùng PATCH tùy mục đích)
        headers: {
            Accept: "application/json", // Chấp nhận dữ liệu JSON từ server
            "Content-Type": "application/json" // Gửi dữ liệu dưới dạng JSON
        },
        // Chuyển đổi state 'data' thành chuỗi JSON để gửi đi
        body: JSON.stringify(option)
    })
    const ketqua = await response.json();
    return ketqua;
}