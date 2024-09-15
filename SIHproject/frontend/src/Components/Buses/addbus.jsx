import React from "react";
import "./addbus.css";

const addbus = () => {
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
        <h1>NEW BUS</h1>
        <div class="container">
            <form id="busForm" >
                <label for="busid">Bus ID:</label>
                <input type="number" id="busid" name="busid" placeholder="Enter BUS ID" required></input>
                <label for="plate">Bus Number Plate: </label>
                <input type="text" id="plate" name="plate" placeholder="Enter Number Plate" required></input>
                <label for="ac">A/C</label>
                <input type="checkbox" id="ac" name="ac" placeholder="A/C or non A/C" required></input>
                <button type="submit">Add Stop</button>
            </form>
            <div class="message" id="message"></div>
        </div>
    </div>
    )
}

export default addbus;