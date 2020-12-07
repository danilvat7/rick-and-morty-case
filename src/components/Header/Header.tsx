import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Container } from '@material-ui/core';

/**
 * Header component
 */
export default function Header() {
  return (
    <AppBar position="static" color="default">
      <Container>
        <Toolbar>
          <h1>Rick and Morty Universe</h1>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
