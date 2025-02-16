// Import các hook cần thiết từ React
import { useEffect, useState } from "react";

// Import icon được sử dụng trong giao diện (icon chỉnh sửa)
import { IoIosCreate } from "react-icons/io";

// Import component Modal để hiển thị hộp thoại
import Modal from 'react-modal';

// Import icon hủy (đóng) từ thư viện react-icons
import { MdCancel } from "react-icons/md";

// Import thư viện SweetAlert2 để hiển thị thông báo đẹp mắt
import Swal from 'sweetalert2/dist/sweetalert2.js';

// Import stylesheet của SweetAlert2 để có kiểu dáng sẵn
import 'sweetalert2/src/sweetalert2.scss';
import { getCategoryList } from "../../services/cartegoryService";
import { editProduct } from "../../services/productsService";

// Định nghĩa component EditProduct nhận vào props
function EditProduct(props) {
    // Sử dụng destructuring để lấy các thuộc tính cần dùng từ props
    // 'item': đối tượng sản phẩm cần chỉnh sửa, 'onReload': hàm gọi lại sau khi cập nhật
    const { item, onReload } = props;

    // Khai báo state 'ismodel' để quản lý trạng thái mở/đóng modal, ban đầu là false (đóng)
    const [ismodel, setModel] = useState(false);

    // Khai báo state 'data' chứa thông tin sản phẩm, khởi tạo ban đầu bằng giá trị của 'item'
    const [data, setData] = useState(item);

    // Khai báo state 'dataCategory' để lưu danh sách danh mục (category), khởi tạo bằng mảng rỗng
    const [dataCategory, setDataCategory] = useState([]);

    // Sử dụng useEffect để fetch dữ liệu danh mục khi component được mount
    useEffect(() => {
        // Định nghĩa hàm bất đồng bộ fetchApi để lấy dữ liệu danh mục từ server
        const fetchApi = async () => {
            fetch("http://localhost:3002/category") // Gửi request đến API lấy danh mục
            const result = await getCategoryList();
            setDataCategory(result)
        }
        // Gọi hàm fetchApi để thực thi việc lấy dữ liệu
        fetchApi();
    }, []) // Mảng dependency rỗng nghĩa là chỉ chạy 1 lần khi component mount

    // Định nghĩa các kiểu tùy chỉnh cho Modal (để căn giữa modal)
    const customStyles = {
        content: {
            top: '50%',            // Đặt khoảng cách từ đỉnh viewport là 50%
            left: '50%',           // Đặt khoảng cách từ bên trái viewport là 50%
            right: 'auto',         // Tự động tính toán bên phải
            bottom: 'auto',        // Tự động tính toán bên dưới
            marginRight: '-50%',   // Điều chỉnh lề phải để cân bằng vị trí
            transform: 'translate(-50%, -50%)', // Dịch chuyển modal lên và sang trái 50% để căn giữa hoàn toàn
        },
    };

    // Hàm xử lý thay đổi của các input trong form
    const handleChange = (e) => {
        // Lấy tên (name) và giá trị (value) của input thay đổi
        const name = e.target.name;
        const value = e.target.value;
        // Cập nhật state 'data' với giá trị mới, giữ lại các trường khác không đổi
        setData({
            ...data,
            [name]: value
        });
    }

    // Hàm mở modal: khi gọi hàm này, modal sẽ được hiển thị
    function openModal() {
        console.log(item); // In thông tin sản phẩm ra console (dùng để debug)
        setModel(true);    // Đặt state ismodel thành true để mở modal
    }

    // Hàm đóng modal: khi gọi hàm này, modal sẽ ẩn đi
    function closeModal() {
        setModel(false);   // Đặt state ismodel thành false để đóng modal
    }

    // Hàm xử lý khi submit form cập nhật sản phẩm
    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn form reload

        // Hỏi trước khi cập nhật
        const confirmResult = await Swal.fire({
            title: "BẠN CÓ MUỐN CẬP NHẬT THÔNG TIN?",
            icon: "question",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "LƯU",
            denyButtonText: "KHÔNG LƯU"
        });

        if (confirmResult.isConfirmed) {
            // Nếu người dùng xác nhận, tiến hành cập nhật
            const ketqua = await editProduct(item.id, data);
            if (ketqua) {
                // Cập nhật thành công, đóng modal
                setModel(false);
                onReload(); // Làm mới danh sách sản phẩm

                Swal.fire({
                    title: "CẬP NHẬT THÀNH CÔNG",
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "CẬP NHẬT THẤT BẠI",
                    icon: "error"
                });
            }
        } else if (confirmResult.isDenied) {
            Swal.fire("KHÔNG LƯU THAY ĐỔI", "", "info");
        }
    };


    // Phần giao diện trả về (JSX)
    return (
        <>
            {/* Nút mở modal để chỉnh sửa sản phẩm */}
            <button className="products__ButtonEdit" onClick={openModal}>
                <IoIosCreate /> Chỉnh sửa sản phẩm
            </button>

            {/* Modal hiển thị form chỉnh sửa sản phẩm */}
            <Modal
                isOpen={ismodel}              // Xác định modal có mở hay không dựa vào state ismodel
                onRequestClose={closeModal}   // Định nghĩa hành động khi người dùng yêu cầu đóng modal (click bên ngoài, phím Esc)
                style={customStyles}          // Áp dụng kiểu dáng tùy chỉnh cho modal
                contentLabel="Example Modal"  // Nhãn mô tả nội dung của modal (hữu ích cho truy cập)
            >
                {/* Form cập nhật sản phẩm */}
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            {/* Hàng nhập tiêu đề sản phẩm */}
                            <tr>
                                <td>Tiêu đề</td>
                                <td>
                                    <input
                                        type="text"
                                        name="title"
                                        onChange={handleChange}      // Gọi handleChange khi giá trị thay đổi
                                        value={data.title}           // Liên kết giá trị của input với data.title
                                        required                   // Bắt buộc phải nhập
                                    />
                                </td>
                            </tr>

                            {/* Nếu có dữ liệu danh mục, hiển thị hàng chọn danh mục */}
                            {
                                dataCategory.length > 0 && (
                                    <tr>
                                        <td>Doanh mục</td>
                                        <td>
                                            <select
                                                name="category"
                                                onChange={handleChange}
                                                value={data.category}
                                            >
                                                {/* Duyệt qua mảng dataCategory để tạo option cho mỗi danh mục */}
                                                {dataCategory.map((item, index) => (
                                                    <option key={index} value={item.name}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                )
                            }

                            {/* Hàng nhập giá sản phẩm */}
                            <tr>
                                <td>Giá</td>
                                <td>
                                    <input
                                        type="text"
                                        name="price"
                                        onChange={handleChange}
                                        value={data.price}
                                        required
                                    />
                                </td>
                            </tr>

                            {/* Hàng nhập phần trăm giảm giá */}
                            <tr>
                                <td>Giảm Giá</td>
                                <td>
                                    <input
                                        type="text"
                                        name="discountPercentage"
                                        onChange={handleChange}
                                        value={data.discountPercentage}
                                        required
                                    />
                                </td>
                            </tr>

                            {/* Hàng nhập số lượng còn lại của sản phẩm */}
                            <tr>
                                <td>Số lượng còn lại</td>
                                <td>
                                    <input
                                        type="number"
                                        name="stock"
                                        onChange={handleChange}
                                        value={data.stock}
                                        required
                                    />
                                </td>
                            </tr>

                            {/* Hàng nhập đường link hình ảnh */}
                            <tr>
                                <td>Link</td>
                                <td>
                                    <input
                                        type="text"
                                        name="thumbnail"
                                        onChange={handleChange}
                                        value={data.thumbnail}
                                        required
                                    />
                                </td>
                            </tr>

                            {/* Hàng nhập mô tả sản phẩm */}
                            <tr>
                                <td>Mô tả</td>
                                <td>
                                    <textarea
                                        rows={4}
                                        name="description"
                                        onChange={handleChange}
                                        value={data.description}
                                        required
                                    ></textarea>
                                </td>
                            </tr>

                            {/* Hàng chứa nút Hủy và Cập nhật */}
                            <tr>
                                <td>
                                    {/* Nút hủy: khi nhấn, gọi hàm closeModal để đóng modal */}
                                    <button onClick={closeModal}>
                                        <MdCancel /> Hủy
                                    </button>
                                </td>
                                <td>
                                    {/* Nút cập nhật: khi nhấn, submit form và gọi handleSubmit */}
                                    <button>
                                        <IoIosCreate /> Cập nhật
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </Modal>
        </>
    );
}

// Xuất component EditProduct để có thể sử dụng ở nơi khác
export default EditProduct;
