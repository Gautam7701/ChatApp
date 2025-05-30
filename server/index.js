// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import AuthRoutes from "./routes/AuthRoutes.js";
// import MessageRoutes from "./routes/MessageRoutes.js";
// import { Server } from "socket.io";

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));



// app.use("/uploads/recordings",express.static("uploads/recordings"))
// app.use("/uploads/images",express.static("uploads/images"))

// // Route setup
// app.use("/api/auth", AuthRoutes);
// app.use('/api/messages', MessageRoutes);
// app.get('/', (req, res) => {
//   res.send('Backend is working!');
// });
// // Start server
// const PORT = process.env.PORT || 5000;
// const server = app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// global.onlineUsers = new Map();
// io.on("connection", (socket) => {
//   global.chatSocket = socket;
//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });
//   socket.on("send-mssg",(data)=>{
//     const sendUserSocket = onlineUsers.get(data.to);
//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit("msg-receive", {
//         from: data.from,
//         message: data.message,
//       });
//     }
//   })

//   socket.on("outgoing-voice-call",(data)=>{
//     const sendUserSocket = onlineUsers.get(data.to)
//     if(sendUserSocket){
//       socket.to(sendUserSocket).emit("incoming-voice-call",{
//         from:data.from,roomId:data.roomId,callType:data.callType,
//       })
//     }
//   })
//   socket.on("outgoing-video-call",(data)=>{
//     const sendUserSocket = onlineUsers.get(data.to)
//     if(sendUserSocket){
//       socket.to(sendUserSocket).emit("incoming-video-call",{
//         from:data.from,roomId:data.roomId,callType:data.callType,
//       })
//     }
//   });

//   socket.on("reject-voice-call",(data)=>{
//      const sendUserSocket = onlineUsers.get(data.from);
//      if(sendUserSocket){
//       socket.to(sendUserSocket).emit("voice-call-rejected")
//      }
//   })
//   socket.on("reject-video-call",(data)=>{
//      const sendUserSocket = onlineUsers.get(data.from);
//      if(sendUserSocket){
//       socket.to(sendUserSocket).emit("video-call-rejected")
//      }
//   })

//   socket.on("accept-incoming-call",({id})=>{
//     const sendUserSocket = onlineUsers.get(id);
//     socket.to(sendUserSocket).emit("accept-call")
//   })

//   });


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";
import MessageRoutes from "./routes/MessageRoutes.js";
import { Server } from "socket.io";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://chat-app-zeta-gray.vercel.app"
];

// CORS Middleware setup
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like Postman, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error(`CORS policy: Origin ${origin} not allowed`), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json());

app.use("/uploads/recordings", express.static("uploads/recordings"));
app.use("/uploads/images", express.static("uploads/images"));

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/messages", MessageRoutes);

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Socket.IO setup with same CORS config
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-mssg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", {
        from: data.from,
        message: data.message,
      });
    }
  });

  socket.on("outgoing-voice-call", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("incoming-voice-call", {
        from: data.from,
        roomId: data.roomId,
        callType: data.callType,
      });
    }
  });

  socket.on("outgoing-video-call", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("incoming-video-call", {
        from: data.from,
        roomId: data.roomId,
        callType: data.callType,
      });
    }
  });

  socket.on("reject-voice-call", (data) => {
    const sendUserSocket = onlineUsers.get(data.from);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("voice-call-rejected");
    }
  });

  socket.on("reject-video-call", (data) => {
    const sendUserSocket = onlineUsers.get(data.from);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("video-call-rejected");
    }
  });

  socket.on("accept-incoming-call", ({ id }) => {
    const sendUserSocket = onlineUsers.get(id);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("accept-call");
    }
  });
});
