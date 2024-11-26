import axios from 'axios'
import React from 'react'

function useRefetch({ method = 'GET', url = '', body = null }) {
    const [data, setData] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

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
            return res.data;
        } catch (error) {
            setError(error)
            return null;
        }
    }

    const refetch = async () => {
        if(!request) return null;
        setLoading(true)
        setError(null)

        try {
            const { url, body } = request;
            console.log(`refetching: ${url}`)
            const data = await fetchData(url, body)
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

    return { data, loading, error, refetch }
}

export default useRefetch