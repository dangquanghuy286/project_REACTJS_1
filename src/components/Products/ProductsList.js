import { useEffect, useState } from "react";
import "./Products.css";
function ProductsList() {
    const [data, setData] = useState([]);
    console.log(data);
    useEffect(() => {
        const fetchApi = async () => {
            fetch("http://localhost:3002/products")
                .then(res => res.json())
                .then(data => {
                    setData(data)
                })

        }
        fetchApi();
    }, [])


    return (
        <>
            <div className="products__List">
                {
                    data.map(item => (
                        <div className="products__Item" key={item.id}>
                            <div className="products__Image"><img src={item.thumbnail} alt={item.title} /></div>
                            <h4 className="product__title">{item.title}</h4>
                            <p className="products__price">{item.price}$</p>
                            <p className="products__discount">{item.discountPercentage}%</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
export default ProductsList;