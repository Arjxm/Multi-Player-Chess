import { io } from "socket.io-client";

const URL = "http://localhost:5000" || process.env.PUBLIC_URL;
export const socket = io(URL);

