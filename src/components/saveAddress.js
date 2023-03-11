import {Modal} from 'react-bootstrap';
import {useFormik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {useState} from 'react';
import "../navBar/cart.css";
import {API} from "../global.js";

export function SaveAddress({show,setShow,user}){

    let [message,showMessage] = useState(undefined);

    const formValidation = yup.object({
        buildingNumber:yup.string().required("Required!"),
        streetArea:yup.string().required("Required!"),
        townCity:yup.string().required("Required!"),
        district:yup.string().required("Required!"),
        state:yup.string().required("Required!"),
        pincode:yup.string().required("Required!"),
        mobile:yup.string().required("Required!")
    })

    let {values,handleChange,handleSubmit,errors,touched} = useFormik(
        {
            initialValues:{buildingNumber:"",streetArea:"",townCity:"",district:"",state:"",pincode:""},
            validationSchema:formValidation,
            onSubmit: async (values) => {
                const obj={
                    address:`${values.buildingNumber},${values.streetArea},${values.townCity},${values.district},${values.state},${values.pincode}`,
                    mobile:values.mobile,
                    email:user,
                }

                const saveAddress = await axios.post(`${API}/save/saveAddress`,obj);
                if(saveAddress.data.message === "Address saved successfully"){
                    showMessage("Address saved successfully");
                    // setShow(false);
                }
                else if(saveAddress.data.message === "Error in saving order"){
                    showMessage("Error in saving order");
                    // setShow(true);
                }
            }
        }
    )

    return(
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>Enter Delivery Address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="delivery-address" onSubmit={handleSubmit}>

                    {message ? <div className="text-danger">{message}</div> :""}

                    <label htmlFor="Building-no">Building Number</label>
                    <input type="text" className="form-control" id="buildingNumber" name="buildingNumber" value={values.buildingNumber} onChange={handleChange}></input>
                    {errors.buildingNumber && touched.buildingNumber ? <div className="text-danger">{errors.buildingNumber}</div> : ""}

                    <label htmlFor="street-area">Street/area</label>
                    <input type="text" className="form-control" id="streetArea" name="streetArea" value={values.streetArea} onChange={handleChange}></input>
                    {errors.streetArea && touched.streetArea ? <div className="text-danger">{errors.streetArea}</div> : ""}

                    <label htmlFor="Town-city">Town/city</label>
                    <input type="text" className="form-control" id="townCity" name="townCity" value={values.townCity} onChange={handleChange}></input>
                    {errors.townCity && touched.townCity ? <div className="text-danger">{errors.townCity}</div> : ""}

                    <label htmlFor="district">District</label>
                    <input type="text" className="form-control" id="district" name="district" value={values.district} onChange={handleChange}></input>
                    {errors.district && touched.district ? <div className="text-danger">{errors.district}</div> : ""}

                    <label htmlFor="state">State</label>
                    <input type="text" className="form-control" id="state" name="state" value={values.state} onChange={handleChange}></input>
                    {errors.state && touched.state ? <div className="text-danger">{errors.state}</div> : ""}

                    <label htmlFor="pincode">Pincode</label>
                    <input type="text" className="form-control" id="pincode" name="pincode" value={values.pincode} onChange={handleChange}></input> 
                    {errors.pincode && touched.pincode ? <div className="text-danger">{errors.pincode}</div> : ""}

                    <label htmlFor="mobile">Mobile Number</label>
                    <input type="text" className="form-control" id="mobile" name="mobile" value={values.mobile} onChange={handleChange}></input>
                    {errors.mobile && touched.mobile ? <div className="text-danger">{errors.mobile}</div> : ""}

                    <div className="mt-4 d-flex gap-2">
                    <button className="btn btn-danger" type="submit">Save</button>
                    <button className="btn btn-secondary" type="button" onClick={() => setShow(!show)}>Close</button>
                    </div>
                    
                </form>
            </Modal.Body>
        </Modal>
    )
}