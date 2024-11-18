import styles from '../index.module.css';

export const DATE_CONSANTS = {
  MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
}

export const returnWeekdayCells = (firstDayOfMonth, daysInMonth, earnings) => {
  const renderCells = [];
  const today = new Date();

  for (let i = 0; i < daysInMonth; i++) {
    const currentDate = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth(), i + 1);
    const dayOfWeek = currentDate.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday

    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclude Sunday and Saturday
      const isToday = currentDate.toLocaleDateString() === today.toLocaleDateString();

      const earningsForDay = earnings.filter((e) => new Date(e.date).toLocaleDateString() == currentDate.toLocaleDateString());

      const date = i + 1;
      if (isToday) {
        renderCells.push(
          <div
            key={i}
            className={`${styles['calendar-grid-cell']} ${styles['today']}`}
          >
            <div>
              <h3>{date}</h3>
              <span>(today)</span>
            </div>
            {earningsForDay && earningsForDay.length > 0 && (
              <div className={styles['earnings']}>
                {earningsForDay.map((e, index) => (<EarningsTicker key={index} earnings={e} />))}
              </div>
            )}
          </div>
        );
      } else {
        renderCells.push(
          <div
            key={i}
            className={styles['calendar-grid-cell']}
          >
            <div>
              <h3>{date}</h3>
            </div>
            {earningsForDay && earningsForDay.length > 0 && (
              <div className={styles['earnings']}>
                {earningsForDay.map((e, index) => (<EarningsTicker key={index} earnings={e} />))}
              </div>
            )}
          </div>
        );
      }
    } else {
      renderCells.push(null);
    }
  }

  return renderCells;
};

const EarningsTicker = ({ earnings }) => {
  return (
    <div className={styles["earnings-ticker"]}>
      <div>
        <h4>{earnings.act_symbol}</h4>
        <span>{earnings.period}</span>
      </div>
      <p> {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(earnings.total_assets)}</p>
    </div>
  );
};

export const calculateRotatingWeekdays = (currentDate) => {
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const startIndex = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1; // Adjust for Monday as first day

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  return [...weekdays.slice(startIndex), ...weekdays.slice(0, startIndex)]; // Rotate weekdays based on startIndex
}
