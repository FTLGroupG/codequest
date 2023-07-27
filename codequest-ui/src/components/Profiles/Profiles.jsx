import React from "react";
import "./Profiles.css";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileContext from "../../contexts/profile";
// import profileNew from "../../assets/profileNew.svg"
import robotProfile from "../../assets/robotProfile.png";
import ProfileCard from "../ProfileCard/ProfileCard";
import apiClient from "../../services/apiClient";

export default function Profiles(props) {
  const { profileContext, removeProfile } = useContext(ProfileContext);
  const [profiles, setProfiles] = profileContext;
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch profiles when the component mounts
    const fetchProfiles = async () => {
      try {
        const { data, error } = await apiClient.fetchProfiles();
        if (data?.profiles) {
          setProfiles(data.profiles);
        } else {
          setProfiles([]);
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };
    fetchProfiles();
  }, [setProfiles]);

  return (
    <div className="profile-overview">
      <div className="overview-container">
        <div className="overview-content">
          <div className="profile-container">
            <Link to="/profiles/create">
              <button className="profile-create-btn">Create Profile</button>
            </Link>
            {profiles?.length > 0 ? (
              profiles.map((profile) => (
                <Link to={`/profiles/id/${profile.id}`} key={profile.id}>
                  <ProfileCard id={profile.id} firstName={profile.first_name} />
                </Link>
              ))
            ) : (
              <></>
            )}

            {profiles?.length === 0 && (
              <img id="profile-icon" src={robotProfile} alt="avatar icon" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
