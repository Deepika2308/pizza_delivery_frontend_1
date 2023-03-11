import {useFormik} from 'formik';
import * as yup from 'yup';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import {useSelector} from 'react-redux';
import {API} from "../../global.js";

export function EditForm(){

    const jwtToken = useSelector((state) => state.user.jwtToken);

    const {pizzaId} = useParams();
    const[pizza,setPizza] = useState({});

    useEffect(() =>{
        async function fetchPizzaDetails(){
           return await axios.get(`${API}/items/findPizza/${pizzaId}`);
        }
        fetchPizzaDetails()
        .then((res) => {
            setPizza(res.data)})
        .catch((err) => console.log(err.data.error));
    },[])

    return pizza.hasOwnProperty("_id") ? <EditPizzaForm pizza={pizza} jwtToken={jwtToken} /> :"";
}
    

function EditPizzaForm({pizza,jwtToken}){
        let[msg,setMsg] = useState("");
        const navigate= useNavigate();

        const formValidation = yup.object({
            regular:yup.number().positive(),
            medium:yup.number().positive(),
            large:yup.number().positive(),
        })
    
        const {values,handleChange,handleSubmit,errors,touched} = useFormik(
            {
                initialValues:{name:pizza.name,desc:pizza.desc,imgSrc:pizza.img,regular:pizza.price.regular,medium:pizza.price.medium,large:pizza.price.large},
                validationSchema:formValidation,
                onSubmit: (values) =>{
                    const obj ={
                        price:{
                            regular:values.regular,
                            medium:values.medium,
                            large:values.large,
                        }
                    }
                    async function editPrice() {
                        let header ={
                            headers:{
                                "x-auth-token":jwtToken
                            }
                        }
                        return await axios.patch(`${API}/editPrice/${pizza._id}`,obj,header);
                    }
    
                    editPrice().then((res) => setMsg(res.data)).catch((res) => {
                        setMsg(res.response.data.error);
                    });
                }
            }
        )

        return(
            <form className="add-new-recipe w-50 m-auto mt-5 d-flex flex-column gap-3" onSubmit={handleSubmit}>
                <p> Enter details to edit in the below form</p>
                
                <input type="text" className="form-control" name="name" id="name" placeholder="Pizza Name" value={values.name} onChange={handleChange} readOnly></input>
                {errors.name && touched.name ? <div className="text-danger">{errors.name}</div> :""}
                <input type="text" className="form-control" name="desc" id="desc" placeholder="Description" value={values.desc} onChange={handleChange} readOnly></input>
                {errors.desc && touched.desc ? <div className="text-danger">{errors.desc}</div> :""}
                <input type="url" className="form-control" name="imgSrc" id="imgSrc" placeholder="Image link" value={values.imgSrc} onChange={handleChange} readOnly></input>
                {errors.imgSrc && touched.imgSrc ? <div className="text-danger">{errors.imgSrc}</div> :""}
                <input type="number" className="form-control" id="regular" name="regular" placeholder="price for regular" value={values.regular} onChange={handleChange}></input>
                {errors.regular && touched.regular ? <div className="text-danger">{errors.regular}</div> :""}
                <input type="number" className="form-control" id="medium" name="medium" placeholder="price for medium" value={values.medium} onChange={handleChange}></input>
                {errors.medium && touched.medium ? <div className="text-danger">{errors.medium}</div> :""}
                <input type="number" className="form-control" id="large" name="large" placeholder="price for large" value={values.large} onChange={handleChange}></input>
                {errors.large && touched.large ? <div className="text-danger">{errors.large}</div> :""}
    
                {msg !== "" ? <p className="text-danger">{msg}</p> : ""}
                <div className="d-flex gap-2 m-auto">
                    <button className="btn btn-danger" type="submit">Edit</button>
                    <button className="btn btn-danger" type="button" onClick ={() => navigate("/adminHomePage")}>Cancel</button>
                </div>
            </form>
        )
       
    }

    
    