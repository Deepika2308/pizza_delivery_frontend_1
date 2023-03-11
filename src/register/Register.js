import './Register.css';
import {useNavigate} from "react-router-dom";
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useState} from 'react';
import {API} from "../global.js";

export function RegisterForm(){
    const navigate= useNavigate();
    let[showMsg,setShowMsg] = useState(false);
    let[msg,setMsg] = useState("");
    let[showSpinner,setShowSpinner] = useState(false);

    //register form validation
    let formValidation =yup.object({
        first_name:yup.string().required('Required!'),
        last_name:yup.string().required('Required!'),
        email:yup.string().required('Required!'),
        password:yup.string().min(8,'Too Short!').required('Required!')
    })

    let{values,handleSubmit,handleChange,errors,touched} = useFormik({
        initialValues:{first_name:"",last_name:"",email:"",password:""},
        validationSchema:formValidation,
        onSubmit:async (values) =>{
            setShowSpinner(true);
            setShowMsg(false);
            setMsg("");
            
             await fetch(`${API}/registerUser`,{
                method:'POST',
                body:JSON.stringify(values),
                headers:{"content-type":"application/json"},
            })
            .then((res) => res.json())
            .then((obj) => {
                if(obj.hasOwnProperty('error')){
                    setShowSpinner(false);
                    setShowMsg(true);
                    setMsg(obj.error);
                }
                else{
                    setShowSpinner(false);
                    setShowMsg(true);
                    setMsg("Registration successful !!");
                }
            })
        }
    })
    return(
        <div className="register-background">
            <form className="container register-form d-flex flex-column w-100 m-auto p-4 bg-danger" onSubmit={handleSubmit}>
                <div className="text-white register-header">Register</div>

                {showMsg ? <div className="text-white registration-error mt-3 fs-5">{msg}</div> :""}

                <div className="mt-4">
                    <input type="text" id="first_name" name="first_name" placeholder="First Name" className="register-fields w-75" onChange={handleChange} value={values.first_name}></input>
                </div>
                {errors.first_name && touched.first_name ? <div className="text-light">{errors.first_name}</div> : ""}

                <div className="mt-4">
                    <input type="text" id="last_name" name="last_name" placeholder="Last Name" className="register-fields w-75" onChange={handleChange} value={values.last_name}></input>
                </div>
                {errors.last_name && touched.last_name ? <div className="text-light">{errors.last_name}</div> :"" }

                <div className="mt-4">
                    <input type="email" id="email" name="email" placeholder="Email Id" className="register-fields w-75" onChange={handleChange} value={values.email}></input>
                </div>
                {errors.email && touched.email ? <div className="text-light">{errors.email}</div> :"" }

                <div className="mt-4">
                    <input type="password" id="password" name="password" placeholder="Password" className="register-fields w-75" onChange={handleChange} value={values.password}></input>
                </div>
                {errors.password && touched.password ? <div className="text-light">{errors.password}</div> :"" }

                {showSpinner ? <div className="spinner-border text-light mt-4 m-auto" role="status"></div> : ""}

                <div className="d-flex justify-content-center gap-3 mt-4">
                    <button className="btn btn-light" type="submit">Register</button>
                    <button className="btn btn-light" type="button" onClick={() => navigate("/")}>Cancel</button>
                </div>
            </form>
        </div>
    )
}