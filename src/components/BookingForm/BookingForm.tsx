import { useState, FormEvent } from 'react';
import type { Seat } from '../../types/booking';
import styles from './BookingForm.module.css';

interface BookingFormProps {
  selectedSeats: Seat[];
  totalPrice: number;
  onSubmitSuccess: () => void;
  onCancel: () => void;
}

export const BookingForm = ({ selectedSeats, totalPrice, onSubmitSuccess, onCancel }: BookingFormProps) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({ name: '', phone: '', email: '' });

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', phone: '', email: '' };

    if (formData.name.trim().length < 3) {
      newErrors.name = "Ім'я має містити щонайменше 3 символи";
      isValid = false;
    }
    
    const phoneRegex = /^(\+380|0)\d{9}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = "Введіть коректний номер (напр. 0501234567)";
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
      onSubmitSuccess(); 
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
        <input 
          type="tel" 
          placeholder="+380 50 123 45 67"
          className={errors.phone ? styles.inputError : ''}
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />
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