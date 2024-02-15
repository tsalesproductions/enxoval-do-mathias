"use client"

import Header from "@/app/components/header";
import qrPix from '../../components/hooks/pixGenerator';
import { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/app/components/footer/footer";

interface IResponse {
    payload: string; //payload for QrCode
    base64: string; //QrCode image base64
}

export default function Page(){
    const [paymentPixActive , setPaymentPix] = useState<IResponse>();


    useEffect(() => {
        async function loadPixData(){
            const pixResponse = await qrPix({
                price: 0,
                message: `PIX DOADO ATRAVÉS DA PaGINA DE PIX`
            });
    
            if(pixResponse){
                setPaymentPix(pixResponse);
            }
        }

        loadPixData();
    }, [])

    return (
        <>
            <Header/>
            <div className="w-full container  py-8 flex flex-col gap-5 px-2 lg:py-10 mx-auto">
                <h4 className="text-2xl font-bold">Gostaria de fazer um pix?</h4>
                <div>
                    <p className="text-sm font-semibold text-black m-0">Sua contribuição será de grande ajuda para nós.</p>
                    <p className="text-sm font-semibold text-black m-0">Utilize uma das chaves abaixo para realizar o pagamento:</p>
                </div>

                {paymentPixActive ? 
                    (
                        <div className="grid grid-cols-1 wrap sm:gap-5 sm:grid-cols-2">
                            <div className='payment-area pix'>
                                    <p className='text-sm text-slate-600'>Para finalizar seu pedido, escaneie o QRCODE abaixo ou copie o código copia e cola.</p>
                                    <Image
                                        src={paymentPixActive.base64}
                                        alt="Escaneie para finalizar o pedido"
                                        width={300}
                                        height={300}/>
                                        <textarea rows={5} className="w-full border p-2" defaultValue={paymentPixActive.payload}></textarea>
                            </div>
                            <div className="others-keys">
                                <h4 className="text-xl font-semibold text-black m-0">Outras chaves:</h4>
                                <ul>
                                    <li><strong>Chave (Telefone):</strong> (21) 98192-3293 - Izabelly Gonçaves</li>
                                    <li><strong>Chave (Telefone):</strong> pix@thiagosales.dev</li>
                                </ul>
                            </div>
                        </div>
                    ) : ""}
            </div>
            <Footer/>
        </>
    )
}