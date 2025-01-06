import React, { useState } from "react";
import { useLoggedInUser } from "../../contexts/LoggedInUserProvider";
import "./Bookmark.css";
import { Post } from "../../components/Post/Post";
import { usePosts } from "../../contexts/PostsProvider";
import { Header } from "../../components/Header/Header";
import { Discover } from "../../components/Discover/Discover";
import { Navbar } from "../../components/Navbar/Navbar";
import { useAuth } from "../../contexts/AuthProvider";

export const Bookmark = () => {
  const { allPosts, postLoading } = usePosts();
  const { auth } = useAuth();
  const { loggedInUserState } = useLoggedInUser();

  const allBookmarkedPosts = allPosts?.filter((post) =>
    loggedInUserState?.bookmarks?.find((postId) => postId === post?._id)
  );

  const generateRandomUsers = () => {
    const users = [
      { name: "Arjun", points: 100, profilePic: "https://plus.unsplash.com/premium_photo-1682089892133-556bde898f2c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwYm95fGVufDB8fDB8fHww", area: "Ambattur" },
      { name: "Sathish", points: 200, profilePic: "https://plus.unsplash.com/premium_photo-1682089869602-2ec199cc501a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aW5kaWFuJTIwYm95fGVufDB8fDB8fHww", area: "Redhills" },
      { name: "Arun", points: 300, profilePic: "https://cdn.pixabay.com/photo/2024/03/31/05/00/ai-generated-8665996_640.jpg", area: "Thirumangalam" },
      { name: "Samyuktha", points: 400, profilePic: "https://cdn.pixabay.com/photo/2024/02/08/12/54/ai-generated-8561072_960_720.png", area: "Ashok Nagar" },
      { name: "Prat", points: 250, profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr5PSBZdUIKFDcOjok2wBq3RZUARqdjJLuFg&s", area: "Ambattur" },
      { name: "Anitha", points: 150, profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaf_Zj3QPOB9mlsWk35JRi1Zu_PwQexlE6ag&s", area: "Ashok Nagar" },
      { name: "Raju", points: 120, profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSexuQndiJZju5BI-aaCYuxL3rNyioTs-rJ7Q&s", area: "Redhills" },
      { name: "Bala", points: 270, profilePic: "https://static.vecteezy.com/system/resources/thumbnails/006/859/348/small_2x/young-boy-indian-student-portrait-photo.jpg", area: "Thirumangalam" },
    ];

    return users;
  };

  const [selectedArea, setSelectedArea] = useState("");
  const [topUsers, setTopUsers] = useState([]);
  const [showAreaDropdown, setShowAreaDropdown] = useState(false); 

  const handleAreaChange = (e) => {
    const selected = e.target.value;
    setSelectedArea(selected);

    // Filter users by selected area
    const filteredUsers = generateRandomUsers().filter(user => user.area === selected);

    // Sort by points and get the top 3
    const top3Users = filteredUsers.sort((a, b) => b.points - a.points).slice(0, 3);

    // Set the top 3 users
    setTopUsers(top3Users);
  };

  const handleTopRankClick = () => {
    setShowAreaDropdown(true); // Show the dropdown when the "Top Rank" button is clicked
    setTopUsers([]); // Reset top users until area is selected
  };

  // Function to determine the level based on points
  const getUserLevel = (points) => {
    if (points >= 351) return "NeighborhoodNavigators";
    if (points >= 251) return "CommunityShapers";
    if (points >= 151) return "BlockBuilder";
    return "StreetStars";
  };

  return (
    <>
      {auth.isAuth && <Header />}
      <div className="app-container">
        {auth.isAuth && <Navbar />}

        <main className="feed bookmark-container">
          {!postLoading &&
            (allBookmarkedPosts.length ? (
              allBookmarkedPosts?.map((post) => (
                <Post post={post} key={post?._id} />
              ))
            ) : (
              <p className="no-bookmarks">Please choose your preferred action to continue:</p>
            ))}
          <div className="buttons-container">
            <button 
              className="button" 
              onClick={() => window.location.href = "https://kynalitics.netlify.app/"}
            >
              View Analysis
            </button>
            <button 
              className="button" 
              onClick={handleTopRankClick} // When clicked, show area dropdown
            >
              Top Rank
            </button>
            {/* New Button for Youth Tech Quiz */}
            <button
              className="button"
              onClick={() => window.location.href = "https://donatepoints.netlify.app/"}
            >
              Donate Points
            </button>
            <button
              className="button"
              onClick={() => window.location.href = "https://youthtechquiz.netlify.app"}
            >
              Youth Tech Quiz
            </button>
          </div>

          {/* Area Dropdown - Only visible if 'Top Rank' is clicked */}
          {showAreaDropdown && topUsers.length === 0 && (
            <div className="area-selection">
              <label htmlFor="area-select">Select Your Area:</label>
              <select id="area-select" value={selectedArea} onChange={handleAreaChange}>
                <option value="">--Select Area--</option>
                <option value="Ambattur">Ambattur</option>
                <option value="Redhills">Redhills</option>
                <option value="Thirumangalam">Thirumangalam</option>
                <option value="Ashok Nagar">Ashok Nagar</option>
              </select>
            </div>
          )}

          {/* Show Top 3 Users */}
          {topUsers.length > 0 && (
            <div className="top-users">
              <h2>Top Users in {selectedArea}</h2>
              <ul>
                {topUsers.map((user, index) => (
                  <li key={index} className="rank-item">
                    <div className="profile">
                      <img src={user.profilePic} alt={user.name} className="profile-pic" />
                      <div className="user-info">
                        <p className="username">{user.name}</p>
                        <p className="points">Points: {user.points}</p>
                        <p className="level">Level: {getUserLevel(user.points)}</p> {/* Display level */}
                      </div>
                    </div>
                    <span className="rank-number">Rank {index + 1}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>

        {auth.isAuth && <Discover className="discover" />}
      </div>
    </>
  );
};
