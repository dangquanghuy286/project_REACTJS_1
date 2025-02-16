import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { deleteProduct } from "../../services/productsService";

function DeleteProduct({ item, onReload }) {
    // Hàm handleDelete sử dụng async/await
    const handleDelete = async () => {
        const result = await Swal.fire({
            title: "Bạn có chắc muốn xóa không?",
            text: "Không thể quay lại sau khi xóa!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Vẫn xóa!",
            cancelButtonText: "Hủy"
        });

        // Kiểm tra nếu người dùng xác nhận xóa
        if (result.isConfirmed) {
            const data = await deleteProduct(item.id)
            if (data) {
                onReload(); // Reload lại danh sách sau khi xóa thành công
                Swal.fire({
                    title: "Đã xóa thành công!",
                    text: "Sản phẩm đã được xóa.",
                    icon: "success"
                });
            }
        }
    };

    return (
        <button onClick={handleDelete} className="products__ButtonDelete">
            <MdDeleteOutline /> Xóa
        </button>
    );
}

export default DeleteProduct;
