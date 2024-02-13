"use client"

import { useState, useEffect } from 'react';
import storage from '../components/storage/storage';

interface Product{
    image: string, 
    name: string, 
    price: number; 
    quantity: number; 
}

const Checkout = () => {

    const [items, setItems] = useState<Product[]>([]);
    const [subtotal, setSubTotal] = useState(0);

    useEffect(() => {
        const items = storage().get();
        setItems(items);

        let totals = 0;

        for(const item of items){
            totals+=(item.price*item.quantity);
        }

        setSubTotal(totals);
    }, [])

    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        telefone: '',
        opcao: '',
        forma_pagamento: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };    

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md p-8 rounded-md">
            <h1 className="text-xl font-semibold mb-6">Checkout</h1>
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Resumo do Pedido</h2>
                <ul>
                    {items.map((item, index) => (
                        <li key={index} className="flex gap-2 items-center">
                            <span><img src={item.image} width={30}/></span>
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
            <form>
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
                    <select id="opcao" name="opcao" value={formData.opcao} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required>
                        <option value="" disabled>Selecione uma opção</option>
                        <option value="pagar_nosso_site">Pagar no nosso site</option>
                        <option value="comprar_individual">Comprar individualmente</option>
                    </select>
                </div>
                {formData.opcao === 'comprar_individual' && (
                    <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Clique nos links abaixo para comprar individualmente:</p>
                        <ul className="list-disc pl-5">
                            {items.map((item, index) => (
                                <li key={index}><a href="#">{item.name}</a></li>
                            ))}
                        </ul>
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
                <button type="submit" className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md mt-6">Finalizar Compra</button>
            </form>
            <button onClick={() => location.href="/cart"} className="text-indigo-500 font-semibold mt-4 inline-block">Voltar para o Carrinho</button>
        </div>
    );
};

export default Checkout;
