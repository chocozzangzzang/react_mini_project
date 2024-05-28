import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Typography from "@mui/material/Typography";
import axios from 'axios';

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

function setBaseTime(hour, minute) {
  var baseTime = "";
  if(hour < 2) baseTime += "2300";
  else if (hour == 2) {
    if(minute <= 15) baseTime += "2300";
    else baseTime += "0200";
  }
  else if (hour < 5) baseTime += "0200";
  else if (hour == 5) {
    if(minute <= 15) baseTime += "0200";
    else baseTime += "0500";
  }
  else if (hour < 8) baseTime += "0500";
  else if (hour == 8) {
    if(minute <= 15) baseTime += "0500";
    else baseTime += "0800";
  }
  else if (hour < 11) baseTime += "0800";
  else if (hour == 11) {
    if(minute <= 15) baseTime += "0800";
    else baseTime += "1100";
  }
  else if (hour < 14) baseTime += "1100";
  else if (hour == 14) {
    if(minute <= 15) baseTime += "1100";
    else baseTime += "1400";
  }
  else if (hour < 17) baseTime += "1400";
  else if (hour == 17) {
    if(minute <= 15) baseTime += "1400";
    else baseTime += "1700";
  }
  else if (hour < 20) baseTime += "1700";
  else if (hour == 20) {
    if(minute <= 15) baseTime += "1700";
    else baseTime += "2000";
  }
  else if (hour < 23) baseTime += "2000";
  else if (hour == 23) {
    if(minute <= 15) baseTime += "2000";
    else baseTime += "2300";
  } else baseTime += "2300";

  return baseTime;
}

function Forecast() {

  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [gridX, setGridX] = useState("");
  const [gridY, setGridY] = useState("");
  const [nowDate, setNowDate] = useState("");
  const [forecastData, setForecastData] = useState([]);
  const [forecastIsFull, setForecastIsFull] = useState(false);

  useEffect(() => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        
        if(position.coords.latitude >= 33 && position.coords.latitude <= 39
          && position.coords.longitude >= 125 && position.coords.longitude <= 132
        ) {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);

          var result = convertXY(lat, lon);
          setGridX(result.x);
          setGridY(result.y);

        }
      })}
  });

  useEffect(() => {

        const today = new Date();
        const formattedDate = `${today.toLocaleString()}`;

        var year  = today.getFullYear();
        var month = today.getMonth() + 1;
        var day   = today.getDate();
        var hour  = today.getHours();
        var min   = today.getMinutes();
        var base_date = "";
         
        year = year.toString();
        if(month < 10) month = "0" + month.toString();
        else month = month.toString();

        if(day < 10) day = "0" + day.toString();
        else day = day.toString();
        
        var bd = setBaseTime(hour, min);

        if(hour < 2 || (hour == 2 && min <= 15)) {
          var yesterday = new Date(today);
          yesterday.setDate(today.getDate() - 1);

          var yesterday_year  = yesterday.getFullYear();
          var yesterday_month = yesterday.getMonth() + 1;
          var yesterday_day   = yesterday.getDate();
          
          yesterday_year = yesterday_year.toString();
          if(yesterday_month < 10) yesterday_month = "0" + yesterday_month.toString();
          else yesterday_month = yesterday_month.toString();

          if(yesterday_day < 10) yesterday_day = "0" + yesterday_day.toString();
          else yesterday_day = yesterday_day.toString();

          base_date += (yesterday_year + yesterday_month + yesterday_day);
        } else {
          base_date += (year + month + day);
        }

        const key = "0DZUAX87M9kJWvxPJWL3raL5m9BYWp2N%2FzlC8zZYrvAg6Lwvv7WqwI4%2Bvb729zpp8rxMBKyp29N7kJEzNwrdhQ%3D%3D";
        const pageNo = 1;
        const numOfRows = 1000;
        const dataType = "JSON";
        const base_time = bd;
        const nx = gridX.toString();
        const ny = gridY.toString();

        setNowDate(formattedDate);

        const fetchData = async() => {

          var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'; /*URL*/
          var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + key; /*Service Key*/
          queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(pageNo); /**/
          queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent(numOfRows); /**/
          queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent(dataType); /**/
          queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(base_date); /**/
          queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(base_time); /**/
          queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(nx); /**/
          queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(ny); /**/
          
          console.log(url + queryParams);
          const result = await axios.get(url + queryParams);
          // console.log(result);
          return result.data;
        }
        
        fetchData().then(res => {
          const code = res.response.header.resultCode;
          if(code === "00") {
            const data = res.response.body.items.item;
            var temp = []
            var counter = 1;
            if(data.length > 0) {
              data.forEach(foreData => {
                if(foreData.category === "TMP") {
                  temp.push({
                    id : counter,
                    fcstDate : foreData.fcstDate,
                    fcstTime : foreData.fcstTime,
                    fcstVal  : foreData.fcstValue,
                  });
                  counter += 1;
                }              
              });

              console.log(temp);
            }
          }
        });
  }, [gridX, gridY]);

  useEffect(() => {
    setForecastIsFull(true);
  }, [forecastData]);
      
 
  return (
    <HomePage>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            날씨 페이지
        </Typography>
        <h1>현재시간 : {nowDate}</h1>
        <h1>{lat},,{lon}</h1>
        <h1>{gridX},,{gridY}</h1>
        <div>
          {
            forecastIsFull && <h3>data is loaded.....</h3>
          }
        </div>
    </HomePage>
  )
}

export default Forecast;