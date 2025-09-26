import { useContext } from "react";
import SearchBar from "../../components/SearchBar/searchbar";
import "./homepage.scss";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {
  const {currentUser} = useContext(AuthContext);

  console.log(currentUser);
  return (
    <div className="homepage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find the Best Rentals</h1>
          <p className="description">
           Easy search, trusted listings, and homes you'll love to live in. Discover affordable rentals in your favorite neighborhoods.
          </p>
           <SearchBar />
        </div>
      </div>
      <div className="imgContainer">
        <img src="/1.jpg" alt="" />
        </div>
        </div>
  );
}

export default HomePage;