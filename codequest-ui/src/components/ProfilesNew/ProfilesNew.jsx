import React from "react";
import "./ProfilesNew.css";
import { useContext, useState } from "react";
import ProfileContext from "../../contexts/profile";
import apiClient from "../../services/apiClient";
import { useNavigate } from "react-router-dom";

export default function ProfilesNew(props) {
  const navigate = useNavigate();
  const { profileContext } = useContext(ProfileContext);
  const [profiles, setProfiles] = profileContext;
  const formInit = {
    firstName: "",
  };

  const [form, setForm] = useState(formInit);
  const [error, setError] = useState();

  const onFormChange = (event) => {
    setForm((prevForm) => ({
      ...prevForm,
      [event.target.name]: event.target.value,
    }));
    setError();
  };

  const handleOnSubmit = async () => {
    const { data, error } = await apiClient.createProfile(form);
    if (error) {
      setError(error);
    } else {
      setProfiles(data.profiles);
      setForm(formInit);
      navigate("/account-profiles");
    }
  };
  return (
    <div className="profiles-form">
      <div className="profiles-form-content">
        <h2>Add your name</h2>
        <p style={{ color: "red" }}>{error}</p>
        <div className="profiles-form-section">
          <label htmlFor="name"></label>
          <input
            name="firstName"
            type={"text"}
            value={form.firstName}
            placeholder={"Name"}
            onChange={(e) => onFormChange(e)}
          />
        </div>
        <button
          onClick={() => handleOnSubmit()}
          className="profile-submit-registration-form-button"
        >
          Save
        </button>
      </div>
    </div>
  );
}
