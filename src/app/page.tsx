"use client";
import { useState, useEffect } from "react";

const alerts = {type: "", message: ""};
let color = "gray";

switch(alerts.type){
  case 'info':
    color = 'blue';
    break;
  case "error":
    color = "red";
    break;
  case "success":
    color = "green";
    break;
  case "warning":
    color = "yellow";
    break;
  default:
    color = "gray";
}

export default function Home() {

  const [messages, setMessages] = useState<any[]>([])

  useEffect(() =>{
    const see = new EventSource(
      "http://localhost:8000/stream", 
      {
        withCredentials: true
      }
    );

    see.onmessage = (event) => {
      //setMessages((prevMessages) => [...prevMessages, event.data]);
      //console.log(event.data);
      const data = JSON.parse(event.data.replace("data: ", ""));
      setMessages((prev) => [...prev, data]);
      console.log(data);
    };

  }
)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {messages.length > 0 ?(
          <>
        {messages.map((message, i) => {
          return (<li key={i}>
            {message.type} {message.message}
          </li>)
        })}
        </>
  ): <p>No Message Found</p>}
      </div>



    </main>
  );
}
