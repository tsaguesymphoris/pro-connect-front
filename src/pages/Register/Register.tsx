import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../../services/api';
import cls from './Register.module.scss';

const Register = () => {
      const { t } = useTranslation();

      const quartiers = [
            'Mendong',
            'Odja',
            'Nsam',
            'Etoudi',
            'Bastos',
            'Bonamoussadi',
            'Akwa',
            'Bonanjo',
            'Makepe',
            'Essos',
            'Mvog-Mbi',
            'Emana',
            'Nlongkak',
            'Biyem-Assi',
            'Autre'
      ];
      const professions = [
            'plumber',
            'electrician',
            'hairdresser',
            'mechanic',
            'maid',
            'painter',
            'carpenter',
            'other'
      ];
      const [form, setForm] = useState({
            gender: 'male',
            name: '',
            email: '',
            phone: '',
            password: '',
            role: 'client',
            profession: professions[0],
            momoNumber: '',
            quartier: quartiers[0],
            city: 'Yaoundé',
            country: 'Cameroun'
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

                  <div className={cls.fieldsGrid}>
                        <select
                              value={form.gender}
                              onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))}
                        >
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                        </select>

                        <input
                              type="text"
                              placeholder="Name"
                              required
                              value={form.name}
                              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        />

                        <input
                              type="email"
                              placeholder="Email"
                              required
                              value={form.email}
                              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        />

                        <input
                              type="tel"
                              placeholder="Phone"
                              required
                              value={form.phone}
                              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        />

                        <input
                              type="password"
                              placeholder="Password"
                              required
                              value={form.password}
                              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                        />

                        <select
                              value={form.role}
                              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                        >
                              <option value="client">Client</option>
                              <option value="provider">Provider</option>
                        </select>

                        {form.role === 'provider' && (
                              <>
                                    <select
                                          value={form.profession}
                                          onChange={(e) =>
                                                setForm((f) => ({ ...f, profession: e.target.value }))
                                    }
                                    >
                                          {professions.map((p) => (
                                                <option key={p} value={p}>
                                                      {t(`professions.${p}`)}
                                                </option>
                                          ))}
                                    </select>

                                    <input
                                          type="tel"
                                          placeholder="MoMo Number"
                                          value={form.momoNumber}
                                          onChange={(e) =>
                                                setForm((f) => ({ ...f, momoNumber: e.target.value }))
                                          }
                                    />
                              </>
                        )}

                        <select
                              value={form.quartier}
                              onChange={(e) => setForm((f) => ({ ...f, quartier: e.target.value }))}
                        >
                              {quartiers.map((q) => (
                                    <option key={q} value={q}>
                                          {q}
                                    </option>
                              ))}
                        </select>

                        <select
                              value={form.city}
                              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                        >
                              <option value="Yaoundé">Yaoundé</option>
                              <option value="Douala">Douala</option>
                        </select>

                        <input
                              type="text"
                              placeholder="Country"
                              value={form.country}
                              onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                        />
                  </div>

                  <label className={cls.fileLabel}>
                        <input
                              type="file"
                              accept="image/*"
                              className={cls.fileInput}
                              onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                        />
                        {photo ? 'Change photo' : 'Upload photo'}
                  </label>
                  {photo && <div className={cls.fileName}>{photo.name}</div>}

                  <button type="submit">Register</button>
            </form>
      );
};
export default Register;
