import React, { useEffect, useState }  from "react";
import "./Showroute.css"
import {
    APIProvider,
    Map,
    AdvancedMarker,
    MapCameraChangedEvent,
    Pin,
    useMap,
    useMapsLibrary,
  } from '@vis.gl/react-google-maps';

const Showroute = () =>{
    const [routeid, setrouteid] = useState([]);
    const [maproute, setmaproute] = useState([]);
    useEffect(() => {
        const fetchid = async () =>{

            let url = window.location.origin + "/SIHapp/get_route_id";
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const json = await res.json();
            if(json.obtained){
                const stopsArray = Array.isArray(json['route']) ? json['route'] : [];
                setrouteid(stopsArray);
            }
            else{
                console.log("error")
            }
        }

        fetchid();
    }, [])

    const selectedroute = async () => {
        let url = window.location.origin + "/SIHapp/get_route";
        const id = document.getElementById('idcategory').value;
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id": id
            })
        })

        const json = await res.json();
        if(json.obtained){
            const stopsArray = Array.isArray(json['route']) ? json['route'] : [];
            setmaproute(stopsArray);
            console.log(maproute)
        }
        else{
            console.log("error")
        }
        // setmaproute(json["route"]);
        // console.log(json['route']);
        
    }

    function Directions({ maproute }) {
        const map = useMap();
        const routesLibrary = useMapsLibrary("routes");
        const [directionsService, setDirectionsService] = useState(null);
        const [directionsRenderer, setDirectionsRenderer] = useState(null);
    
        useEffect(() => {
            if (!routesLibrary || !map) return;
    
            // Initialize DirectionsService and DirectionsRenderer when the library is ready
            setDirectionsService(new routesLibrary.DirectionsService());
            const renderer = new routesLibrary.DirectionsRenderer();
            setDirectionsRenderer(renderer);
    
            // Cleanup function to remove the renderer when component unmounts
            return () => {
                if (renderer) renderer.setMap(null);
            };
        }, [routesLibrary, map]);
    
        useEffect(() => {
            if (!directionsService || !directionsRenderer) return;
    
            // Clear previous directions
            directionsRenderer.setMap(null);
    
            // Set up a new DirectionsRenderer tied to the map
            directionsRenderer.setMap(map);
    
            let origin = { lat: 28.623173611804816, lng: 77.24292758748628 };
            if (maproute.length > 0) {
                origin = { lat: maproute[0].bus_stop__latitude, lng: maproute[0].bus_stop__longitude };
            }
    
            let destination = { lat: 28.613114063525405, lng: 77.24539197706255 };
            if (maproute.length > 0) {
                destination = { lat: maproute[maproute.length - 1].bus_stop__latitude, lng: maproute[maproute.length - 1].bus_stop__longitude };
            }
            let waypoints = [];
            waypoints = maproute.slice(1, -1).map(stop => ({
                location: { lat: stop.bus_stop__latitude, lng: stop.bus_stop__longitude },
                stopover: true, // Mark each waypoint as a stopover
            }));
            console.log(waypoints);

            directionsService.route({
                origin,
                destination,
                travelMode: "DRIVING",
                waypoints: waypoints,
            }).then(response => {
                directionsRenderer.setDirections(response);
            }).catch(error => {
                console.error("Error fetching directions:", error);
            });
    
        }, [maproute, directionsService, directionsRenderer]);
    
        return null;
    }
    
    

    return(
        <div class="grid_container">
        
        <div class="content">
            <APIProvider apiKey={'AIzaSyDedFcd_BUni7Ax0VjAwB8ur_1yjZOzTsQ'} onLoad={() => console.log('Maps API has loaded.')}>
                <Map
                    defaultZoom={13}
                    defaultCenter={ { lat: 28.639374, lng: 77.226510 } }
                    mapId='DEMO_MAP_ID'
                    fullscreenControl={false}>
                        <Directions maproute={maproute}/>   
                </Map>
            </APIProvider>
        </div>
        <div class="selector">
            <select id="idcategory" name="id" onChange={selectedroute}>
                {routeid.map((id) => (
                    <option value={id['id']}>{id['id']}</option>
                ))}
            </select>
        </div>
        </div>
    );
}

export default Showroute;