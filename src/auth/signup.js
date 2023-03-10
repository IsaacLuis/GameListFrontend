import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { post } from "../services/authService"
import '../pages/details.css'

import { AuthContext } from "../context/auth.context"
//import { LoadingContext } from "../context/loading.context"

const Signup = () => {

    const { authenticateUser } = useContext(AuthContext)

    const [ newUser, setNewUser ] = useState(
        {
            name: "",
            email: "",
            password: ""
        }
    )

    const navigate = useNavigate()

    const handleChange = (e) => {
        setNewUser((recent)=>({...recent, [e.target.name]: e.target.value}))
        console.log("Changin user", newUser)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        post('/auth/signup', newUser)
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
        <div className="signup-form">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type='text' id="name" name="name" value={newUser.name} onChange={handleChange}></input>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type='email' id="email" name="email" value={newUser.email} onChange={handleChange}></input>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type='password' id="password" name="password" value={newUser.password} onChange={handleChange}></input>
          </div>
          <button type="submit" className="Signupbtn" >Sign Up</button>
        </form>
      </div>
    )
}

export default Signup