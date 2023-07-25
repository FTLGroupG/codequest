import React from "react";
import "./ProfilesSelection.css";
import { useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import ProfileContext from "../../contexts/profile";
import profileNew from "../../assets/profileNew.svg";
import ProfileCard from "../ProfileCard/ProfileCard";
import apiClient from "../../services/apiClient";
import AuthContext from "../../contexts/auth";

export default function ProfilesSelection(props) {
  const { userContext } = useContext(AuthContext);
  const [user, setUser] = userContext;
  // Use the context to access profiles state and removeProfile function
  const {
    profileContext,
    removeProfile,
    selectedProfile,
    setSelectedProfile,
    userProgress,
    setUserProgress,
  } = useContext(ProfileContext);
  const [profiles, setProfiles] = profileContext;

  // Load the selected item ID from localStorage on initial load
  useEffect(() => {
    const storedProfileId = localStorage.getItem("selectedProfile");
    if (storedProfileId) {
      setSelectedProfile(parseInt(storedProfileId, 10));
    }
  }, []);

  // Save the selected item ID to localStorage whenever it changes
  useEffect(() => {
    if (selectedProfile) {
      localStorage.setItem("selectedProfile", selectedProfile);
    }
  }, [selectedProfile]);

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

  const handleProfileSelection = async (profileId) => {
    try {
      // Perform the API call here (replace fetchData with the appropriate function in apiClient)
      const response = await apiClient.fetchData(profileId);

      // You can use the response if needed, but in this example, we are just logging it
      console.log("Data fetched successfully:", response);

      setSelectedProfile(profileId);
      setUserProgress(response.userprogress);
      console.log(userProgress);

      console.log(profileId);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    // Now navigate to the new route with the selected profile ID as a URL parameter
    return <Navigate to={`/modules?selectedProfile=${profileId}`} />;
  };

  return (
    <div className="profile-overview">
      <div className="overview-container">
        <div className="overview-content">
          <div className="profile-container">
            {!user.email && <Navigate to="/forbidden" replace={true} />}
            {profiles?.length > 0 ? (
              profiles.map((profile) => (
                <Link
                  to={`/modules?selectedProfile=${profile.id}`}
                  key={profile.id}
                  onClick={() => handleProfileSelection(profile.id)}
                >
                  <ProfileCard id={profile.id} firstName={profile.first_name} />
                </Link>
              ))
            ) : (
              <></>
            )}

            {profiles?.length === 0 && (
              <img id="profile-icon" src={profileNew} alt="avatar icon" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}