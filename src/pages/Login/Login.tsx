import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/auth';
import cls from './Login.module.scss';

const Login = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const login = useAuthStore((s) => s.login);
      const nav = useNavigate();
      const { t } = useTranslation();

      const submit = async (e: React.FormEvent) => {
            e.preventDefault();
            await login(email, password);
            nav('/');
      };

      return (
            <form className={cls.form} onSubmit={submit}>
                  <h1>Login</h1>
                  <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="submit">Login</button>
                  <p className={cls.registerLink}>
                        {t('noAccount')}{' '}
                        <Link to="/register">{t('createAccount')}</Link>
                  </p>
            </form>
      );
};
export default Login;
