import { useEffect, useState } from 'react';
import img from '../assets/ticket.png'
import { FaTrash } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { decrement } from '../services/counter';
import { chairType } from '../model/movie';

export default function Ticket(props: { chair: chairType }) {
    const [price, setPrice] = useState(0)
    const dispatch = useDispatch()

    function definePrice(type: chairType) {
        if (type.preferential) {
            setPrice(10)
        } else if (type.especial) {
            setPrice(30)
        } else {
            setPrice(20)
        }
    }

    useEffect(() => {
        definePrice(props.chair)
    }, [])

    function handleExclude() {
        dispatch(decrement(props.chair))
    }

    return (<div className="w-48 h-20 relative text-sky-950 font-bold">
        <img className='absolute w-full h-full object-cover top-0 -z-10' src={img} alt="ticket" />
        <div className='pl-8 pr-4 py-3 flex flex-col justify-between h-full'>
            <div className='flex justify-between w-full'>
                <p className=''>{props.chair.id}</p>
                <span className=''>R$ {price.toFixed(2)}</span>
            </div>
            <div className='flex justify-between items-center w-full'>
                <span className='capitalize'>{props.chair.preferential ? 'preferential' : props.chair.especial ? 'especial' : 'normal'}</span>
                <FaTrash onClick={handleExclude} className='hover:text-red-500 transition-all cursor-pointer' />
            </div>
        </div>
    </div>)
}