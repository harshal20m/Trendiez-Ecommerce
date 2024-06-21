import React from "react";
import "./item.css";
import { Link } from "react-router-dom";

const Item = (props) => {
	return (
		<div className="item">
			<Link to={`/product/${props.id}`} style={{ textDecoration: "none", color: "black" }}>
				<img onClick={window.scrollTo(0, 0)} src={props.image} alt="" /> <p>{props.name}</p>
			</Link>
			<div className="item-prices">
				<div className="item-price-new">Rs. {props.new_price}</div>
				<div className="item-price-old">Rs. {props.old_price}</div>
			</div>
		</div>
	);
};

export default Item;
