import axios from "axios";

const api = axios.create(
    (() => {
        const token = (() => {
            if (typeof window !== "undefined") {
                return localStorage.getItem("jwt");
            }
            return "";
        })();
        
        return {
            baseURL: "http://localhost:3000",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    })()
);

export default api;
