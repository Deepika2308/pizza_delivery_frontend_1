import {useFormik} from 'formik';
import * as yup from 'yup';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useState} from 'react';
import {API} from "../../global.js";

export function AddNewVeg(){

    const navigate= useNavigate();

    let[msg,setMsg] = useState("");

    const formValidation = yup.object({
        name:yup.string().required("Required!"),
        desc:yup.string().required("Required!"),
        imgSrc:yup.string().required("Required!").url("Enter a valid url!!"),
        regular:yup.number().positive(),
        medium:yup.number().positive(),
        large:yup.number().positive(),
    })

    const {values,handleChange,handleSubmit,errors,touched} = useFormik(
        {
            initialValues:{name:"",desc:"",imgSrc:"",regular:1,medium:1,large:1},
            validationSchema:formValidation,
            onSubmit: (values) =>{
                const obj ={
                    name:values.name,
                    desc:values.desc,
                    price:{
                        regular:values.regular,
                        medium:values.medium,
                        large:values.large,
                    },
                    img:values.imgSrc
                }
                async function addNewMenu() {
                    return await axios.post(`${API}/addMenu/addVegMenu`,obj);
                }

                addNewMenu().then((res) => setMsg(res.data.data)).catch((res) => setMsg(res.data.error));
            }
        }
    )
    return(
        <form className="add-new-recipe w-50 m-auto mt-5 d-flex flex-column gap-3" onSubmit={handleSubmit}>
            <p> Enter the name, description and image URL of new pizza in the below form</p>
            
            <input type="text" className="form-control" name="name" id="name" placeholder="Pizza Name" value={values.name} onChange={handleChange}></input>
            {errors.name && touched.name ? <div className="text-danger">{errors.name}</div> :""}
            <input type="text" className="form-control" name="desc" id="desc" placeholder="Description" value={values.desc} onChange={handleChange}></input>
            {errors.desc && touched.desc ? <div className="text-danger">{errors.desc}</div> :""}
            <input type="url" className="form-control" name="imgSrc" id="imgSrc" placeholder="Image link" value={values.imgSrc} onChange={handleChange}></input>
            {errors.imgSrc && touched.imgSrc ? <div className="text-danger">{errors.imgSrc}</div> :""}
            <label htmlFor='regular' className="text-start text-danger">Price of regular pizza</label>
            <input type="number" className="form-control" id="regular" name="regular" placeholder="price for regular" value={values.regular} onChange={handleChange}></input>
            {errors.regular && touched.regular ? <div className="text-danger">{errors.regular}</div> :""}
            <label htmlFor='medium' className="text-start text-danger">Price of medium pizza</label>
            <input type="number" className="form-control" id="medium" name="medium" placeholder="price for medium" value={values.medium} onChange={handleChange}></input>
            {errors.medium && touched.medium ? <div className="text-danger">{errors.medium}</div> :""}
            <label htmlFor='large' className="text-start text-danger">Price of large pizza</label>
            <input type="number" className="form-control" id="large" name="large" placeholder="price for large" value={values.large} onChange={handleChange}></input>
            {errors.large && touched.large ? <div className="text-danger">{errors.large}</div> :""}

            {msg !== "" ? <p className="text-success">{msg}</p> : ""}
            <div className="d-flex gap-2 m-auto">
                <button className="btn btn-danger" type="submit">Submit</button>
                <button className="btn btn-danger" type="button" onClick ={() => navigate("/adminHomePage")}>Cancel</button>
            </div>
        </form>
    )
}