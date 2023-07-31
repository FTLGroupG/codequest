import React from "react";
import "./ProfilesSelection.css";
import { useContext, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ProfileContext from "../../contexts/profile";
// import profileNew from "../../assets/profileNew.svg";
import robotProfile from "../../assets/robotProfile.png";
import ProfileCard from "../ProfileCard/ProfileCard";
import apiClient from "../../services/apiClient";
import AuthContext from "../../contexts/auth";

/**
 * ProfilesSelection component displays the list of user profiles and allows selecting a profile.
 * It fetches the user profiles from the backend API and displays them using ProfileCard component.
 * It saves and loads the selected profile ID in localStorage to persist the user's last selected profile.
 * The user can create a new profile using the "Add New CodeQuest Profile" button.
 * Clicking on a profile card sets the selected profile and navigates to the "Modules" page.
 */
export default function ProfilesSelection(props) {
  const navigate = useNavigate();
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
    leftOff,
    setLeftOff,
  } = useContext(ProfileContext);
  const [profiles, setProfiles] = profileContext;

  /**
   * Load the selected item ID from localStorage on initial load.
   * This effect runs only once during the component's initial render.
   */
  useEffect(() => {
    const storedProfileId = localStorage.getItem("selectedProfile");
    if (storedProfileId) {
      setSelectedProfile(parseInt(storedProfileId, 10));
    }
  }, []);

  /**
   * Save the selected item ID to localStorage whenever it changes.
   * This effect runs whenever the `selectedProfile` changes.
   */
  useEffect(() => {
    if (selectedProfile) {
      localStorage.setItem("selectedProfile", selectedProfile);
    }
  }, [selectedProfile]);

  /**
   * Fetch user profiles from the backend API when the component mounts.
   * This effect runs only once during the component's initial render.
   */
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

  /**
   * Handle profile selection when a profile card is clicked.
   * This function is triggered when a user clicks on a profile card.
   * It fetches user progress data for the selected profile from the backend API.
   * It sets the selected profile, user progress, and the leftOff value.
   * It navigates to the "Modules" page with the selected profile ID as a URL parameter.
   * @param {number} profileId - The ID of the selected profile.
   */
  const handleProfileSelection = async (profileId) => {
    try {
      // Perform the API call here (replace fetchData with the appropriate function in apiClient)
      const response = await apiClient.fetchData(profileId);

      // You can use the response if needed, but in this example, we are just logging it
      console.log("Data fetched successfully:", response);

      setSelectedProfile(profileId);
      setUserProgress(response.userprogress);
      localStorage.setItem("leftOff", 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    // Now navigate to the new route with the selected profile ID as a URL parameter
    navigate(`/modules?selectedProfile=${profileId}`);
  };

  return (
    <div className="profile-overview">
      <div className="overview-container">
        <div className="overview-content">
          <div className="profile-container">
            <div className="createdProfiles">
              {profiles?.length > 0 ? (
                profiles.map((profile) => (
                  <Link
                    to={`/modules?selectedProfile=${profile.id}`}
                    key={profile.id}
                    onClick={() => handleProfileSelection(profile.id)}
                  >
                    <ProfileCard
                      id={profile.id}
                      firstName={profile.first_name}
                    />
                  </Link>
                ))
              ) : (
                <></>
              )}
              {profiles?.length === 0 && (
                <img id="profile-icon" src={robotProfile} alt="avatar icon" />
              )}
            </div>
            {!user.email && <Navigate to="/forbidden" replace={true} />}
            <Link to="/profiles/create">
              <button className="profile-create-btn">+</button>
            </Link>
            <h4>Add Profile</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
