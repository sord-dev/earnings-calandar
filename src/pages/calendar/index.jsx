import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Calendar } from '../../components'
import { useNavigate } from 'react-router-dom'
import { NotificationTrey } from '../../components'


const convertDate = (date) => {
  // we need to convert the date to a string that the server can understand 
  // YYYY-MM-DD (2021-09-01)
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
}

function CalendarPage() {
  const [earnings, setEarnings] = useState([])
  const [messages, setMessages] = useState([])
  const [date, setDate] = useState(new Date())

  const [viewedMonths, setViewedMonths] = useState({ from: new Date(date), to: new Date(new Date().setMonth(new Date().getMonth() + 1)) })

  const navigate = useNavigate()

  const appendNotification = (message, type) => {
    setMessages(prev => [...prev, { notification: message, type }]);
  }

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


  useEffect(() => {
    console.log('Date changed to:', date);
    setViewedMonths({ from: new Date(date), to: new Date(new Date(date).setMonth(date.getMonth() + 1)) });
  }, [date])

  
  return (
    <>
      <Calendar earnings={earnings} currentDate={date}  setCurrentDate={setDate} />
      <NotificationTrey messages={messages} setMessages={setMessages} />
    </>
  )
}


export default CalendarPage