import { useState } from "react";
import {GoVerified} from 'react-icons/go';
import {API} from "../global.js";

function ForgotPassword() {
  let [email, setEmail] = useState("");
  let [enablebtn, setEnablebtn] = useState(true);
  let [error, setError] = useState(false);
  let [resetMsg, setResetMsg] = useState("");
  let [msg, setMsg] = useState(false);
  let [tick,setTick] = useState(false);
  let [isAdmin,setIsAdmin] = useState(false);

  const styles= {display : tick ? "block" :"none"};

  function onSubmit(e) {
    e.preventDefault();
    let obj = { 
        email: email,
        isAdmin:isAdmin,
     };
    fetch(`${API}/forgotPassword/sendResetLink`, {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: { "content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg === "updateerror") {
          setMsg(true);
          setResetMsg(
            "Error in creating reset link. Please try again with valid mail id"
          );
        } else if (data.msg === "mailnotsent") {
          setMsg(true);
          setResetMsg(
            "Email with reset link not sent. Please try again with valid mail id"
          );
        } else if (data.msg === "mailsent") {
          setMsg(true);
          setResetMsg("Link to reset password has been sent to the mail");
        }
      });
  }

  
  return (
    <form className="container mt-5 w-50 m-auto" onSubmit={onSubmit}>
      <div className="d-flex flex-column gap-4">
        <h4>Reset Password</h4>
        <div className="d-flex gap-3">
          <div>Verify Email address</div>
          <input
            className="form-control"
            id="email"
            name="email"
            type="email"
            placeholder="Email Id"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></input>

          <button
            className="btn btn-success"
            type="button"
            onClick={() => {
              let obj = { email: email };
              fetch(`${API}/forgotPassword/verifyEmail`, {
                method: "POST",
                body: JSON.stringify(obj),
                headers: { "content-type": "application/json" },
              })
                .then((response) => response.json())
                .then((data) => {
                  if (data.msg) {
                    setEnablebtn(false);
                    setTick(true);
                    if(data.isAdmin){
                        setIsAdmin(true);
                    }
                    if (error) {
                      setError(false);
                      setTick(false);
                    }
                  } else {
                    setError(!error);
                    setTick(false);
                  }
                });
            }}
          >
            Verify
          </button>
          <div><i className="verify-icon" style={styles}><GoVerified size={21} /></i></div>
        </div>

        {error ? (
          <div className="text-danger">Email is is not registered with us</div>
        ) : (
          ""
        )}
        {msg ? <div className="text-danger">{resetMsg}</div> : ""}

        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary col-3"
            disabled={enablebtn}
            type="submit"
          >
            Forgot Password
          </button>
        </div>
      </div>
    </form>
  );
}

export { ForgotPassword };
