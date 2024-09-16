import React, { useEffect, useState }  from "react";
import "./bus.css"
import {
    APIProvider,
    Map,
    AdvancedMarker,
    MapCameraChangedEvent,
    Pin
  } from '@vis.gl/react-google-maps';


const Bus = () =>{
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
                console.log(stopjson)
                if(stopjson.obtained){
                    for (let i= 0; i<stopjson["stops"].length; i++){
                        locations.push({
                            key: stopjson["stops"][i]["name"],
                            location: {
                                lat: stopjson["lat"][i]["latitude"],
                                lng: stopjson["lng"][i]["longitude"]
                            }
                        })
                    }
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
    type Poi ={ key: string, location: google.maps.LatLngLiteral }
    

    const locations: Poi[] = [];

    const PoiMarkers = (props: {pois: Poi[]}) => {
        return (
          <>
            {props.pois.map( (poi: Poi) => (
              <AdvancedMarker
                key={poi.key}
                position={poi.location}>
              <Pin background={'#003f82'} glyphColor={'#900C3F'} borderColor={'#000'} />
              </AdvancedMarker>
            ))}
          </>
        );
      };
    
    return(
        <div class="grid_container">
        <div class="content">
            <APIProvider apiKey={'AIzaSyCYCwhIllVBwLLEWEj5UZMgpyi8GCPPz3Y'} onLoad={() => console.log('Maps API has loaded.')}>
                <Map
                    defaultZoom={13}
                    defaultCenter={ { lat: 28.639374, lng: 77.226510 } }
                    mapId='DEMO_MAP_ID'
                    onCameraChanged={ (ev: MapCameraChangedEvent) =>
                        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                    }>
                        <PoiMarkers pois={locations} />
                </Map>
            </APIProvider>
        </div>
        <button id="add_new_bus_btn"><a href="/Monitorbuses/addbus">Add new bus</a></button>
        </div>
    )
    
};


export default Bus;