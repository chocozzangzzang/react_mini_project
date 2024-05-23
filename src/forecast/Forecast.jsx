import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Typography from "@mui/material/Typography";

const HomePage = styled.div`
  padding : 16px;
`;

function Forecast() {

  const [location, setLocation] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude : position.coords.latitude,
        longitude : position.coords.longitude,
      });
    },
    (error) => console.log(error)
    );
  }, []);
 
  return (
    <HomePage>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            날씨 페이지
        </Typography>
        <h1>Lat : {location.latitude}</h1>
        <h1>Lon : {location.longitude}</h1>
    </HomePage>
  )
}

export default Forecast;