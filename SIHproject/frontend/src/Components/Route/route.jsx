import React from "react";

const Route = () =>{

    const sub = (e) =>{
        e.preventDefault();
            const routeName = document.getElementById('routeName').value;
            const routeID = document.getElementById('routeID').value;
            const routeQuantity = document.getElementById('routeQuantity').value;
            const selectedCategories = Array.from(document.getElementById('routeCategory').selectedOptions)
                                            .map(option => option.value);

            const message = document.getElementById('message');
            if (routeName === '' || routeID === '' || routeQuantity === '' || selectedCategories.length === 0) {
                message.innerHTML = "<span class='error'>Please fill out all fields and select at least one category.</span>";
            } else {
                message.innerHTML = `Item <strong>${routeName}</strong> with ID <strong>${routeID}</strong> and quantity <strong>${routeQuantity}</strong> has been added under the following categories: <strong>${selectedCategories.join(', ')}</strong>`;
                
                // Clear form fields after successful submission
                document.getElementById('routeForm').reset();
            }
    }
    return(
        <div>
            <div class="header">
                <div>
                    <img src="dtc.jpg" alt="DTC Logo"></img>
                </div>
                <div>
                    <h1>DILLI YATRA</h1>
                </div>
                <div>
                    <img src="indian emblem.jpg" alt="India Flag"></img>
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
                    <input type="text" id="routeID" name="routeID" placeholder="Enter Route ID" required></input>
                    <label for="busQuantity">Enter No Of Buses: </label>
                    <input type="number" id="busQuantity" name="busQuantity" placeholder="Enter quantity" required></input>
                    <label for="routeCategory">Select Bus Stops (you can select multiple):</label>
                    <select id="routeCategory" name="routeCategory" multiple required>
                        <option value="Munirka">Munirka</option>
                        <option value="R.K Puram">R.K Puram</option>
                        <option value="Hauz Khas">Hauz Khas</option>
                        <option value="IIT">IIT</option>
                        <option value="Vasant Vihar">Vasant Vihar</option>
                        <option value="Shankar Vihar">Shankar Vihar</option>
                    </select>
                    <button type="submit">Add Route</button>
                </form>
                <div class="message" id="message"></div>
            </div>
        </div>
    );
}

export default Route;