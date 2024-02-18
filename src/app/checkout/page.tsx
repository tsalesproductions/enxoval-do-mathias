"use client"

import { useState, useEffect } from 'react';
import storage from '../components/storage/storage';
import qrPix from '../components/hooks/pixGenerator';
import {products, address} from '../../app/database.json';
import Image from 'next/image';
import Header from '../components/header';
import Footer from '../components/footer/footer';


interface Product{
    image: string;
    name: string;
    price: number; 
    quantity: number; 
}

interface IResponse {
    payload: string; //payload for QrCode
    base64: string; //QrCode image base64
}

interface CCResponse{
    status: boolean;
    url: string;
}

const Checkout = () => {
    const [items, setItems] = useState<Product[]>([]);
    const [subtotal, setSubTotal] = useState(0);
    const [buttonSubmit, setButtonSubmit] = useState(false);
    const [paymentSelected, setPaymentSelected] = useState(false);
    const [paymentPixActive , setPaymentPix] = useState<IResponse>();
    const [paymentCCActive , setPaymentCC] = useState<CCResponse>();

    useEffect(() => {
        const items = storage().get();
        setItems(items);

        let totals = 0;

        for(const item of items){
            totals+=(item.price*item.quantity);
        }

        setSubTotal(totals);
    }, [])

    function getProductLink(){
        const productsTemp = [];

        for(const item of items){
            const pItem = products.find(p=>p.name = item.name);
            if(pItem){
                productsTemp.push({
                    name: pItem.name,
                    link: pItem.link_purchase
                })
            }
        }

        return productsTemp;
    }

    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        telefone: '',
        opcao: '',
        forma_pagamento: ''
    });

    function sendEmail(){
        let fd = new FormData();
            fd.append("nome", formData.nome)
            fd.append("sobrenome", formData.sobrenome)
            fd.append("email", formData.email);
            fd.append("telefone", formData.telefone);
            fd.append("produtos", JSON.stringify(items));
            fd.append("subtotal", subtotal.toString());
            fd.append("forma_pagamento", formData.forma_pagamento);

        fetch('https://salescode.dev/cdn/clientes/gkinformatica/send_email_sc.php', {method: "POST", body: fd})
        .then((res) => res.json())
        .then((data) => {
            console.log("E-MAIL ENVIADO");
        })
    }

    function generateCCData (){
        let fd = new FormData();
            fd.append("name", formData.nome)
            fd.append("surname", formData.sobrenome)
            fd.append("email", formData.email);
            fd.append("phone", formData.telefone);
            fd.append("price", subtotal.toString());

        fetch('https://lojaexpress.salescode.dev/payment/preference.php', {method: "POST", body: fd})
        .then((res) => res.json())
        .then((data) => {
            setPaymentCC(data);
        })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if(name == "opcao" && value == "pagar_nosso_site"){
            setButtonSubmit(true)
        }else if(name == "opcao" && value !== "pagar_nosso_site"){
            setButtonSubmit(false)
        }
    };

    const generatePayment = async (e:any) =>{
        e.preventDefault();

        sendEmail();

        switch(formData.forma_pagamento){
            case "pix":
                const pixResponse = await qrPix({
                    price: subtotal,
                    message: `${formData.nome} ${formData.sobrenome} / ${formData.email} / ${formData.telefone}`
                });

                if(pixResponse){
                    setPaymentSelected(true);
                    setPaymentPix(pixResponse);
                    setPaymentCC(undefined)
                }
            break;
            
            case "cartao_credito":
                setPaymentSelected(true);
                setPaymentPix(undefined);
                generateCCData();
            break;

        }
    }

    return (
        <>
            <Header/>
            <div className="max-w-lg mx-auto bg-white shadow-md p-8 rounded-md">
                <h1 className="text-xl font-semibold mb-6">Checkout</h1>
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Resumo do Pedido</h2>
                    <ul>
                        {items.map((item, index) => (
                            <li key={index} className="flex gap-2 items-center">
                                <span><img src={item.image} width={30} alt={item.name}/></span>
                                <span>{item.quantity}x {item.name}</span>
                                <span>{(item.price * item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between mt-4">
                        <span className="font-semibold">Subtotal:</span>
                        <span>{subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}</span>
                    </div>
                </div>
                {!paymentSelected ? (
                    <form onSubmit={generatePayment}>
                        <div className="mb-4">
                            <label htmlFor="nome" className="block text-sm font-semibold mb-2">Nome</label>
                            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" placeholder="Digite seu nome" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="sobrenome" className="block text-sm font-semibold mb-2">Sobrenome</label>
                            <input type="text" id="sobrenome" name="sobrenome" value={formData.sobrenome} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" placeholder="Digite seu sobrenome" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" placeholder="Digite seu email" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="telefone" className="block text-sm font-semibold mb-2">Telefone</label>
                            <input type="tel" id="telefone" name="telefone" value={formData.telefone} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" placeholder="Digite seu telefone" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="opcao" className="block text-sm font-semibold mb-2">Escolha uma opção</label>
                            <select id="opcao" name="opcao" value={formData.opcao} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md cursor-pointer" required>
                                <option value="" disabled>Selecione uma opção</option>
                                <option value="pagar_nosso_site">Pagar no nosso site</option>
                                <option value="comprar_individual">Comprar individualmente</option>
                            </select>
                        </div>
                        {formData.opcao === 'comprar_individual' && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2">No método de compra individual, você mesmo irá efetuar a compra nos sites sugeridos e enviar para a gente. Você também pode comprar em outros sites.</p>
                                <p className="text-sm text-gray-600 mb-2">Clique nos links abaixo para comprar individualmente:</p>
                                <ul className="list-disc pl-0 my-5">
                                    {getProductLink().map((item, index) => (
                                        <li key={index} className='bg-slate-50 list-none p-2 rounded hover:bg-slate-200 mb-1 last:mb-0'>
                                            <a href={item.link} target='_blank' className='block'>
                                                {item.name}
                                                <span className='float-right'>►</span>

                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <div className='border p-2 mt-5'>
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
                        )}
                        {formData.opcao === 'pagar_nosso_site' && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2">Escolha a forma de pagamento:</p>
                                <label className="block mb-2">
                                    <input type="radio" name="forma_pagamento" value="pix" onChange={handleInputChange} required />
                                    <span className="ml-2">PIX</span>
                                </label>
                                <label className="block">
                                    <input type="radio" name="forma_pagamento" value="cartao_credito" onChange={handleInputChange} required />
                                    <span className="ml-2">Cartão de Crédito</span>
                                </label>
                            </div>
                        )}
                        {buttonSubmit ? <button type="submit" className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md mt-6">Finalizar Compra</button> : ""}
                    </form>
                ) :  
                (
                <>
                    {paymentPixActive ? 
                    (
                        <>
                            <div className='payment-area pix'>
                                    <p className='text-sm text-slate-600'>Para finalizar seu pedido, escaneie o QRCODE abaixo ou copie o código copia e cola.</p>
                                    <Image
                                        src={paymentPixActive.base64}
                                        alt="Escaneie para finalizar o pedido"
                                        width={500}
                                        height={500}/>
                                        <textarea rows={5} className="w-full border p-2" defaultValue={paymentPixActive.payload}></textarea>

                                    <button onClick={() => {
                                        setPaymentPix(undefined);
                                        setPaymentCC(undefined);
                                        setPaymentSelected(false);
                                    }} className="text-indigo-500 font-semibold mt-4 inline-block text-">Alterar forma de pagamento</button>
                            </div>
                        </>
                    ) : ""}

                    {paymentCCActive ? 
                        (
                            <>
                                <div className='payment-area pix'>
                                        <p className='text-sm text-slate-600'>Ao clicar no botão abaixo, você será redirecionado para o MercadoPago para finalizar seu pedido.</p>
                                        <a href={paymentCCActive.url} target='_blank' className="inline-block text-white font-semibold py-2 px-4 rounded-md mt-6 bg-green-700 hover:bg-green-800">Finalizar com Mercado Pago</a>

                                        <button onClick={() => {
                                            setPaymentPix(undefined);
                                            setPaymentCC(undefined);
                                            setPaymentSelected(false);
                                        }} className="text-indigo-500 font-semibold mt-4 inline-block text-">Alterar forma de pagamento</button>
                                </div>
                            </>
                        ) : ""}
                </>
                )}
                
                <button onClick={() => location.href="/cart"} className="font-semibold mt-4 inline-block text-orange-500">Voltar para o Carrinho</button>
                <div className='payment-methods border-t mt-5'>
                        <Image src="/payment_method.png"
                            alt='Formas de pagamento'
                            width={300}
                            height={120}
                            className='m-auto'
                        />
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Checkout;
