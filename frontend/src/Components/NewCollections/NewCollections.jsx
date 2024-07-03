import React, { useEffect, useState } from "react";
import "./newcollections.css";
// import new_collections from "../Assets/new_collections";
import Item from "../Items/Item";

const NewCollections = () => {
	const [new_collection, setNew_collection] = useState([]);

	useEffect(() => {
		fetch("https://trendiez-ecommerce.onrender.com/newcollections")
			.then((response) => response.json())
			.then((data) => setNew_collection(data));
	}, []);

	return (
		<div className="new-collections">
			<h1>
				<i class="bx bxs-hot bx-tada" style={{ color: "orange" }}></i>NEW COLLECTIONS
				<i class="bx bxs-hot bx-tada" style={{ color: "orange" }}></i>
			</h1>
			<hr />
			<div className="collections">
				{new_collection.map((item, i) => {
					return (
						<Item
							key={i}
							id={item.id}
							name={item.name}
							image={item.image}
							new_price={item.new_price}
							old_price={item.old_price}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default NewCollections;
