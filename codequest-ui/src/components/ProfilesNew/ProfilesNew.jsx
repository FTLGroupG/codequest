import React from "react";
import "./ProfilesNew.css";
import { useContext, useState, useEffect } from "react";
import ProfileContext from "../../contexts/profile";
import apiClient from "../../services/apiClient";
import { useNavigate, Link } from "react-router-dom";
import boy_icon from "../../assets/boy.png";
import girl_icon from "../../assets/girl.png";
import child_icon from "../../assets/child.png";
import rockinghorse_icon from "../../assets/horseIcon.png";
import aeroplane_icon from "../../assets/planeIcon.png";
import rubberduck_icon from "../../assets/duckIcon.png";
import teddybear_icon from "../../assets/codeyIcon.png";
import ball_icon from "../../assets/baseballIcon.png";
import carIcon from "../../assets/carIcon.svg";

import LottieBackgroundAnimation from "../AnimationBackgroundComponent/AnimationBackgroundComponent";
import animation17 from "/src/assets/skyBackgroundAnimation.json";

const INITIAL_FORM = {
  firstName: "",
  profileImg: child_icon,
};

export default function ProfilesNew(props) {
  const navigate = useNavigate();
  const { profileContext } = useContext(ProfileContext);
  const [profiles, setProfiles] = profileContext;
  const [form, setForm] = useState(INITIAL_FORM);
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
      console.log("data profiles", data.profiles);
      setProfiles(data.profiles);
      console.log("initial form ", INITIAL_FORM);
      setForm(INITIAL_FORM);
      navigate("/account-profiles");
    }
  };

  const icons = [
    { icon_name: "child", icon: child_icon },
    { icon_name: "rockinghorse", icon: rockinghorse_icon },
    { icon_name: "aeroplane", icon: aeroplane_icon },
    { icon_name: "rubberduck", icon: rubberduck_icon },
    { icon_name: "teddybear", icon: teddybear_icon },
    { icon_name: "ball", icon: ball_icon },
    { icon_name: "transport", icon: carIcon },
  ];

  const selectProfileImage = (img) => {
    {
      icons.map(({ icon_name, icon }) => {
        if (icon_name === img) {
          setForm((prevForm) => ({
            ...prevForm,
            profileImg: icon,
          }));
        }
      });
    }
  };

  return (
    <div className="profiles-form">
      
      <div className="profiles-form-content">

        <LottieBackgroundAnimation animationData={animation17} />
 
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
        <h2>Choose Profile Image</h2>
        <div className="select-profile-image">
          <div className="floating">
          <Link onClick={() => selectProfileImage("transport")}>
            <span className="select-avatar">
              <img src={carIcon}></img>
            </span>
          </Link>
          <Link onClick={() => selectProfileImage("ball")}>
            <span className="select-avatar">
              <img src={ball_icon}></img>
            </span>
          </Link>
          <Link onClick={() => selectProfileImage("rockinghorse")}>
            <span className="select-avatar">
              <img src={rockinghorse_icon}></img>
            </span>
          </Link>
          <Link onClick={() => selectProfileImage("aeroplane")}>
            <span className="select-avatar">
              <img src={aeroplane_icon}></img>
            </span>
          </Link>
          <Link onClick={() => selectProfileImage("rubberduck")}>
            <span className="select-avatar">
              <img src={rubberduck_icon}></img>
            </span>
          </Link>
          <Link onClick={() => selectProfileImage("teddybear")}>
            <span className="select-avatar">
              <img src={teddybear_icon}></img>
            </span>
          </Link>
          </div>
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
