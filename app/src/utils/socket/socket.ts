import { io } from "socket.io-client";

const URL = "http://localhost:5000" || process.env.BASE_URL;
export const socket = io(URL);

