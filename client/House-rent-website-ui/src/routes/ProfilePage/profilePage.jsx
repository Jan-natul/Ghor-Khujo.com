import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import List from "../../components/list/list";
import apiRequest from "../../lib/apiRequest";
import "./profilePage.scss";
import { Suspense, useContext, useState } from "react"; 
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const data = useLoaderData();
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleDeleteProfile = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your profile?");
    if (!confirmDelete) return;

    try {
      await apiRequest.delete("/users/delete"); // Adjust API path as needed
      updateUser(null);
      navigate("/register"); // or "/login"
    } catch (err) {
      console.error("Error deleting profile:", err);
      alert("Failed to delete profile.");
    }
  };


  const handleDeletePost = async (postId, setUserPosts) => { 
    if (!window.confirm("আপনি কি নিশ্চিতভাবে এই পোস্টটি ডিলিট করতে চান?")) {
      return;
    }
    try {
      await apiRequest.delete(`/posts/${postId}`);
      setUserPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          
          <div className="title">
            <h1>User Information</h1>
          </div>
          <div className="info">
            <span>Avatar: <img src={currentUser.avatar || "/noavatar.png"} alt="" /></span>
            <span>Username: <b>{currentUser.username}</b></span>
            <span>E-mail: <b>{currentUser.email}</b></span>

            <div className="actionButtons">
                <div className="left">
              <Link to="/profile/update">
                <button className="updateProfileBtn">Update Profile</button>
              </Link>
              </div>
              <div className="right">
              <button className="deleteProfileBtn" onClick={handleDeleteProfile}>
                Delete Profile
              </button>
              <button className="logoutBtn" onClick={handleLogout}>Logout</button>
            </div>
          </div>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/newpost">
              <button>Create New Post</button>
            </Link>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              
              {(postResponse) => <MyPostList initialPosts={postResponse.data.userPosts} onDelete={handleDeletePost} />}
            </Await>
          </Suspense>

          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
function MyPostList({ initialPosts, onDelete }) {
  const [userPosts, setUserPosts] = useState(initialPosts);

  const handleDelete = (postId) => {
    onDelete(postId, setUserPosts); 
  };

  return (
    <List 
      posts={userPosts}
      showDeleteButton={true}
      onDelete={handleDelete}
    />
  );
}

export default ProfilePage;