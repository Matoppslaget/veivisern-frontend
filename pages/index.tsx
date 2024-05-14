import React, { useEffect, useState } from 'react';

function Index() {
  const [data, setMessage] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/generate')
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div className="myClass">{data ? JSON.stringify(data) : 'Loading...'}</div>
  );
}

export default Index;