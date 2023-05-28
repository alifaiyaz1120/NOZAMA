import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Categories = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get(`/listcategories`).then((response) => {
          setList(response.data);
        });
    }, []);
    
  return (
    <div>
            {list.map(categories=>{
                return(
                  <div>
                    <Link to={`/category/${categories}`}>{categories}</Link>
                  </div>
                )
            })

            }
    </div>
  )
}

export default Categories
