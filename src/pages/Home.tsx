import diagram from '../assets/diagram.svg'
import stethoscope from '../assets/stethoscope.svg'
import doctor from '../assets/doctor.svg'

export function Home(){
    return ( 
        <div className="bg-slate-300">
            
            <div className='mt-5'>
                <h1 className="text-8xl text-slate-800 font-bold text-center"> Protocolos </h1>
            </div>

            <div className="grid grid-cols-2 place-content-around mt-10">
                <div className="mx-auto">
                    <i className="fa-solid fa-user-doctor text-9xl text-slate-800"></i>
                </div>
                <div className="mx-auto">
                    <i className="fa-solid fa-diagram-successor text-9xl text-slate-800"></i>
                </div>
            </div>

        </div>
    )
}