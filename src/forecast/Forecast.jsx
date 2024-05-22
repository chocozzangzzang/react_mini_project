import React from 'react'
import styled from 'styled-components';
import Typography from "@mui/material/Typography";

const HomePage = styled.div`
  padding : 16px;
`;

function Forecast() {
  return (
    <HomePage>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            날씨 페이지
        </Typography>
    </HomePage>
  )
}

export default Forecast;