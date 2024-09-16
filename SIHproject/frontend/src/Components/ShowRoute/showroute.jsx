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
        console.log(json);
    }

    return(
        <div>
            <select id="idcategory" name="id" onChange={selectedroute}>
                {routeid.map((id) => (
                    <option value={id['id']}>{id['id']}</option>
                ))}
            </select>
        </div>
    );
}

export default Showroute;