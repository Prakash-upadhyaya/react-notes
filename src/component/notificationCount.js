import React, { useState } from "react";

function Notification() {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
}

export default Notification;
