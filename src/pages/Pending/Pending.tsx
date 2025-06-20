import cls from './Pending.module.scss';
import { useTranslation } from 'react-i18next';

const Pending = () => {
      const { t } = useTranslation();
      return (
            <section className={cls.center}>
                  <h1>{t('pendingTitle')}</h1>
                  <p>{t('pendingBody')}</p>
            </section>
      );
};
export default Pending;
