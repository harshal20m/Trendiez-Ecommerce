const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken"); // generate the token and verify the token
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const env = require("dotenv");
env.config();

app.use(express.json());
app.use(cors());

// Database connection with MongoDB
const uri = process.env.MONGO_URI;
mongoose
	.connect(uri)
	.then(() => {
		console.log("Connected to MongoDB Atlas");
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB Atlas:", error);
	});

// API Creation
app.get("/", (req, res) => {
	res.send("Express App is Running");
});

// Cloudinary configuration
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

// console.log(process.env.CLOUD_NAME);
// console.log(process.env.CLOUD_API_KEY);
// console.log(process.env.CLOUD_API_SECRET);

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "Trendiez",
		allowed_formats: ["png", "jpg", "jpeg"],
	},
});

const upload = multer({ storage: storage });

// Creating Upload Endpoint for images
app.post("/upload", upload.single("product"), (req, res) => {
	res.json({
		success: 1,
		image_url: req.file.path,
	});
});

// Schema for Creating Products
const Product = mongoose.model("Product", {
	id: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	new_price: {
		type: Number,
		required: true,
	},
	old_price: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	available: {
		type: Boolean,
		default: true,
	},
});

app.post("/addproduct", async (req, res) => {
	let products = await Product.find({});
	let id;
	if (products.length > 0) {
		let last_product_array = products.slice(-1);
		let last_product = last_product_array[0];
		id = last_product.id + 1;
	} else {
		id = 1;
	}
	const product = new Product({
		id: id,
		name: req.body.name,
		image: req.body.image,
		category: req.body.category,
		new_price: req.body.new_price,
		old_price: req.body.old_price,
	});
	console.log(product);
	await product.save();
	console.log("Saved");
	res.json({
		success: true,
		name: req.body.name,
	});
});

// Creating API for deleting Products
app.post("/removeproduct", async (req, res) => {
	await Product.findOneAndDelete({ id: req.body.id });
	console.log("removed");
	res.json({
		success: true,
		name: req.body.name,
	});
});

// Creating API for getting all Products
app.get("/allproducts", async (req, res) => {
	let products = await Product.find({});
	console.log("All Products fetched");
	res.send(products);
});

// Creating Schema for user model
const Users = mongoose.model("Users", {
	name: {
		type: String,
	},
	email: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
	},
	cartData: {
		type: Object,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

// Creating Endpoint for registering the user
app.post("/signup", async (req, res) => {
	let check = await Users.findOne({ email: req.body.email });
	if (check) {
		return res.status(400).json({ success: false, errors: "existing user found with same email address" });
	}
	let cart = {};
	for (let i = 0; i < 300; i++) {
		cart[i] = 0;
	}
	const user = new Users({
		name: req.body.username,
		email: req.body.email,
		password: req.body.password,
		cartData: cart,
	});

	await user.save();

	const data = {
		user: {
			id: user.id,
		},
	};
	const token = jwt.sign(data, "secret_ecom"); // salt passing here
	res.json({
		success: true,
		token,
	});
});

// Creating endpoint for user login
app.post("/login", async (req, res) => {
	let user = await Users.findOne({ email: req.body.email });
	if (user) {
		const passCompare = req.body.password === user.password;
		if (passCompare) {
			// if true will create
			const data = {
				user: {
					id: user.id,
				},
			};
			const token = jwt.sign(data, "secret_ecom");
			res.json({ success: true, token });
		} else {
			res.json({ success: false, errors: "Wrong Password" });
		}
	} else {
		res.json({ success: false, errors: "Wrong Email Id" });
	}
});

// Creating API for newCollection data
app.get("/newcollections", async (req, res) => {
	let products = await Product.find({});
	let newcollection = products.slice(1).slice(-8);
	console.log("newCollection Fetched");
	res.send(newcollection);
});

// Creating endpoint for popular in women section
app.get("/popularinwomen", async (req, res) => {
	let products = await Product.find({ category: "women" });
	let popular_in_women = products.slice(0, 4);
	console.log("popular in women fetched");
	res.send(popular_in_women);
});

// Creating middleware to fetch user
const fetchUser = async (req, res, next) => {
	const token = req.header("auth-token");
	if (!token) {
		return res.status(401).send({ errors: "Please authenticate using a valid token." });
	}

	try {
		const data = jwt.verify(token, "secret_ecom"); // Make sure this matches your JWT_SECRET
		req.user = data.user; // Ensure that the decoded token has the user object
		next();
	} catch (error) {
		return res.status(401).send({ errors: "Please authenticate using a valid token." });
	}
};

// Creating endpoints for adding products in cartdata
app.post("/addtocart", fetchUser, async (req, res) => {
	// console.log(req.body, req.user);
	console.log("Added", req.body.itemId);
	let userData = await Users.findOne({ _id: req.user.id });
	userData.cartData[req.body.itemId] += 1;
	await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
	res.send("Added");
});

// Creating endpoints to remove product from cart data
app.post("/removefromcart", fetchUser, async (req, res) => {
	console.log("removed", req.body.itemId);
	let userData = await Users.findOne({ _id: req.user.id });
	if (userData.cartData[req.body.itemId] > 0) userData.cartData[req.body.itemId] -= 1;
	await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
	res.send("Added");
});

// Creating endpoint to get cart data
app.post("/getcart", fetchUser, async (req, res) => {
	console.log("GetCart");
	console.log(req.user.id);
	let userData = await Users.findOne({ _id: req.user.id });
	console.log(userData);
	res.json(userData.cartData);
});

const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * Route to create an order
 */
app.post("/createOrder", async (req, res) => {
	const { amount } = req.body;
	const options = {
		amount: amount * 100, // amount in paise (for example, 1000 paise = INR 10)
		currency: "INR",
		receipt: `receipt_${Date.now()}`,
		payment_capture: 1, // 1 for automatic capture after payment
	};

	try {
		const order = await razorpay.orders.create(options);
		res.status(200).json(order);
	} catch (error) {
		res.status(500).send("Error creating order: " + error.message);
	}
});

/**
 * Route to capture payment manually
 */
app.post("/capturePayment", async (req, res) => {
	const { paymentId, amount } = req.body;

	try {
		const response = await razorpay.payments.capture(paymentId, amount * 100, "INR");
		res.status(200).json(response);
	} catch (error) {
		res.status(500).send("Error capturing payment: " + error.message);
	}
});

/**
 * Route to verify payment signature
 */
app.post("/verifyPayment", (req, res) => {
	const { order_id, payment_id, signature } = req.body;

	// Create a HMAC SHA256 signature using Razorpay key secret
	const generated_signature = crypto
		.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
		.update(order_id + "|" + payment_id)
		.digest("hex");

	if (generated_signature === signature) {
		res.status(200).json({ success: true, message: "Payment verified successfully" });
	} else {
		res.status(400).json({ success: false, message: "Payment verification failed" });
	}
});

app.listen(port, (error) => {
	if (!error) {
		console.log("server running on Port " + port);
	} else {
		console.log("Error:" + error);
	}
});
