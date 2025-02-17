import React, { useContext, useState, useEffect } from "react";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../Storecontext/StoreContext";
import { toast } from "react-toastify";
import { states, nationalities } from "../../assets/front/assets";
import axiosInstance from "../axiosIntance/axiosInstance";

const Profile = () => {

    const { token } = useContext(StoreContext);
    const [profile, setprofile] = useState({})
    const [isEdit, setIsEdit] = useState(true);
    const { setToken } = useContext(StoreContext)

    console.log("profile data", profile)
    const [formData, setFormData] = useState({
        name: "",
        birthday: "",
        gender: "",
        maritalStatus: "",
        address: "",
        pincode: "",
        state: "",
        nationality: "",
        phone: "",
    });
    const nav = useNavigate()
    const logout = () => {
        localStorage.removeItem('token')
        setToken("")
        nav('/')
    }
    const [errors, setErrors] = useState({});


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.birthday) newErrors.birthday = "Birthday is required";
        if (!formData.gender) newErrors.gender = "Gender is required";
        if (!formData.maritalStatus) newErrors.maritalStatus = "Marital status is required";
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.pincode || !/^\d{6}$/.test(formData.pincode)) {
            newErrors.pincode = "Pincode must be a 6-digit number";
        }
        if (!formData.state) newErrors.state = "State is required";
        if (!formData.nationality) newErrors.nationality = "Nationality is required";
        if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone number must be a 10-digit number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                // Format the date to DD-MM-YYYY before sending to the backend
                const formattedBirthday = new Date(formData.birthday).toLocaleDateString("en-GB").split('/').reverse().join('-'); // converts to DD-MM-YYYY

                const updatedFormData = { ...formData, birthday: formattedBirthday };

                if (profile && profile._id) {
                    const response = await axiosInstance.put("/edit", updatedFormData);
                    setprofile(response.data.data);
                    toast.success("Profile updated successfully!", { position: "bottom-right" });
                } else {
                    const response = await axiosInstance.post("/profile", updatedFormData, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setprofile(response.data.data);
                    toast.success("Profile created successfully!", { position: "bottom-right" });
                }
                setIsEdit(false);
            } catch (error) {
                toast.error("Failed to save profile. Please try again.", { position: "bottom-right" });
                console.error("Error saving profile:", error);
            }
        }
    };


    const get = async () => {
        const res = await axiosInstance
            .get("/getProfile")
            .then((response) => {
                console.log("%%%%%", response.data.data);
                setprofile(response.data.data)
                setFormData(response.data.data || {});
                setIsEdit(false);
            })
            .catch((error) => {
                console.error("Error getting profile:", error);
            });
    };

    useEffect(() => {
        if (token) {
            get();
        }
    }, [token])

    return (
        <div className="profile">
            <div className="P-sidebar">
                <h3>User Profile</h3>
                <div className="Home-b">
                    <Link to="/">
                        <p>Home </p>
                    </Link>
                </div>
                <div className="profile-b">
                    <p>Profile    [<span> {" "}  {" "}{profile.name}</span>]</p>
                </div>
                <div className="p-logout">
                    <p onClick={logout} >Logout</p>
                </div>
            </div>
            <div className="P-mainbar">
                <div className="title-p">
                    <h1>Profile</h1>
                    <p>Basic Info, for a faster booking experience</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <p>
                        NAME:{" "}
                        {isEdit ? (
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{profile.name}</span>
                        )}
                    </p>
                    <p>
                        BIRTHDAY:{" "}
                        {isEdit ? (
                            <input
                                type="date"
                                name="birthday"
                                value={formData.birthday}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{profile.birthday}</span>
                        )}
                    </p>
                    <p>
                        GENDER:{" "}
                        {isEdit ? (
                            <>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={formData.gender === "Male"}
                                        onChange={handleChange}
                                    />
                                    Male
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={formData.gender === "Female"}
                                        onChange={handleChange}
                                    />
                                    Female
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Other"
                                        checked={formData.gender === "Other"}
                                        onChange={handleChange}
                                    />
                                    Other
                                </label>
                            </>
                        ) : (
                            <span>{profile.gender}</span>
                        )}
                    </p>
                    <p>
                        MARITAL STATUS:{" "}
                        {isEdit ? (
                            <>
                                <label>
                                    <input
                                        type="radio"
                                        name="maritalStatus"
                                        value="Single"
                                        checked={formData.maritalStatus === "Single"}
                                        onChange={handleChange}
                                    />
                                    Single
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="maritalStatus"
                                        value="Married"
                                        checked={formData.maritalStatus === "Married"}
                                        onChange={handleChange}
                                    />
                                    Married
                                </label>
                            </>
                        ) : (
                            <span>{profile.maritalStatus}</span>
                        )}
                    </p>
                    <p>
                        PHONE:{" "}
                        {isEdit ? (
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{profile.phone}</span>
                        )}
                    </p>
                    <p>
                        ADDRESS:{" "}
                        {isEdit ? (
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{profile.address}</span>
                        )}
                    </p>
                    <p>
                        PINCODE:{" "}
                        {isEdit ? (
                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{profile.pincode}</span>
                        )}
                    </p>
                    <p>
                        STATE:{" "}
                        {isEdit ? (
                            <select
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                            >
                                <option value="">Select a state</option>
                                {states.map((state) => (
                                    <option key={state} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <span>{profile.state}</span>
                        )}
                    </p>
                    <p>
                        NATIONALITY:{" "}
                        {isEdit ? (
                            <select
                                name="nationality"
                                value={formData.nationality}
                                onChange={handleChange}
                            >
                                <option value="">Select a nationality</option>
                                {nationalities.map((nationality) => (
                                    <option key={nationality} value={nationality}>
                                        {nationality}
                                    </option>
                                ))}
                            </select>

                        ) : (
                            <span>{profile.nationality}</span>
                        )}
                    </p>
                    <button type="button" onClick={() => setIsEdit(!isEdit)}>
                        {isEdit ? "Cancel" : "Edit"}
                    </button>
                    {isEdit && <button type="submit">{profile && profile._id ? "Save" : "Create"}</button>}
                </form>
            </div>
        </div>
    );
};

export default Profile;

