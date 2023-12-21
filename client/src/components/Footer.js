import { FaHeart } from 'react-icons/fa';

function Footer() {
  return (
    <footer>
      <small>
        &copy; {new Date().getFullYear()} made with{' '}
        <FaHeart style={{ color: 'red' }} /> by -{' '}
        Team AgroCare
      </small>
    </footer>
  );
}

export default Footer;
