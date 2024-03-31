import img from '../assets/ticket.png'

export default function Ticket(props: { chair: number, type: string }) {
    return (<div className="w-48 h-20 relative text-sky-950 font-bold">
        <img className='absolute w-full h-full object-cover top-0 -z-10' src={img} alt="ticket" />
        <div className='px-8 py-3 flex flex-col justify-between h-full'>
            <div className='flex justify-between w-full '>
                <p className=''>{props.chair}</p>
                <span className=''>Preço</span>
            </div>
            <span className='capitalize'>{props.type}</span>
        </div>
    </div>)
}