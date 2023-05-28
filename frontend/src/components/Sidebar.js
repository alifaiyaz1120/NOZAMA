import "../styles/Sidebar.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get(`/listcategories`).then((response) => {
      setList(response.data);
    });
  }, []);

  return (
    <>
      {!sidebar ? (
        <button onClick={() => setSidebar(!sidebar)} className="menu-btn">
          <div className="shop-category-btn">Shop by Category</div>
        </button>
      ) : (
        <>
          <button></button>
          <div className="Sidebar">
            <ul className="SidebarList">
              <button
                onClick={() => setSidebar(!sidebar)}
                className="close-btn"
              >
                X
              </button>
              {list.map((category, key) => {
                return (
                  <Link to={`/category/${category}`}>
                    <li key={key} className="row">
                      {" "}
                      <div>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </div>{" "}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default Sidebar;
