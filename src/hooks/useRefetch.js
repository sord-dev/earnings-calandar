/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React from 'react'

function useRefetch({ method = 'GET', url = '', body = null }) {
    const [data, setData] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)


    const [lastRequestTime, setLastRequestTime] = React.useState(null)
    const [request, setRequest] = React.useState(null)

    const fetchData = async (url = '', body = null) => {
        if (!url) return null;
        const headers = method === 'POST' ? { 'Content-Type': 'application/json' } : {}
        const options = body ? { method, headers, body } : { method, headers }
        options.withCredentials = true

        setRequest({ url, body })

        try {
            setError(null)
            const res = await axios(url, options);
            setLastRequestTime(Date.now())
            setLoading(false)
            return res.data;
        } catch (error) {
            setLoading(false)
            setError(error)
            return null;
        }
    }

    const refetch = async (override) => {
        if(!request) return null;
        setLoading(true)
        setError(null)

        try {
            const { url, body } = override || request;
            const data = await fetchData(url, body)
            setLastRequestTime(Date.now())
            setData(data)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchData(url, body)
            .then(data => setData(data))
            .catch(error => setError(error))
    }, [])

    return { data, loading, error, refetch, lastRequestTime }
}

export default useRefetch