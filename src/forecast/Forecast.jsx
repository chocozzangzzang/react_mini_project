import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Typography from "@mui/material/Typography";

const HomePage = styled.div`
  padding : 16px;
`;

const RE = 6371.00877; // 지구 반경(km)
const GRID = 5.0; // 격자 간격(km)
const SLAT1 = 30.0; // 투영 위도1(degree)
const SLAT2 = 60.0; // 투영 위도2(degree)
const OLON = 126.0; // 기준점 경도(degree)
const OLAT = 38.0; // 기준점 위도(degree)
const XO = 43; // 기준점 X좌표(GRID)
const YO = 136; // 기1준점 Y좌표(GRID)

function convertXY(lat, lon) {
  var DEGRAD = Math.PI / 180.0;
  var RADDEG = 180.0 / Math.PI;

  var re = RE / GRID;
  var slat1 = SLAT1 * DEGRAD;
  var slat2 = SLAT2 * DEGRAD;
  var olon = OLON * DEGRAD;
  var olat = OLAT * DEGRAD;

  var sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  
  var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
  
  var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = re * sf / Math.pow(ro, sn);

  var rs = {};

  rs['lat'] = lat;
  rs['lng'] = lon;
            
  var ra = Math.tan(Math.PI * 0.25 + (lat) * DEGRAD * 0.5);
  ra = re * sf / Math.pow(ra, sn);
            
  var theta = lon * DEGRAD - olon;
  if (theta > Math.PI) theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;
  theta *= sn;
            
  rs['x'] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
  rs['y'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

  return rs;
}

function Forecast() {

  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [gridX, setGridX] = useState("");
  const [gridY, setGridY] = useState("");
  const [nowDate, setNowDate] = useState("");

  useEffect(() => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);

        var result = convertXY(lat, lon);
        setGridX(result.x);
        setGridY(result.y);

        const today = new Date();
        const formattedDate = `${today.toLocaleString()}`;

        var year  = today.getFullYear();
        var month = today.getMonth() + 1;
        var day   = today.getDate();
         
        year = year.toString();
        if(month < 10) month = "0" + month.toString();
        if(day < 10) day = "0" + day.toString();

        console.log(year + month + day);

        const key = "0DZUAX87M9kJWvxPJWL3raL5m9BYWp2N%2FzlC8zZYrvAg6Lwvv7WqwI4%2Bvb729zpp8rxMBKyp29N7kJEzNwrdhQ%3D%3D";
        const pageNo = 1;
        const numOfRows = 1000;
        const dataType = "JSON";
        const base_date = year + month + day;
        const base_time = "0200";
        const nx = gridX;
        const ny = gridY;

        setNowDate(formattedDate);
      })
    } else {
      setLat("xx");
      setLon("yy");
    }
  });
 
  return (
    <HomePage>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            날씨 페이지
        </Typography>
        <h1>현재시간 : {nowDate}</h1>
        <h1>{lat},,{lon}</h1>
        <h1>{gridX},,{gridY}</h1>
    </HomePage>
  )
}

export default Forecast;