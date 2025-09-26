import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/Map/map";
import { useLoaderData, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useContext, useEffect, useState } from "react";
import EmailPopup from "../../components/EmailPopup/emailpopup";

function SinglePage() {
  const { currentUser } = useContext(AuthContext); // ✅ move this to top
  const post = useLoaderData();
  const [saved, setSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();


useEffect(() => {
    const fetchSavedStatus = async () => {
      try {
        const res = await apiRequest.get(`/users/isSaved/${post.id}`);
        setSaved(res.data.isSaved);
      } catch (err) {
        console.error("Failed to fetch saved status:", err);
      }
    };

    if (currentUser) {
      fetchSavedStatus();
    }
  }, [post.id, currentUser]);

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      await apiRequest.post("/users/save", { postId: post.id });

      const res = await apiRequest.get(`/users/isSaved/${post.id}`);
      setSaved(res.data.isSaved);
    } catch (err) {
      console.log("Error while saving/unsaving:", err);
    }


};
  return (
    <>
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">৳ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
             <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
        </div>
      </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                 {post.postDetail.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                
                {post.postDetail.pet === "allowed" ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets not Allowed</p>
                )}
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
            
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
               <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
               <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                 <p>
                  {post.postDetail.school > 999
                    ? post.postDetail.school / 1000 + "km"
                    : post.postDetail.school + "m"}{" "}
                  away
                </p> 
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                 <p>{post.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
               <p>{post.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
  <div className="leftButtons">
    <button onClick={() => setIsModalOpen(true)}> 
                <img src="/email.jpg" alt="" />
                Email
              </button>
            </div>
          

  <div className="rightButtons">
    <button
      onClick={handleSave}
      style={{
        backgroundColor: saved ? "#f16843" : "white",
        color: saved ? "white" : "black",
      }}
    >
      <img src="/save.png" alt="" />
      {saved ? "Place Saved" : "Save the Place"}
    </button>
  </div>
  </div>
  </div>
 </div>
</div>
      <EmailPopup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        poster={post.user}
      />
     </>
    );
}

export default SinglePage;