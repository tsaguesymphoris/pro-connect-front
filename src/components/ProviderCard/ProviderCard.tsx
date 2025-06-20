import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaStar } from 'react-icons/fa';
import cls from './ProviderCard.module.scss';

export interface ProviderCardProps {
      id: string;
      name: string;
      profession: string;
      photo: string;
      rating: number;
      validated: boolean;
}

/** Small provider preview card used in search grid */
const ProviderCard: React.FC<ProviderCardProps> = ({
      id,
      name,
      profession,
      photo,
      rating,
      validated
}) => {
      const { t } = useTranslation();

      return (
            <article className={cls.card}>
                  <img className={cls.photo} src={photo} alt={`${name} avatar`} />

                  <div className={cls.info}>
                        <h3 className={cls.name}>{name}</h3>
                        <p className={cls.profession}>{t(`professions.${profession}`)}</p>

                        <div className={cls.rating}>
                              {Array.from({ length: 5 }).map((_, i) => (
                                    <FaStar key={i} className={i < rating ? cls.filled : cls.empty} />
                              ))}
                        </div>

                        {validated && <span className={cls.badge}>{t('validated')}</span>}
                  </div>

                  <Link to={`/providers/${id}`} className={cls.cta}>
                        {t('viewProfile')}
                  </Link>
            </article>
      );
};

export default ProviderCard;
