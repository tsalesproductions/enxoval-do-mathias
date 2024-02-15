"use client"

import Header from "@/app/components/header";
import {address} from '../../database.json';
import Footer from "@/app/components/footer/footer";

export default function Page(){
    return (
        <>
            <Header/>
            <div className="w-full container  py-8 flex flex-col gap-5 px-2 lg:py-10 mx-auto">
                <h4 className="text-2xl font-bold">Gostaria de nos enviar algo?</h4>
                <div className='border p-2 m-0'>
                    <p className="text-lg font-semibold text-black mb-0">Nosso endereço:</p>
                    <ul>
                        <li><strong>Endereço:</strong> {address.street} {address.number}</li>
                        <li><strong>Complemento:</strong> {address.complement}</li>
                        <li><strong>Cidade:</strong> {address.city}/{address.state}</li>
                        <li><strong>CEP:</strong> {address.zipcode}</li>
                        <li><strong>Destinatários:</strong> {address.receiver}</li>
                    </ul>
                </div>
            </div>
            <Footer/>
        </>
    )
}