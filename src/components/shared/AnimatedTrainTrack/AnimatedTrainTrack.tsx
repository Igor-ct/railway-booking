import styles from './AnimatedTrainTrack.module.css';

export const AnimatedTrainTrack = () => {
  return (
    <div className={styles.trackContainer}>
      <div className={styles.trainWrapper}>
        <svg width="480" height="24" viewBox="0 0 480 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 20 H455 C470 20 480 15 480 10 C480 5 470 4 455 4 H10 C4 4 0 6 0 10 C0 14 4 20 10 20 Z" fill="var(--color-primary)" />
          
          <g fill="var(--color-cream)">
            {Array.from({ length: 43 }).map((_, i) => (
              <rect key={`window-${i}`} x={12 + i * 10} y="8" width="6" height="8" rx="1.5" />
            ))}
            <path d="M442 8 H454 C460 8 464 9 464 12 C464 15 460 16 454 16 H442 V8 Z" />
          </g>
          
          <line x1="8" y1="18" x2="462" y2="18" stroke="var(--color-light-blue)" strokeWidth="1" />
          
          <g fill="var(--color-gray-dark)">
            {Array.from({ length: 9 }).map((_, i) => (
              <g key={`bogie-${i}`}>
                <line x1={22 + i * 50} y1="22" x2={30 + i * 50} y2="22" stroke="var(--color-gray-dark)" strokeWidth="2" />
                <circle cx={22 + i * 50} cy="22" r="2" />
                <circle cx={30 + i * 50} cy="22" r="2" />
              </g>
            ))}
          </g>
        </svg>
      </div>
      
      <div className={styles.trackLine}></div>
    </div>
  );
};