import React, { useEffect, useState }  from "react";

const Showroute = () =>{
    const [routeid, setrouteid] = useState([]);
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
            console.log(json)
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

    return(
        <div>
            <select id="idcategory" name="id">
                {routeid.map((id) => (
                    console.log(id['id']),
                    <option value={id['id']}>{id['id']}</option>
                ))}
            </select>
        </div>
    );
}

export default Showroute;