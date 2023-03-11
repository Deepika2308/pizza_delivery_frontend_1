import './Login.css';
import {Link,useNavigate} from "react-router-dom";
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {fetchUsers,changeUser,saveJWTToken}  from '../features/user/userSlice';

export function LoginForm(){

    const dispatch = useDispatch(); 
    const navigate=useNavigate();

    let[showError,setShowError] = useState(false);
    let[msg,setMsg] = useState("");
    let[showSpinner,setShowSpinner] = useState(false);

    let formValidation =yup.object({
        email:yup.string().required('Required!'),
        password:yup.string().required('Required!')
    })

    //formik validation
    let{values,handleChange,handleSubmit,errors,touched} = useFormik({
        initialValues:{email:"",password:""},
        validationSchema:formValidation,
        onSubmit: (values) =>{
            setShowSpinner(true);
            const login = dispatch(fetchUsers(values));

            login.then(res => {
                const payload = res.payload;
                if(payload.hasOwnProperty("error")){
                    setShowError(true);
                    setShowSpinner(false);
                    setMsg(payload.error);
                }
                else{
                    if(payload.token){
                        dispatch(saveJWTToken(payload.token));
                        if(payload.result.isAdmin){
                            setShowSpinner(false);
                            dispatch(changeUser(true));
                            navigate(`/adminHomePage`);
                        }
                        else{
                            setShowSpinner(false);
                            dispatch(changeUser(false));
                            navigate(`/userHomePage`); 
                        }
                    }
                }
            } );
            
        }
    })

    return(
        <div className="login-background">
            <form className="login-form d-flex flex-column w-100 m-auto p-4 bg-danger" onSubmit={handleSubmit}>
                <div className="text-white login-header">Login</div>

                {showError ? <div className="text-light mt-2">{msg}</div> : ""}

                <label htmlFor="email" className="email text-start text-white mt-2">Email</label>
                <input type="email" className="login-email" id="email" name="email" value={values.email} onChange={handleChange}></input>
                {errors.email && touched.email ? <div className="text-light">{errors.email}</div> :""}

                <label htmlFor="password" className="password text-start text-white mt-4">Password</label>
                <input type="password" className="login-password" id="password" name="password" value={values.password} onChange={handleChange}></input>
                {errors.password && touched.password ? <div className="text-light">{errors.password}</div> :""}

                <div className="d-flex gap-4">
                <button className="btn bg-white mt-4 w-25" type="submit">Login</button>
                {showSpinner ? <div className="spinner-border text-light mt-4" role="status"></div> : ""}
                </div>

                <div className="d-flex justify-content-between mt-4">
                    <Link to="/forgotPassword" className="text-decoration-none text-light">Forgot Password?</Link>
                    <Link to="/register" className="text-decoration-none text-light">Register</Link>
                </div>
            </form>
        </div>
    )
}