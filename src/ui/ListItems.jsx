import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { useNavigate } from 'react-router-dom';
import LaptopIcon from '@mui/icons-material/Laptop';

function ListItems() {

  const navigate = useNavigate();

  const goMain = () => {
    navigate("/");
  }

  const goForecast = () => {
    navigate("/forecast");
  }

  const goMyPage = () => {
    navigate("/member/detail");
  }

  return (
    <React.Fragment>
    <ListItemButton onClick={goMain}>
      <ListItemIcon>
        <LaptopIcon />
      </ListItemIcon>
      <ListItemText primary="Main Page" />
    </ListItemButton>
    <ListItemButton onClick={goForecast}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="DashBoard" />
    </ListItemButton>
    <ListItemButton onClick={goMyPage}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="My Page" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    {/* <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton> */}
  </React.Fragment>
  )
}

export default ListItems;