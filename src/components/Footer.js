import React from 'react';
import { useIntl } from 'react-intl';

function Footer() {
  const { formatMessage } = useIntl();

  return (
    <footer className="bg-dark text-white text-center py-3 footer fixed-bottom">
      <div className="container">
        <p>&copy; 2024 {formatMessage({ id: 'footerText' })}</p>
      </div>
    </footer>
  );
}

export default Footer;
