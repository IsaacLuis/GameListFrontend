import { useState, useEffect, useContext } from "react";
import { LoadingContext } from "../context/loading.context";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";

const Profile = () => {
    const { user, setUser, editing, setEditing } = useContext(LoadingContext);

    const [profile, setProfile] = useState({
        profile_image: "",
        bio: "",
        age: "",
    });

    useEffect(() => {
        // Fetch the user's profile data
        if (user) {
            axios
                .get(`${baseUrl}/users/profile/${user._id}`)
                .then((res) => {
                    console.log('profile res', res.data.profile)
                    setProfile(res.data.profile);
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
                setUser((prevUser) => ({
                    ...prevUser,
                    profile: res.data.profile,
                }));
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

    return (
        <div>
            <div>
                {editing ? (
                    <form onSubmit={handleSave}>
                        <div>
                            <label >Profile Image</label>
                            <input
                                type="text"
                                name="profile_image"
                                value={profile.profile_image || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label >Bio</label>
                            <textarea
                                name="bio"
                                value={profile.bio}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                        <div>
                            <label >Age</label>
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
                            <img src={profile.profile_image} alt="Profile" />
                        </div>
                        <div>
                            <h2>Bio</h2>
                            <p>{profile.bio}</p>
                        </div>
                        <div>
                            <h2>Age</h2>
                            <p>{profile.age}</p>
                        </div>
                        <button onClick={handleEdit}>Edit Profile</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;