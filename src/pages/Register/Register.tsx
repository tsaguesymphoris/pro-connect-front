import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../../services/api';
import cls from './Register.module.scss';

const Register = () => {
      const { t } = useTranslation();

      // available districts for the address selector
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
      // professions available when the user registers as a provider
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
      // registration form state
      const [form, setForm] = useState({
            gender: 'male',
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            role: 'client',
            profession: professions[0],
            momoNumber: '',
            quartier: quartiers[0],
            city: 'Yaoundé',
            country: 'Cameroun'
      });
      const [photo, setPhoto] = useState<File | null>(null);

      // send form data to the API and create the user
      const submit = async (e: React.FormEvent) => {
            e.preventDefault();
            if (form.password !== form.confirmPassword) {
                  alert('Passwords do not match'); // warn user before sending
                  return;
            }
            const fd = new FormData();
            // omit confirmPassword when sending to the API
            const { confirmPassword, ...payload } = form;
            Object.entries(payload).forEach(([k, v]) => fd.append(k, v));
            if (photo) fd.append('photo', photo);
            await api.post('/auth/register', fd, {
                  headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Compte créé ! Vérifie tes mails.');
      };

      // render the registration form
      return (
            <form className={cls.form} onSubmit={submit}>
                  <h1>{t('register.title')}</h1>

                  <div className={cls.fieldsGrid}>
                        <select
                              value={form.gender}
                              onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))}
                        >
                              <option value="male">{t('genders.male')}</option>
                              <option value="female">{t('genders.female')}</option>
                              <option value="other">{t('genders.other')}</option>
                        </select>

                        <input
                              type="text"
                              placeholder={t('register.name')}
                              required
                              value={form.name}
                              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        />

                        <input
                              type="email"
                              placeholder={t('register.email')}
                              required
                              value={form.email}
                              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        />

                        <input
                              type="tel"
                              placeholder={t('register.phone')}
                              required
                              value={form.phone}
                              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        />

                        <input
                              type="password"
                              placeholder={t('register.password')}
                              required
                              value={form.password}
                              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                        />

                        <input
                              type="password"
                              placeholder={t('register.confirmPassword')}
                              required
                              value={form.confirmPassword}
                              onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                        />

                        <select
                              value={form.role}
                              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                        >
                              <option value="client">{t('roles.client')}</option>
                              <option value="provider">{t('roles.provider')}</option>
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
                                          placeholder={t('register.momoNumber')}
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
                              placeholder={t('register.country')}
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
                        {photo ? t('register.changePhoto') : t('register.uploadPhoto')}
                  </label>
                  {photo && <div className={cls.fileName}>{photo.name}</div>}

                  <button type="submit">{t('register.title')}</button>
            </form>
      );
};
export default Register;
