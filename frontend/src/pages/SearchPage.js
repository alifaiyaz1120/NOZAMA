import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ItemComponent from "../components/ItemComponent";


function SearchPage() {
    const { searchEntry } = useParams();
    const [list, setList] = useState([])

    useEffect(() => {
        axios.get(`/searchbar/${searchEntry}`).then((response) => {
            // console.log(response.data.products);
          setList(response.data.products);
        });
    }, [searchEntry]);

    return (
        <div className="item-container">
            {
                list.map(item=>{
                    return(
                        <ItemComponent
                        itemID = {item.id}
                        title = {item.title}
                        description = {item.description}
                        price = {item.price}
                        rating = {item.rating}
                        image = {item.images[0]}
                        ></ItemComponent>
                    )
                })
            }
        </div>
    );
}

export default SearchPage;
