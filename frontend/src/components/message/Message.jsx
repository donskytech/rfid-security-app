import React from "react";
import { useEffect } from "react";
import "./message.css"

export default function Message({ msg, type, removeMessage }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeMessage();
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  return <p className={`message message-${type}`}>{msg}</p>;
}
