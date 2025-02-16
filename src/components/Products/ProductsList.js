import { useEffect, useState } from "react";
import "./Products.css";

// 
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

function ProductsList(props) {
    // Lấy thuộc tính reload từ props
    const { reload } = props;
    // Khai báo state data bằng hook useState
    const [data, setData] = useState([]);
    // Hiển thị data trong console
    const [editReload, setEditReload] = useState(false);
    const handleReload = () => {
        setEditReload(!editReload);
    }
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
    }, [reload, editReload])

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
                                <EditProduct item={item} onReload={handleReload} />

                                <DeleteProduct item={item} onReload={handleReload} />


                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default ProductsList;
