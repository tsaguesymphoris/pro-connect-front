import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/auth';
import cls from './Header.module.scss';
import { FaBell, FaSun, FaMoon } from 'react-icons/fa';

const Header = () => {
      const { toggle, theme } = useTheme();
      const { t, i18n } = useTranslation();
      const nav = useNavigate();
      const { user, logout } = useAuthStore();

      const switchLang = () => i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr');

      return (
            <header className={cls.header}>
                  <Link to="/" className={cls.logo}>
                        HomeService
                  </Link>

                  <input className={cls.search} placeholder={t('searchProfession')} />

                  <div className={cls.actions}>
                        <button aria-label="Switch language" onClick={switchLang}>
                              {i18n.language.toUpperCase()}
                        </button>

                        <button aria-label="Toggle theme" onClick={toggle}>
                              {theme === 'light' ? <FaMoon /> : <FaSun />}
                        </button>

                        {user && <FaBell className={cls.icon} />}

                        {user ? (
                              <div className={cls.menu}>
                                    <span>{user.name}</span>
                                    <button onClick={() => nav('/profile')}>{t('profile')}</button>
                                    <button onClick={logout}>{t('logout')}</button>
                              </div>
                        ) : (
                              <Link to="/login">{t('login')}</Link>
                        )}
                  </div>
            </header>
      );
};
export default Header;
