import React from 'react'

function useMousePosition(initialState = { x: 0, y: 0 }) {
    const [mousePosition, setMousePosition] = React.useState(initialState)

    React.useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePosition({ x: event.clientX, y: event.clientY })
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return { mousePosition };
}

export default useMousePosition