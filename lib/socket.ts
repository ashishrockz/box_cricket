import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || `https://cricket-tournament-backend-1l7n.onrender.com`, {
  transports: ["websocket"],
});

export default socket;
