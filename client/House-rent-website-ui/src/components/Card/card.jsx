import { Link } from "react-router-dom";
import "./card.scss";

function Card({ item, showDeleteButton, onDelete }) {
  
  
  const handleDeleteClick = (e) => {
    e.preventDefault(); 
    onDelete(item.id);  
  };

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images?.[0] || "/default.jpg"} alt="Listing image" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="Location icon" />
          <span>{item.address}</span>
        </p>
        <p className="price">৳ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="Bed icon" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="Bath icon" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="Save icon" />
            </div>
            <div className="icon">
              <img src="/call.png" alt="Call icon" />
            </div>
            
            
            {showDeleteButton && (
              <div className="icon" onClick={handleDeleteClick}>
                
                <img src="/delete.png" alt="Delete icon" />
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;