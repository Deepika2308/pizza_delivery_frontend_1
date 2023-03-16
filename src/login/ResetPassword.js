import {useParams,Link} from 'react-router-dom';
import {useState} from 'react';
import {API} from "../global.js";

export function ResetPassword()

{
    const {token,loginUser} = useParams();
    let[password,setPassword] = useState("");
    let[msg,setMsg] = useState("");
    let[submitbtn,setSubmitbtn] = useState(false);
    let[showSpinner,setShowSpinner] = useState(false);

    function onSubmit(e) {
        setShowSpinner(true);
        let obj={token:token,password:password,loginUser:loginUser};
        e.preventDefault();
        fetch(`${API}/save/saveNewPassword`,{
            method:"PUT",
            body:JSON.stringify(obj),
            headers:{"content-type":"application/json"},
        })
        .then((response) => {
            if(response.status === 200){
                setShowSpinner(false);
                setMsg("Password changed successfully");
                setSubmitbtn(true);
            }
            else{
                setShowSpinner(false);
                setMsg("Error in changing password");
            }
        })
        .catch((err) => setMsg(err.msg))
    }
    return(
        <form className="container d-flex flex-column gap-3 w-50 m-auto mt-5" onSubmit={onSubmit}>
            <h4>Reset Password</h4>
            <div className="d-flex gap-3">
            <input className="form-control" id="password" name="password" type="password" placeholder="New Password" onChange={(event) => setPassword(event.target.value)} required></input>
            <button className="btn btn-primary" type="submit" disabled={submitbtn}>Submit</button>
            </div>
            {showSpinner ? <div className="spinner-border text-primary mt-4 m-auto" role="status"></div> : ""}
            {msg ? <div className="d-flex flex-column gap-3"><div className="text-danger">{msg}</div>{!submitbtn ? <Link to="/forgotPassword">Forgot Password</Link> : <Link to="/login">Login</Link>}</div> :""}
        </form>
    )
}