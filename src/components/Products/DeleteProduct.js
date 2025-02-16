import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

function DeleteProduct({ item, onReload }) {
    const handleDelete = () => {
        Swal.fire({
            title: "Bạn có chắc muốn xóa không?",
            text: "Không thể quay lại sau khi xóa!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Vẫn xóa!",
            cancelButtonText: "Hủy"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3002/products/${item.id}`, {
                    method: "DELETE", // Sử dụng DELETE để xóa sản phẩm
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                })
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error("Lỗi mạng");
                        }
                        return res.json();
                    })
                    .then(() => {
                        onReload(); // Reload lại danh sách sau khi xóa thành công
                        Swal.fire({
                            title: "Đã xóa thành công!",
                            text: "Sản phẩm đã được xóa.",
                            icon: "success"
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                        Swal.fire({
                            title: "Lỗi!",
                            text: "Có lỗi xảy ra khi xóa sản phẩm.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    return (
        <button onClick={handleDelete} className="products__ButtonDelete">
            <MdDeleteOutline /> Xóa
        </button>
    );
}

export default DeleteProduct;
