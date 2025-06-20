import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/api';
import ProviderCard from '../../components/ProviderCard/ProviderCard';
import cls from './Home.module.scss';

interface Provider {
      _id: string;
      name: string;
      profession: string;
      photo: string;
      rating: number;
      isValidated: boolean;
}

const Home = () => {
      // v5: one options object + generics for strong typing
      const { data = [] } = useQuery<Provider[]>({
            queryKey: ['providers'],
            queryFn: () =>
                  api.get('/providers').then((r) => r.data.data as Provider[])
      });

      return (
            <section className={cls.grid}>
                  {data.map((p) => (
                        <ProviderCard
                              key={p._id}
                              id={p._id}
                              name={p.name}
                              profession={p.profession}
                              photo={p.photo}
                              rating={p.rating}
                              validated={p.isValidated}
                        />
                  ))}
            </section>
      );
};

export default Home;
