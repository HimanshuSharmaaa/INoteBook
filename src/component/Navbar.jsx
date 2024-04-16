import React, { useEffect } from 'react'
import { Link , useLocation , useNavigate } from "react-router-dom";

const Navbar = () => {

  let navigtor = useNavigate();

  const handleLogOut = () =>{
    localStorage.removeItem('authToken');
    navigtor('/login');
  }

  let location = useLocation();
  useEffect(() => {
  }, [location])
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link className="navbar-brand" to="/" style={{color:'white'}}>Navbar</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className={`nav-item ${location.pathname === '/' ? "active" : ""}`}>
        <Link className="nav-link" to="/">Home<span className="sr-only">(current)</span></Link>
      </li>
      <li className={`nav-item ${location.pathname === '/about' ? "active" : ""}`}>
        <Link className="nav-link" to="/about">About</Link>
      </li>
    </ul>
    { !localStorage.getItem('authToken') ? <form className="d-flex">
      <Link to="/login" className="btn btn-primary mx-2" role="button" aria-pressed="true">Login</Link>
      <Link to="/signup" className="btn btn-secondary mx-2" role="button" aria-pressed="true">Sign up</Link>
    </form> : <button onClick={handleLogOut} className='btn btn-primary ml-2'>Log-Out</button>}
  </div>
</nav>
  )
}

export default Navbar;