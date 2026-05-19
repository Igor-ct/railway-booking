import { useState, FormEvent } from 'react';
import type { Seat } from '../../types/booking';
import styles from './BookingForm.module.css';

interface BookingFormProps {
  selectedSeats: Seat[];
  totalPrice: number;
  onSubmitSuccess: (name: string) => void;
  onCancel: () => void;
}

export const BookingForm = ({ selectedSeats, totalPrice, onSubmitSuccess, onCancel }: BookingFormProps) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({ name: '', phone: '', email: '' });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let digits = e.target.value.replace(/\D/g, '');

    if (digits.startsWith('380')) {
      digits = digits.substring(3);
    } else if (digits.startsWith('0')) {
      digits = digits.substring(1);
    }

    digits = digits.substring(0, 9);

    let formatted = '';
    if (digits.length > 0) formatted += digits.substring(0, 2);
    if (digits.length > 2) formatted += ' ' + digits.substring(2, 5);
    if (digits.length > 5) formatted += ' ' + digits.substring(5, 7);
    if (digits.length > 7) formatted += ' ' + digits.substring(7, 9);

    setFormData({ ...formData, phone: formatted });
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', phone: '', email: '' };

    if (formData.name.trim().length < 3) {
      newErrors.name = "Ім'я має містити щонайменше 3 символи";
      isValid = false;
    }
    
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 9) {
      newErrors.phone = "Введіть номер повністю (9 цифр)";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Введіть коректний email адресу";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmitSuccess(formData.name); 
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.summaryBadge}>
        <span>Вибрано місць: <b>{selectedSeats.length}</b></span>
        <span>До сплати: <b className={styles.highlight}>{totalPrice} грн</b></span>
      </div>

      <div className={styles.inputGroup}>
        <label>Прізвище та Ім'я</label>
        <input 
          type="text" 
          placeholder="Шевченко Тарас"
          className={errors.name ? styles.inputError : ''}
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label>Номер телефону</label>
        <div className={`${styles.phoneInputWrapper} ${errors.phone ? styles.inputError : ''}`}>
          <span className={styles.phonePrefix}>+380</span>
          <input 
            type="tel" 
            placeholder="50 123 45 67"
            className={styles.phoneInputField}
            value={formData.phone}
            onChange={handlePhoneChange}
          />
        </div>
        {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label>Email (для відправки квитків)</label>
        <input 
          type="email" 
          placeholder="taras@example.com"
          className={errors.email ? styles.inputError : ''}
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
      </div>

      <div className={styles.actionButtons}>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>
          Назад до вибору місць
        </button>
        <button type="submit" className={styles.submitButton}>
          Підтвердити та оплатити
        </button>
      </div>
    </form>
  );
};