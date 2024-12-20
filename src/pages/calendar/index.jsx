import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Calendar } from '../../components'
import { useNavigate } from 'react-router-dom'
import { NotificationTrey } from '../../components'
import { useCalendar, useNotificationQueue } from '../../hooks'
import { convertDate } from '../../utils'

function CalendarPage() {
  const [earnings, setEarnings] = useState([])
  const { messages, appendNotification, removeLastNotification } = useNotificationQueue();
  const { date, month: viewedMonths, setDate } = useCalendar()

  const navigate = useNavigate()

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const { from, to } = viewedMonths;
        const response = await axios.get(`http://localhost:3003/api/v1/earnings?from=${convertDate(from)}&to=${convertDate(to)}`, { withCredentials: true });
        const data = await response.data;  // Adjusted to .data for Axios

        setEarnings(data);
        appendNotification('Earnings fetched successfully', 'success');
      } catch (error) {
        if (error.response?.status === 401) {
          navigate('/authenticate');
        } else {
          setEarnings([]);
          appendNotification(error.message, 'error');
          console.error(error);
        }
      }
    };

    fetchEarnings()
  }, [viewedMonths, navigate])


  return (
    <div>
      <Calendar earnings={earnings} currentDate={date} setCurrentDate={setDate} />
      <NotificationTrey {...{ clearNotification: removeLastNotification, messages }} />
    </div>
  )
}


export default CalendarPage