import React, { useEffect, useState } from "react";

const Route = () =>{

    const [stops, setstops] = useState([])
    useEffect(() => {
        const fetchstops = async () =>{
            try{
                let stopurl = window.location.origin + "/SIHapp/getstops";
                const stopsres = await fetch(stopurl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const stopjson = await stopsres.json();
                if(stopjson.obtained){
                    const stopsArray = Array.isArray(stopjson['stops']) ? stopjson['stops'] : [];
                    setstops(stopsArray);
                }
                else if(!stopjson.obtained){
                    console.error("not obtained");
                }

            }
            catch(error){
                console.error("Error fetching stops:", error);
            }

        }
        fetchstops();
    }, []);

    
    const sub = async (e) =>{
        e.preventDefault();
        const routeName = document.getElementById('routeName').value;
        const routeID = document.getElementById('routeID').value;
        const busQuantity = document.getElementById('busQuantity').value;
        const selectedCategories = Array.from(document.getElementById('routeCategory').selectedOptions)
                                        .map(option => option.value);

        const message = document.getElementById('message');
        let url = window.location.origin + "/SIHapp/addroute";
        const res = await fetch(url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "name": routeName,
                "id": routeID,
                "quantity": busQuantity,
                "stops": selectedCategories,
            })
        });

        const json = await res.json();
        if (json['added'] === false) {
            message.innerHTML = `<span class='error'>${json['error']}</span>`;
        } 
        else if (json['added'] === true){
            console.log("error")
            message.innerHTML = `Route <strong>${routeName}</strong> with ID <strong>${routeID}</strong> and Bus quantity <strong>${busQuantity}</strong> has been added with the following stops: <strong>${selectedCategories.join(', ')}</strong>`;

            document.getElementById('routeForm').reset();
        }
    };
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
            <h1>NEW BUS ROUTE</h1>

            <div class="container">
                <form id="routeForm" onSubmit={sub}>
                    <label for="routeName">Route Name: </label>
                    <input type="text" id="routeName" name="routeName" placeholder="Enter Route name" required></input>
                    <label for="routeID">Route ID: </label>
                    <input type="number" id="routeID" name="routeID" placeholder="Enter Route ID" required></input>
                    <label for="busQuantity">Enter No Of Buses: </label>
                    <input type="number" id="busQuantity" name="busQuantity" placeholder="Enter quantity" required></input>
                    <label for="routeCategory">Select Bus Stops (you can select multiple):</label>
                    <select id="routeCategory" name="routeCategory" multiple required>
                        {stops.map((stop) => (
                            <option value={stop['name']}>{stop['name']}</option>
                        ))}
                    </select>
                    <button type="submit">Add Route</button>
                </form>
                <div class="message" id="message"></div>
            </div>
        </div>
    );
}

export default Route;