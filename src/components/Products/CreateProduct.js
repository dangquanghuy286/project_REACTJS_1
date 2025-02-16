import { useEffect, useState } from "react";
import { IoIosCreate } from "react-icons/io";
import Modal from 'react-modal';
import { MdCancel } from "react-icons/md";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

function CreateProduct(props) {
    // Sử dụng destructuring để lấy onReload từ props
    const { onReload } = props;
    // Hook useState để quản lý state
    const [ismodel, setModel] = useState(false);
    const [data, setData] = useState({});
    const [dataCategory, setDataCategory] = useState([]);

    // Hook useEffect để fetch dữ liệu danh mục khi component được mount
    useEffect(() => {
        const fetchApi = async () => {
            fetch("http://localhost:3002/category")
                .then(res => res.json())
                .then(data => {
                    setDataCategory(data)
                })
        }
        fetchApi();
    }, [])

    // Các kiểu tùy chỉnh cho modal
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    // Xử lý thay đổi đầu vào và cập nhật state data
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({
            ...data,
            [name]: value
        })
    }

    // Hàm để mở modal
    function openModal() {
        setModel(true);
    }

    // Hàm để đóng modal
    function closeModal() {
        setModel(false);
    }

    // Xử lý việc gửi form
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:3002/products", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setModel(false);
                    onReload();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Tạo mới thành công!",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    return (
        <>
            <button onClick={openModal}> <IoIosCreate /> Tạo mới sản phẩm</button>
            <Modal
                isOpen={ismodel}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Tiêu đề</td>
                                <td>
                                    <input type="text" name="title" onChange={handleChange} required />
                                </td>
                            </tr>
                            {
                                dataCategory.length > 0 && (
                                    <tr>
                                        <td>Doanh mục</td>
                                        <td>
                                            <select name="category" onChange={handleChange} >
                                                {dataCategory.map((item, index) => (
                                                    <option key={index} value={item.name}>{item.name}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                )
                            }
                            <tr>
                                <td>Giá</td>
                                <td>
                                    <input type="text" name="price" onChange={handleChange} required />
                                </td>
                            </tr>
                            <tr>
                                <td>Giảm Giá</td>
                                <td>
                                    <input type="text" name="discountPercentage" onChange={handleChange} required />
                                </td>
                            </tr>
                            <tr>
                                <td>Số lượng còn lại</td>
                                <td>
                                    <input type="number" name="stock" onChange={handleChange} required />
                                </td>
                            </tr>
                            <tr>
                                <td>Link</td>
                                <td>
                                    <input type="text" name="thumbnail" onChange={handleChange} required />
                                </td>
                            </tr>
                            <tr>
                                <td>Mô tả</td>
                                <td>
                                    <textarea rows={4} name="description" onChange={handleChange} required></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button onClick={closeModal}>
                                        <MdCancel /> Hủy
                                    </button>
                                </td>
                                <td>
                                    <button>
                                        <IoIosCreate /> Tạo mới</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </Modal >
        </>
    )
}

export default CreateProduct;
