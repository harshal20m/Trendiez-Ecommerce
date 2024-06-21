import React, { useContext, useRef, useState } from "react";
import "./navbar.css";
import logo from "../Assets/logo.jpg";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
	const [menu, setMenu] = useState("shop");
	const { getTotalCartItems } = useContext(ShopContext);
	const menuRef = useRef();
	const dropdown_toggle = (e) => {
		menuRef.current.classList.toggle("nav-menu-visible");
		e.target.classList.toggle("open");
	};

	return (
		<div className="navbar">
			<div className="nav-logo">
				<img src={logo} alt="" />
				<p>
					<Link style={{ textDecoration: "none", color: "inherit" }} to="/">
						TRENDIEZ
					</Link>
				</p>
			</div>
			<i onClick={dropdown_toggle} class="bx bx-chevron-down-circle nav-dropdown"></i>
			<ul ref={menuRef} className="nav-menu">
				<li
					onClick={() => {
						setMenu("shop");
					}}
				>
					<Link style={{ textDecoration: "none", color: "inherit" }} to="/">
						Shop
					</Link>
					{menu === "shop" ? <hr /> : <></>}
				</li>
				<li
					onClick={() => {
						setMenu("men");
					}}
				>
					<Link style={{ textDecoration: "none", color: "inherit" }} to="/mens">
						Men
					</Link>
					{menu === "men" ? <hr /> : <></>}
				</li>
				<li
					onClick={() => {
						setMenu("women");
					}}
				>
					<Link style={{ textDecoration: "none", color: "inherit" }} to="/womens">
						Women
					</Link>
					{menu === "women" ? <hr /> : <></>}
				</li>
				<li
					onClick={() => {
						setMenu("kids");
					}}
				>
					<Link style={{ textDecoration: "none", color: "inherit" }} to="/kids">
						Kids
					</Link>
					{menu === "kids" ? <hr /> : <></>}
				</li>
			</ul>
			<div className="nav-login-cart">
				{localStorage.getItem("auth-token") ? (
					<button
						onClick={() => {
							localStorage.removeItem("auth-token");
							window.location.replace("/");
						}}
					>
						Logout
					</button>
				) : (
					<Link style={{ textDecoration: "none" }} to="/login">
						<button>Login</button>
					</Link>
				)}

				<Link style={{ textDecoration: "none" }} to="/cart">
					<img src={cart_icon} alt="" />
				</Link>
				<div className="nav-cart-count">{getTotalCartItems()}</div>
			</div>
		</div>
	);
};

export default Navbar;
