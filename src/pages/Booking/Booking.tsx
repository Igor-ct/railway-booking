import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { generateTrainWagons } from '../../data/wagons';
import { SeatMap } from '../../components/SeatMap/SeatMap';
import { BookingForm } from '../../components/BookingForm/BookingForm';
import { Ticket } from '../../components/Ticket/Ticket';
import { useBookingContext } from '../../context/BookingContext'; 
import { toast } from 'react-toastify';
import type { Seat } from '../../types/booking';
import styles from './Booking.module.css';

type BookingStep = 'SELECT_SEATS' | 'CHECKOUT' | 'TICKET';

export const Booking = () => {
  const { trainNumber } = useParams<{ trainNumber: string }>();
  const navigate = useNavigate();
  
  const { isSeatPurchased, addPurchasedTickets } = useBookingContext();

  const [wagons] = useState(() => generateTrainWagons(400));
  const [selectedWagon, setSelectedWagon] = useState(wagons[0]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [currentStep, setCurrentStep] = useState<BookingStep>('SELECT_SEATS');
  const [passengerName, setPassengerName] = useState<string>('');

  useEffect(() => {
    if (!trainNumber) navigate('/');
  }, [trainNumber, navigate]);

  const wagonWithOccupiedSeats = {
    ...selectedWagon,
    seats: selectedWagon.seats.map(seat => ({
      ...seat,
      isAvailable: seat.isAvailable && !isSeatPurchased(trainNumber || '', selectedWagon.number, seat.id)
    }))
  };

  const handleToggleSeat = (seat: Seat) => {
    if (!seat.isAvailable) return; 
    setSelectedSeats((prev) => {
      if (prev.find((s) => s.id === seat.id)) return prev.filter((s) => s.id !== seat.id);
      return [...prev, seat];
    });
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const handleWagonChange = (wagon: typeof wagons[0]) => {
    setSelectedWagon(wagon);
    setSelectedSeats([]); 
  };

  const handleBookingSuccess = (name: string) => {
    setPassengerName(name);
    if (trainNumber) {
      addPurchasedTickets(trainNumber, selectedWagon.number, selectedSeats);
    }
    setCurrentStep('TICKET'); 
    toast.success('Бронювання успішне! Ваші квитки готові.');
  };

  const handleClose = () => {
    navigate('/');
  };

  if (!trainNumber) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.bookingContainer}>
        
        <div className={styles.header}>
          <h2>
            Потяг {trainNumber}: {currentStep === 'SELECT_SEATS' ? 'Вибір місць' : 'Оформлення квитків'}
          </h2>
          <button className={styles.closeButton} onClick={handleClose}>✕ Закрити</button>
        </div>

        <div className={styles.content}>
          
          {currentStep === 'SELECT_SEATS' && (
            <>
              <div className={styles.wagonSelectorPlaceholder}>
                <h3>Виберіть вагон</h3>
                <div className={styles.wagonTabs}>
                  {wagons.map(w => (
                    <button 
                      key={w.id} 
                      className={selectedWagon.id === w.id ? styles.activeTab : styles.tab}
                      onClick={() => handleWagonChange(w)}
                    >
                      Вагон {w.number} ({w.wagonClass})
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3>Виберіть місця (Вагон {selectedWagon.number})</h3>
                <SeatMap 
                  wagon={wagonWithOccupiedSeats} 
                  selectedSeats={selectedSeats} 
                  onToggleSeat={handleToggleSeat} 
                />
              </div>

              {selectedSeats.length > 0 && (
                <div className={styles.summaryPanel}>
                  <div className={styles.summaryInfo}>
                    <p>Обрано місць: <b>{selectedSeats.length}</b> (№ {selectedSeats.map(s => s.number).join(', ')})</p>
                    <h3>Загальна сума: <span className={styles.totalPrice}>{totalPrice} грн</span></h3>
                  </div>
                  <button 
                    className={styles.continueButton}
                    onClick={() => setCurrentStep('CHECKOUT')}
                  >
                    Перейти до оформлення
                  </button>
                </div>
              )}
            </>
          )}

          {currentStep === 'CHECKOUT' && (
            <div className={styles.checkoutWrapper}>
              <h3> Введіть ваші дані</h3>
              <BookingForm 
                selectedSeats={selectedSeats}
                totalPrice={totalPrice}
                onCancel={() => setCurrentStep('SELECT_SEATS')}
                onSubmitSuccess={handleBookingSuccess} 
              />
            </div>
          )}

          {currentStep === 'TICKET' && (
            <div className={styles.checkoutWrapper}>
              <h3 style={{ textAlign: 'center', color: 'var(--color-success)', marginBottom: '20px' }}>
                🎉 Оплата пройшла успішно!
              </h3>
              <Ticket 
                trainNumber={trainNumber}
                passengerName={passengerName}
                selectedSeats={selectedSeats}
                totalPrice={totalPrice}
              />
              <button 
                className={styles.continueButton} 
                style={{ width: '100%', marginTop: '20px' }}
                onClick={handleClose}
              >
                Повернутися на головну
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};