"use client"

import { useEffect, useState } from 'react';
import {info} from '../../database.json';
import storage from '../storage/storage';
import MiniCart from './miniCart';

export default function Header(){
    
    const [totalsInCart, setTotalsInCart] = useState(0);

    useEffect(() => {
        const totals = storage().get();
        setTotalsInCart(totals.length);
    }, [])


    function openMiniCart(){
        document.querySelector(".mini-cart")?.classList.add("open");
        document.body.classList.toggle("overflow-hidden")
    }

    return(
        <>
            <header className={`w-200 flex flex-col justify-center items-center header py-10`}>
                <img src={info.image} className={`w-40 h-40 rounded-full shadow-md`}/>
                <h4 className={`text-2xl font-600 mt-5 text-whitee`}>{info.title}</h4>
                <p className={`text-sm text-whitee`}>{info.description}</p>

                <div className="cart cursor-pointer" onClick={() => openMiniCart()}>
                    <div className='qtd'>
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><g id="Shops"><path d="M27.92,24.08l-2.24-13A4.73,4.73,0,0,0,21.14,7H21A5,5,0,0,0,11,7h-.14a4.73,4.73,0,0,0-4.54,4.08l-2.24,13a5.23,5.23,0,0,0,1.13,4.29A4.45,4.45,0,0,0,8.62,30H23.38a4.45,4.45,0,0,0,3.41-1.63A5.23,5.23,0,0,0,27.92,24.08ZM16,4a3,3,0,0,1,3,3H13A3,3,0,0,1,16,4Zm9.26,23.08a2.45,2.45,0,0,1-1.88.92H8.62a2.45,2.45,0,0,1-1.88-.92,3.21,3.21,0,0,1-.69-2.66l2.24-13A2.74,2.74,0,0,1,10.86,9H21.14a2.74,2.74,0,0,1,2.57,2.42l2.24,13A3.21,3.21,0,0,1,25.26,27.08Z"/></g></svg>
                        <span>{totalsInCart}</span>
                    </div>
                </div> 
            </header>
            <MiniCart/>
        </>
    )
}