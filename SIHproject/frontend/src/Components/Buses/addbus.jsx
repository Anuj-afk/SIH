import React from "react";
import "./addbus.css";

const addbus = () => {

    const add = async (e) =>{
        e.preventDefault()
        const id = document.getElementById('busid').value;
        const plate = document.getElementById('plate').value;
        const ac = document.getElementById('ac').value;
        const message =  document.getElementById('message');

        let url = window.location.origin + "/SIHapp/addbus"
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id": id,
                "plate": plate,
                "ac": ac,
            })
        })

        const json = res.json();
        console.log(json['error'])
        if (json['added'] === false) {
            if(json['error'] == "Unique"){
                message.innerHTML = "<span class='error'>Bus Id already registerd.</span>";
            }
            else{
                message.innerHTML = `<span class='error'>${json["error"]}</span>`;
            }
            
        } else if(json['added'] === true){
            message.innerHTML = `Bus with <strong>${id}</strong> and plate <strong>${plate}</strong>has been added</strong>`;
            
            document.getElementById('busForm').reset();
        }
    }

    return(
        <div>
        <div class="header">
            <div>
                <img src="..\..\..\static\dtc.jpg" alt="DTC Logo"></img>
            </div>
            <div>
                <h1>DILLI YATRA</h1>
            </div>
            <div>
                <img src="..\..\..\static\indian emblem.jpg" alt="India Flag"></img>
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
            <form id="busForm" onSubmit={add}>
                <label for="busid">Bus ID:</label>
                <input type="number" id="busid" name="busid" placeholder="Enter BUS ID" required></input>
                <label for="plate">Bus Number Plate: </label>
                <input type="text" id="plate" name="plate" placeholder="Enter Number Plate" required></input>
                <label for="ac">A/C</label>
                <input type="checkbox" id="ac" name="ac" placeholder="A/C or non A/C" required></input>
                <button type="submit">Add BUS</button>
            </form>
            <div class="message" id="message"></div>
        </div>
    </div>
    )
}

export default addbus;