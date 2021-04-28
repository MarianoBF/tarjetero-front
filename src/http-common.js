import axios from "axios";

let JWT = (JSON.parse(sessionStorage.getItem('JWT'))) || ""

export default axios.create({
    baseURL: "https://tarjetero.herokuapp.com/api/v1",
    credentials: 'same-origin',
    headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + JWT
    }
})