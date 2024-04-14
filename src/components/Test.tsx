import { useEffect, useRef, useState } from 'react';
import { cn } from './libs/utils';

const Test = () => {
    const divRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const connectedRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    const getAngle = (cx: number, cy: number, ex: number, ey: number) => {
        const dy = ey - cy;
        const dx = ex - cx;
        let theta = Math.atan2(dy, dx);
        theta *= 180 / Math.PI;
        return theta;
    }

    useEffect(() => {
        const handleLineFollowPointer = (e: MouseEvent) => {
            const clientX = e.clientX
            const clientY = e.clientY

            const lineRect = divRef.current?.getBoundingClientRect()
            if(lineRef.current && lineRect)
            {
                const lineRectX = ((lineRect.x + 150) + lineRect.width / 2)
                const lineRectY = (lineRect.y + lineRect.height / 2)

                console.log(lineRectX, lineRectY, clientX, clientY)

                const xDistance = Math.abs(clientX - lineRectX);
                const yDistance = Math.abs(clientY - lineRectY)

                const distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
                
                const angle = getAngle(lineRectX, lineRectY, clientX, clientY)
                
                lineRef.current.style.width = `${distance}px`
                lineRef.current.style.transformOrigin = 'top left'
                lineRef.current.style.transform = `rotate(${angle}deg)`
                // console.log(angle)
            }
        }
        if(isDragging && !isConnected)
        {

            window.addEventListener('mousemove', handleLineFollowPointer)
        }

        return () => {
            if(isDragging) window.removeEventListener('mousemove', handleLineFollowPointer)
        }
    }, [isDragging, isConnected])

    const handleConnect = () => {
        const lineRect = divRef.current?.getBoundingClientRect()
        const connectedRect = connectedRef.current?.getBoundingClientRect()
        if(lineRect && connectedRect && lineRef.current)
        {
            const lineRectX = ((lineRect.x + 300) + lineRect.width / 2)
            const lineRectY = (lineRect.y + lineRect.height / 2)

            const connectedRectX = (connectedRect.x + connectedRect.width / 2)
            const connectedRectY = (connectedRect.y + connectedRect.height / 2)

            const xDistance = Math.abs(connectedRectX - lineRectX);
            const yDistance = Math.abs(connectedRectY - lineRectY)

            const distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
            
            const angle = getAngle(lineRectX, lineRectY, connectedRectX, connectedRectY)
            
            lineRef.current.style.width = `${distance}px`
            lineRef.current.style.transformOrigin = 'top left'
            lineRef.current.style.transform = `rotate(${angle}deg)`
        }
    }

    useEffect(() => {
        if(isConnected) handleConnect()
    }, [isConnected])

    return (
        <div className="py-24 px-24 flex justify-between">
            <div
                ref={divRef}
                className={cn(
                'relative div px-4 py-2 rounded-md cursor-pointer max-w-[300px] bg-black text-white w-screen max-h-12',
                isDragging && 'bg-blue-200'
                )}
                onClick={() => setIsDragging(prev => !prev)}
            >
                Draggable Div
                <div ref={lineRef} onClick={(e) => e.stopPropagation()} className={cn("line absolute h-1 bg-black top-[18px] left-[300px] cursor-default", !isDragging && 'hidden')} />
            </div>
            <div
                className={cn(
                'relative div px-4 py-2 rounded-md cursor-pointer max-w-[300px] bg-black text-white w-screen max-h-12 mt-64'
                )}
                onClick={() => setIsConnected(prev => !prev)}
                ref={connectedRef}
            >
                Dragged To
            </div>
        </div>
    );
};

export default Test;
