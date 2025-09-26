import "./signup.scss";
import { Link } from "react-router-dom";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

function Signup() {
  const [error,setError] = useState("")
  const [isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("")
    const formData = new FormData(e.target);

    const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")
   
    try{
   const res = await apiRequest.post("/auth/register",{
    username,email,password   
   })
   navigate ("/login")
  }catch (err) {
  console.error("FULL ERROR:", err);
  console.error("RESPONSE DATA:", err.response?.data);
  setError(err.response?.data?.message || "Something went wrong");
}
/*catch(err){
  console.error(err);
  setError(err.response?.data?.message || "Something went wrong");
}*/
  };
  return (
    <div className="signup">
      <div className="imgContainer">
        <img src="/h3.jpg" alt="background" />
        <div className="blurBox">
          <form onSubmit={handleSubmit}> 
            <h1>Create an Account</h1>
            <input name="username" type="text" placeholder="Username" />
            <input name="email" type="email" placeholder="Email" />
            <input name="password" type="password" placeholder="Password" />
            <button disabled={isLoading}>Sign in</button>
            {error && <span>{error}</span>}
            <Link to="/login">Already have an account?</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
