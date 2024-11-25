import { useEffect, useState } from 'react'

function useCalendar(defaultDate = new Date()) {
    const [date, setDate] = useState(defaultDate)
    const [month, setMonth] = useState({ from: new Date(date), to: new Date(new Date().setMonth(new Date().getMonth() + 1)) });


    useEffect(() => {
        console.log('Date changed to:', date);
        setMonth({ from: new Date(date), to: new Date(new Date(date).setMonth(date.getMonth() + 1)) });
      }, [date])

    return {
        date,
        setDate,
        month
    }
}

export default useCalendar