import React , {useState} from "react";
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email : "" , password : ""});
    let navigate = useNavigate();

    const handleSubmit = async(e) =>{
      e.preventDefault();
      let response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({ email : credentials.email, password : credentials.password})
      });
      const jsonData = await response.json();
      // console.log(jsonData.authToken);
      // console.log(jsonData.success);

      // (.success) is a element which is return from the backend request 
      if(!jsonData.success){
        props.showAlert('Invalid Credentials','danger');
      }
      else{
        localStorage.setItem('authToken' , jsonData.authToken);
        props.showAlert('Successfully Login','success');
        navigate('/');
        // Use to naviagte the use into Home page
      }
    }

    const onChangeHandle = (e) =>{
      setCredentials({...credentials, [e.target.name] : e.target.value});
      // console.log(credentials);
    }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
      <h1>LOGIN FORM</h1>
        <label className="my-3" htmlFor="email"><h4>Enter Registred Email For Login..</h4></label>
        <input type="email" className="form-control" required id="email"  aria-describedby="emai" name="email" onChange={onChangeHandle} value={credentials.email} placeholder="Enter Email Here.."/>
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group">
        <label htmlFor="password"><h4>Enter Registred Email-Password For Login..</h4></label>
        <input type="password" required className="form-control" onChange={onChangeHandle} id="password" name="password" value={credentials.password} placeholder="Enter Password Here.."/>
      </div>
      <button type="submit" className="btn btn-primary my-3">Submit</button>
    </form>
  );
};

export default Login;