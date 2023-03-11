import {useEffect,useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import './orderHistory.css';
import {useNavigate} from 'react-router-dom';
import {API} from "../global.js";

export function OrderHistory(){
const user = useSelector((state) =>  state.user.users);

const navigate = useNavigate();

let [orderHistory,setOrderHistory] = useState([]);

const obj = {email:user.result.email};

    useEffect(() => {
        async function getOrderHistory(){
            const url = `${API}/order/getOrderHistory`;
            const fetchHistory = await axios.post(url,obj);
            if(fetchHistory.data.message !== "No order history"){
                setOrderHistory(fetchHistory.data.message);
            }
        }
        getOrderHistory();
    },[])
    return(
        <div className="d-flex flex-column">
            <button className="btn btn-danger col-2 m-auto mt-4" type="button" onClick={() => navigate("/userHomePage")}>Home Page</button>
        <div className="d-flex flex-wrap justify-content-evenly gap-3 mb-4">
            {orderHistory.map((order,index) => {
                const date= new Date(order.date).toString();

                return <div className="card order-history-card mt-5" key={index}>
                <div className="card-body">
                  <h5 className="card-title text-danger">{order.orderId}</h5>
                  <div className="card-text">
                    <div className="receipt text-start">{`Receipt - ${order.receipt}`}</div>
                    <div className="order-date text-start">{date}</div>
                  </div>

                  <div className="order-items d-flex flex-column">
                    {order.orderItems.map((pizza,index) => {
                        return <div key={index}>
                        <div className="pizza-name text-danger text-start">{pizza.name}</div>
                        <div className="other-details text-start">{`${pizza.size} - ${pizza.crust} - ${pizza.quantity}`}</div>
                        </div>
                    })}
                    </div>
                    <div className="amount mt-3 text-start">{`Amount - ${order.amount}`}</div>
                </div>
              </div>
            })}
        </div>
        </div>
    )
}