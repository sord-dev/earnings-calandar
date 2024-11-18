import React, { useState } from 'react';
import styles from './index.module.css';

import { DATE_CONSANTS, returnWeekdayCells, calculateRotatingWeekdays } from './utils'

function Calendar({ earnings = [], currentDate, setCurrentDate }) {
  if (!currentDate) return 'Loading...';
  const { MONTHS } = DATE_CONSANTS;

  const returnFormattedMonth = () => MONTHS[currentDate.getMonth()];

  const renderCalendar = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    let renderCells = returnWeekdayCells(firstDayOfMonth, daysInMonth, earnings);
    return (
      <div className={styles['calendar-grid']}>
        {renderCells}
      </div>
    );
  };

  const renderControls = () => {
    return (
      <header className={styles['calendar-header']}>
        <div className={styles['calendar-header-controls']}>
          <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>
            {"<"}
          </button>
          <button onClick={() => setCurrentDate(new Date())}> Today </button>
          <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>
            {">"}
          </button>
          <p>{returnFormattedMonth()} - {currentDate.getFullYear()}</p>
        </div>

        <div className={styles['calandar-header-filters']}>
          <button>Update Earnings</button>
          <button>Filter by Market Cap</button>

          <select title='Filter by Watchlist' name='watchlistFilter'>
            <option value=''>Filter by Watchlist</option>
            <option value='watchlist1'>Watchlist 1</option>
            <option value='watchlist2'>Watchlist 2</option>
            <option value='watchlist3'>Watchlist 3</option>
          </select>
        </div>
      </header>
    );
  }

  const renderHeader = () => {
    const rotatedWeekdays = calculateRotatingWeekdays(currentDate);

    return (
      <div className={styles['calendar-grid-header']}>
        {rotatedWeekdays.map((day, index) => (
          <div key={index}>
            {day}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={styles['calendar']}>
      {renderControls()}
      {renderHeader()}
      {renderCalendar()}
    </div>
  );
}


export default Calendar;
