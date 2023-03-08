import { LoadingContext } from "../context/loading.context"
import { useContext } from "react"
const Profile = () => {
    const { user} = useContext(LoadingContext)
    return (
        <div>
           {user && <h1>Welcome {user.name}</h1>}

        </div>
    )
}

export default Profile