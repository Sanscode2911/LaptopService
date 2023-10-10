exports.getTeamDetails = (req,res) =>{
    return res.status(200).json({
        team: "backend4-laptopTeam",
    memberNames: ["Sanskar Agarwal", "Poorvi Dalwai"],
    });
};
const fs = require("fs");

let data = fs.readFileSync("./assets/data/laptops.json");

const locations = ["US-NC", "IE", "IN"];
const location_laptop_tax = [0.08, 0.23, 0.18]; 

const laptop = JSON.parse(data);

exports.getLaptopDetails = (req, res) => {
    let loc = req.query.location;
    let laptops;

    if (locations.includes(loc)) {
        laptops = JSON.parse(JSON.stringify(laptop));

        // Apply location-specific logic
        if (locations.indexOf(loc) === 0) {
            laptops.forEach((e) => {
                e.price = e.price + 0.08 * e.price;
                e.price = e.price.toFixed(3);
            });
        } else if (locations.indexOf(loc) === 1) {
            laptops.forEach((e) => {
                e.price = e.price + 0.23 * e.price;
                e.price = e.price.toFixed(3);
            });
        } else if (locations.indexOf(loc) === 2) {
            laptops.forEach((e) => {
                e.price = e.price * 82.2; // Convert to INR
                e.price = e.price + 0.18 * e.price;
                e.price = e.price.toFixed(3);
            });
        }

        // Optional parameters
        const minPrice = parseFloat(req.query.minprice);
        const maxPrice = parseFloat(req.query.maxprice);
        const rating = parseFloat(req.query.rating);
        const brand = req.query.brand;

        // Filter laptops based on optional parameters
        if (!isNaN(minPrice)) {
            laptops = laptops.filter(e => e.price >= minPrice);
        }

        if (!isNaN(maxPrice)) {
            laptops = laptops.filter(e => e.price <= maxPrice);
        }

        if (!isNaN(rating)) {
            laptops = laptops.filter(e => e.rating >= rating);
        }

        if (brand) {
            laptops = laptops.filter(e => e.brand.toLowerCase() === brand.toLowerCase());
        }

        res.status(200).json({
            error: false,
            message: "successful retrieval!",
            data: laptops,
        });
    } else {
        res.status(404).json({
            error: true,
            message: "unsuccessful get request!",
            data: null,
        });
    }
};
