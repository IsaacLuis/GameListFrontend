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
    <div>
      <div>
        {editing ? (
          <form encType="multipart/form-data" onSubmit={handleSave}>
            <div>
            <label htmlFor="profile_image">Image:</label>
            <input
              type="file"
              id="profile_image"
              name="profile_image"
              className="form-control-file"
              onChange={handleFileSubmit}
             
            />
            </div>
            <div>
              <label>Bio</label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div>
              <label>Age</label>
              <input
                type="text"
                name="age"
                value={profile.age}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </form>
        ) : (
          <div>
            <div>
              <img
                src={user ? user.profile_image : <p>no image</p>}
                alt="Profile"
                style={{ width: "150px" }}
              />
            </div>
            <div>
              <h2>Bio</h2>
              {user ? user.bio : <p>no bio</p>}
            </div>
            <div>
              <h2>Age</h2>
              {user ? user.age : <p>no age</p>}
            </div>
            <button onClick={handleEdit}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 