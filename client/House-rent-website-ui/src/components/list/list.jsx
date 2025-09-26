import "./list.scss";
import Card from "../Card/card";

function List({ posts, showDeleteButton, onDelete }) {
  return (
    <div className="list">
      {posts.map(item => (
        <Card 
          key={item.id} 
          item={item}
          
          showDeleteButton={showDeleteButton}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default List;