import React , {useState} from "react";
import {useNavigate} from 'react-router-dom';

const Signup = (props) => {

  const [credentials, setCredentials] = useState({ name : "", email : "" , password : "" , cpassword  : ""});
    let navigate = useNavigate();

    const handleSubmit = async(e) =>{
      e.preventDefault();
      let response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({ name : credentials.name , email : credentials.email, password : credentials.password})
      });
      const jsonData = await response.json();
      console.log(jsonData);
      if(!jsonData.success){
        props.showAlert(jsonData.error ,'danger');
      }
      else{
        localStorage.setItem('authToken' , jsonData.authToken);
        props.showAlert('SignUp , You Successfully Created a Account','success');
        // Use to naviagte the use into Home page
        navigate('/');
      }
    }

    const onChangeHandle = (e) =>{
      setCredentials({...credentials, [e.target.name] : e.target.value});
      console.log(credentials);
    }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <h1>SIGN-UP FORM</h1>
        <label className="my-3" htmlFor="exampleInputEmail1"><h4>Enter UserName Here..</h4></label>
        <input type="text" className="form-control" id="name" aria-describedby="name" required minLength={3} name="name" onChange={onChangeHandle} placeholder="Enter Name Here.."/>
        <label htmlFor="exampleInputEmail1"><h4>Enter Email Address</h4></label>
        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" required name="email" onChange={onChangeHandle} placeholder="Enter Email Here.."/>
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1"><h4>Enter Password Here..</h4></label>
        <input type="password" className="form-control" id="password" name="password" required minLength={5} onChange={onChangeHandle} placeholder="Enter Password Here.."/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1"><h4>Enter Confirm Password Here..</h4></label>
        <input type="password" className="form-control" id="cpassword" name="cpassword" required minLength={5} onChange={onChangeHandle} placeholder="Enter Password Here.."/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default Signup;