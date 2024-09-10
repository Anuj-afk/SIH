import React from "react";

import "./stop.css"
const Stop = () =>{
    const sub = (e) => {
        e.preventDefault();
        const stopName = document.getElementById('stopName').value;
        const longval = document.getElementById('longval').value;
        const latval = document.getElementById('latval').value;

        // Get selected categories (multiple options)
        const message = document.getElementById('message');

        // Check if fields are not empty
        if (stopName === '' || longval === '' || latval === '') {
            message.innerHTML = "<span class='error'>Please fill out all fields and select at least one category.</span>";
        } else {
            message.innerHTML = `Stop <strong>${stopName}</strong> with Longitude <strong>${longval}</strong> and Latitude <strong>${latval}</strong> has been added</strong>`;
            
            // Clear form fields after successful submission
            document.getElementById('itemForm').reset();
        }
    };
    return(
        <div>
            <div class="header">
                <div>
                    <img src="E:\vs code projects\SIH\SIHproject\frontend\static\dtc.jpg" alt="DTC Logo"></img>
                </div>
                <div>
                    <h1>DILLI YATRA</h1>
                </div>
                <div>
                    <img src="E:\vs code projects\SIH\SIHproject\frontend\static\indian emblem.jpg" alt="India Flag"></img>
                </div>
            </div>
            <div class="navbar">
                <a href="/">Home</a>
                <a href="#">About Us</a>
                <a href="#">Services</a>
                <a href="#">RTI</a>
                <a href="#">Contact Us</a>
            </div>
            <h1>NEW BUS STOP</h1>
            <div class="container">
                <form id="stopForm" onSubmit={sub}>
                    <label for="stopName">Stop Name: </label>
                    <input type="text" id="stopName" name="stopName" placeholder="Enter Route name" required></input>
                    <label for="longval">LONGITUDE: </label>
                    <input type="number" id="longval" name="longval" placeholder="Enter quantity" required></input>
                    <label for="latval">LATITUDE: </label>
                    <input type="number" id="latval" name="latval" placeholder="Enter quantity" required></input>
                    <button type="submit">Add Route</button>
                </form>
                <div class="message" id="message"></div>
            </div>
        </div>
    );
}

export default Stop;