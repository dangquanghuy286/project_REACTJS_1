import { useEffect, useState } from "react";
import "./Products.css";
import { MdDeleteOutline } from "react-icons/md";
// 
import EditProduct from "./EditProduct";

function ProductsList(props) {
    // Lấy thuộc tính reload từ props
    const { reload } = props;
    // Khai báo state data bằng hook useState
    const [data, setData] = useState([]);
    // Hiển thị data trong console
    console.log(data);

    // Sử dụng useEffect để fetch dữ liệu sản phẩm khi component được mount hoặc khi giá trị reload thay đổi
    useEffect(() => {
        const fetchApi = async () => {
            fetch("http://localhost:3002/products")
                .then(res => res.json())
                .then(data => {
                    setData(data.reverse()); // Đảo ngược danh sách sản phẩm khi reload
                })
        }
        fetchApi();
    }, [reload])

    return (
        <>
            <div className="products__List">
                {
                    // Lặp qua mỗi sản phẩm trong danh sách và tạo ra các phần tử hiển thị
                    data.map(item => (
                        <div className="products__Item" key={item.id}>
                            {/* Hiển thị hình ảnh sản phẩm */}
                            <div className="products__Image">
                                <img src={item.thumbnail} alt={item.title} />
                            </div>
                            {/* Hiển thị tiêu đề sản phẩm */}
                            <h4 className="product__title">{item.title}</h4>
                            {/* Hiển thị giá sản phẩm */}
                            <p className="products__price">{item.price}$</p>
                            {/* Hiển thị phần trăm giảm giá */}
                            <p className="products__discount">{item.discountPercentage}%</p>
                            {/* Hiển thị các nút chức năng (Xóa và Chỉnh sửa) */}
                            <div className="products__Button">
                                <button className="products__ButtonDelete">
                                    <MdDeleteOutline /> Delete
                                </button>
                                <EditProduct item={item} />


                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default ProductsList;
