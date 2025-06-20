import { useState } from 'react';
import { api } from '../../services/api';
import cls from './Register.module.scss';

const Register = () => {
      const [form, setForm] = useState({
            name: '',
            email: '',
            phone: '',
            password: '',
            role: 'client',
            profession: 'plumber',
            gender: 'male'
      });
      const [photo, setPhoto] = useState<File | null>(null);

      const submit = async (e: React.FormEvent) => {
            e.preventDefault();
            const fd = new FormData();
            Object.entries(form).forEach(([k, v]) => fd.append(k, v));
            if (photo) fd.append('photo', photo);
            await api.post('/auth/register', fd, {
                  headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Compte créé ! Vérifie tes mails.');
      };

      return (
            <form className={cls.form} onSubmit={submit}>
                  <h1>Register</h1>
                  {/* ... autres inputs ... */}
                  <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files?.[0] || null)} />
                  <button type="submit">Register</button>
            </form>
      );
};
export default Register;
