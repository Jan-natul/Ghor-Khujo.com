import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [error,setError] = useState("")
  const [isLoading,setIsLoading] = useState(false);

   const {updateUser} = useContext(AuthContext);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username")
    
    const password = formData.get("password")
   
    try{
   const res = await apiRequest.post("/auth/login",{
    username,password   
   });

  updateUser(res.data);
   navigate ("/");
  }catch (err) {
  console.error("FULL ERROR:", err);
  console.error("RESPONSE DATA:", err.response?.data);
  setError(err.response?.data?.message || "Something went wrong");
}finally{
  setIsLoading(false);
}
  };
  return (
    <div className="login">
      <div className="imgContainer">
        <img src="/h3.jpg" alt="background" />
        <div className="blurBox">
          <form onSubmit={handleSubmit}>
            <input name="username" type="text" placeholder="Username" />
            <input name="password" type="password" placeholder="Password" />
            <button disabled={isLoading}>Login</button>
            {error && <span>{error}</span>}
            <Link to="/signin">Don't have an account?</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;