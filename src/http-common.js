import axios from "axios";

let JWT = (JSON.parse(sessionStorage.getItem('JWT'))) || ""

export default axios.create({
    // mode: 'same-origin',
    // credentials: 'include',
    // withCredentials: true,
    
    baseURL: "http://localhost:3500/api/v1",
    credentials: 'same-origin',
    headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + JWT
    }
})