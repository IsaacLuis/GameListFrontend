import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import { post } from "../services/authService"

import '../pages/details.css'



const Login = () => {

    const { authenticateUser } = useContext(AuthContext)

    const [ thisUser, setthisUser ] = useState(
        {
            email: "",
            password: ""
        }
    )

    const navigate = useNavigate()

    const handleChange = (e) => {
        setthisUser((recent)=>({...recent, [e.target.name]: e.target.value}))
        console.log("Changing user", thisUser)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        post('/auth/login', thisUser)
            .then((results) => {
                console.log("Created User", results.data)
                navigate(`/`)
                localStorage.setItem('authToken', results.data.token )
                
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                authenticateUser()
            })
    } 

    
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={thisUser.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={thisUser.password} onChange={handleChange} />
        </div>
        <button type="submit" className="btn-btn-primary">Login</button>
      </form>
    </div>
  );

}

export default Login