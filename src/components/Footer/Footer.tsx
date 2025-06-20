// Simple footer with copyright
import cls from './Footer.module.scss';

const Footer = () => (
      <footer className={cls.footer}>
            <p>&copy; {new Date().getFullYear()} HomeService</p>
      </footer>
);
export default Footer;
