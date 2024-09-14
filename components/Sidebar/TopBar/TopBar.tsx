'use client'
import * as React from 'react';
import kylie from '@/assets/kylie-jenner.jpg'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { motion } from "framer-motion";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import MoreIcon from '@mui/icons-material/MoreVert';
import Image from 'next/image';

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color="default" position="static">
          <Toolbar>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Image src={kylie} alt='profile' height={40} className='rounded-full' />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block', fontSize: '16px' } }}
            >
              Kylie Jenner
              <p className='text-slate-500 font-normal text-sm'>Last seen today 01:00 P.M</p>
            </Typography>
            <Box sx={{ flexGrow: 1 }} >
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex', gap: '8px' } }}>
              <IconButton size="medium" aria-label="show 4 new mails" color="inherit" sx={{ backgroundColor: '#D3D3D3' }}>
                <SearchIcon className='text-slate-500' />
              </IconButton>
              <IconButton
                size="medium"
                aria-label="show 17 new notifications"
                color="inherit"
                sx={{ backgroundColor: '#D3D3D3' }}
              >
                <AddIcCallIcon className='text-slate-500' />
              </IconButton>
              <IconButton
                size="medium"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{ backgroundColor: '#D3D3D3' }}
              >
                <MoreVertIcon className='text-slate-500' />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon className='text-slate-500' />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </Box>
    </motion.div>
  );
}
