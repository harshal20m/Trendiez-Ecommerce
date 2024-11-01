import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShopCategory from "./Pages/ShopCategory";
import Shop from "./Pages/Shop";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kids_banner from "./Components/Assets/banner_kids.png";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Company from "./Components/Company/Company";
import { useEffect, useState } from "react";
import PaymentPage from "./Components/Payment/PaymentPage";

const Loading = () => {
	const [timeLeft, setTimeLeft] = useState(90); // 90 seconds countdown

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
		}, 1000);

		// Refresh the page when the timer reaches zero
		if (timeLeft === 0) {
			window.location.reload();
		}

		return () => clearInterval(timer);
	}, [timeLeft]); // Add timeLeft to dependency array

	return (
		<div className="loading-container">
			<i className="bx bx-loader bx-spin"></i>
			<p className="loading-text">
				Thanks for visiting. <br />
				It's a full-stack project, so we are running our backend on a public cloud.
				<br />
				Loading in {timeLeft} seconds or maybe less. <br />
				Thanks for your patience. Our website instance will run soon. <br />
				Website will refresh after timeout.
			</p>
		</div>
	);
};

function App() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("https://trendiez-ecommerce.onrender.com/allproducts");
			if (response.ok) {
				// Handle your data here, e.g., set state
				setLoading(false);
			} else {
				// Handle error
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			<BrowserRouter>
				<Navbar />
				{loading ? (
					<Loading />
				) : (
					<Routes>
						<Route path="/" element={<Shop />} />
						<Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
						<Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
						<Route path="/kids" element={<ShopCategory banner={kids_banner} category="kid" />} />
						<Route path="/product" element={<Product />}>
							<Route path=":productId" element={<Product />} />
						</Route>
						<Route path="/cart" element={<Cart />} />
						<Route path="/login" element={<LoginSignup />} />
						<Route path="/company" element={<Company />} />
						<Route path="/about" element={<About />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/payment" element={<PaymentPage />} />
					</Routes>
				)}
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
