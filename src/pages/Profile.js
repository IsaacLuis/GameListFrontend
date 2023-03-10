import { useState, useEffect, useContext } from "react";
import { LoadingContext } from "../context/loading.context";

import axios from "axios";
import { baseUrl } from "../services/baseUrl";
import { post } from "../services/authService";

const Profile = () => {
  const { user, setUser, editing, setEditing } = useContext(LoadingContext);

  const [profile, setProfile] = useState({
    profile_image: "",
    bio: "",
    age: "",
  });

  const [imageUrl, setImageUrl] = useState("");


  useEffect(() => {
    // Fetch the user's profile data
    if (user) {
      axios
        .get(`${baseUrl}/users/profile/${user._id}`)
        .then((results) => {
          console.log(results.data, "my profile");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  const handleEdit = (e) => {
    e.preventDefault();
    setEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Save the profile data
    axios
      .post(`${baseUrl}/users/profile-edit/${user._id}`, profile)
      .then((res) => {
        setUser(res.data);
        // setUser((prevUser) => ({
        //   ...prevUser,
        //   profile: res.data.profile,
        // }));
        setEditing(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setEditing(false);
  };

  const handleInputChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileSubmit = (e) => {
    let fileUpload = new FormData()
    fileUpload.append("profile_image", e.target.files[0])
    post('/users/upload', fileUpload)
    .then((result) =>{
        console.log(result)
        setProfile({
            ...profile,
            profile_image: result.data,
            
        });
        console.log(profile)
    })
    .catch((err) => {
     console.log(err)
    })
 }



  return (
    <div className="profile-container">
    <div className="profile-details">
      {editing ? (
        <form className="profile-edit-form" encType="multipart/form-data" onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="profile_image">Image:</label>
            <input
              type="file"
              id="profile_image"
              name="profile_image"
              className="form-control-file"
              onChange={handleFileSubmit}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              className="form-control"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="text"
              id="age"
              name="age"
              value={profile.age}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
          <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
        </form>
      ) : (
        <div>
          <div className="profile-image">
            <img
              src={user ? user.profile_image : <p>no image</p>}
              alt="Profile"
              style={{ width: "150px" }}
            />
          </div>
          <div className="bio">
            <h2>Bio:</h2>
            {user ? user.bio : <p>no bio</p>}
          </div>
          <div className="age">
            <h2>Age:</h2>
            {user ? user.age : <p>no age</p>}
          </div>
          <button onClick={handleEdit} className="btn btn-primary">Edit Profile</button>
        </div>
      )}
    </div>
  </div>
  
  
  
  );
};

export default Profile; 