import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { setLocale } from '../store';

function Header() {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const locale = useSelector(state => state.locale.locale);

  const changeLanguage = (language) => {
    dispatch(setLocale(language));
  };

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <div className="container">
        <Navbar.Brand as={Link} to="/">{formatMessage({ id: 'movieApp' })}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/" className="nav-link">{formatMessage({ id: 'home' })}</Nav.Link>
            <Nav.Link as={Link} to="/search" className="nav-link">{formatMessage({ id: 'search' })}</Nav.Link>
            <Nav.Link as={Link} to="/favorites" className="nav-link">{formatMessage({ id: 'favorites' })}</Nav.Link>
            <NavDropdown title={formatMessage({ id: 'language' })} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => changeLanguage('en')} active={locale === 'en'}>English</NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage('tr')} active={locale === 'tr'}>Türkçe</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Header;
