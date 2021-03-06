import React, {useState, useEffect} from 'react'
import auth0Client from "../Auth";


const SensorLookupForUser = (props) => {
    let realEstate = "U2";
    if (props.realEstate) {
        realEstate = props.realEstate;
    }
    const [sensors, setSensors] = useState([]);


    useEffect(() => {

        fetchData();

    }, []);

    const fetchData = async () => {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        if (!auth0Client.isAuthenticated()) {
            setSensors([]);
        } else {
            headers = {
                ...headers,
                'Authorization': `Bearer ${auth0Client.getAccessToken()}`
            };
            const result = await fetch(`${window.env.OBSERVATION_API_URL}/subscription/sensor/${realEstate}`, {
                headers: headers
            });

            if(result.ok){
                const data = await result.json();
                setSensors(data);
            }

        }
    }


    return (
        <div>
            <h3>Sensors in {realEstate}:</h3>
            <ul>
                {
                    sensors
                        .map((sensor, i) => {
                            console.log(sensor);
                            return (
                                <li key={i}>
                                    <span>Building {sensor.building}, floor {sensor.floor}, room {sensor.placementRoom} has sensor of type {sensor.sensorType} and id {sensor.recId}</span>
                                </li>
                            )
                        })
                }
            </ul>
        </div>
    );
}


export default SensorLookupForUser;