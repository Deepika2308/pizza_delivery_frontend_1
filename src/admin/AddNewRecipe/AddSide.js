import {useFormik} from 'formik';
import * as yup from 'yup';
import {useNavigate} from 'react-router-dom';

export function AddSide(){

    const navigate= useNavigate();

    const formValidation = yup.object({
        name:yup.string().required("Required!"),
        desc:yup.string().required("Required!"),
        price:yup.number().min(1).required("Required!"),
        imgSrc:yup.string().required("Required!").url("Enter a valid url!!"),
    })

    const {values,handleChange,handleSubmit,errors,touched} = useFormik(
        {
            initialValues:{name:"",desc:"",price:"",imgSrc:""},
            validationSchema:formValidation,
            onSubmit: (values) =>{

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
            <input type="text" className="form-control" name="price" id="price" placeholder="Price" value={values.price} onChange={handleChange}></input>
            {errors.price && touched.price ? <div className="text-danger">{errors.price}</div> :""}
            <input type="url" className="form-control" name="imgSrc" id="imgSrc" placeholder="Image link" value={values.imgSrc} onChange={handleChange}></input>
            {errors.imgSrc && touched.imgSrc ? <div className="text-danger">{errors.imgSrc}</div> :""}
            <div className="d-flex gap-2 m-auto">
                <button className="btn btn-danger" type="submit">Submit</button>
                <button className="btn btn-danger" type="button" onClick ={() => navigate("/adminHomePage")}>Cancel</button>
            </div>
        </form>
    )
}