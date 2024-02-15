"use client"

import Image from 'next/image';

import { useEffect, useState } from "react"
import Header from "../components/header"
import storage from "../components/storage/storage"
import { useWidthSize } from '../components/hooks/useWidthSize';
import Footer from '../components/footer/footer';

interface Product{
    image: string, 
    name: string, 
    price: number; 
    quantity: number; 
}

function CartPage(){
    const [items, setItems] = useState<Product[]>([]);
    const [subtotal, setSubTotal] = useState(0);

    const { isMobile, widthWindow } = useWidthSize();

    useEffect(() => {
        const items = storage().get();
        setItems(items);

        console.log(items)

        let totals = 0;

        for(const item of items){
            totals+=(item.price*item.quantity);
        }

        setSubTotal(totals);
    }, [])

    function handleRemoveItem(name: string){
        const storageData = storage().get();
        const indexProduct = storageData.findIndex((p: { name: string; })=>p.name==name);

        if(indexProduct !== -1){
            storageData.splice(indexProduct, 1);

            storage().put(storageData);

            const element = document.querySelector(".cart .qtd>span");
            if (element) {
                element.innerHTML = String(storageData.length);
            }

            setItems(storageData);
            

            let totals = 0;

            for(const item of storageData){
                totals+=(item.price*item.quantity);
            }

            setSubTotal(totals);
        }
    }

    return(
        <>
            <Header/>
            
            <main className="container mx-auto mt-10 px-2">
                <div className="flex flex-col shadow-md my-10">
                    <div className="bg-white px-4 py-4">
                        <h1 className="font-semibold text-xl">Carrinho de Compras</h1>
                        {items.length > 0 ? (<h2 className="font-semibold text-sm mt-1">{items.length} Produto(s)</h2>) : ""}
                    </div>

                    {items.length > 0 ? (<>
                        <div className="flex flex-col mt-4 border-t">
                            {/* <div className="border-b py-2 px-4 flex">
                                <h3 className="font-semibold text-sm text-gray-600 uppercase flex-1">Detalhes</h3>
                                <h3 className="font-semibold text-sm text-gray-600 uppercase flex-1 text-center">Preço unitário</h3>
                                <h3 className="font-semibold text-sm text-gray-600 uppercase flex-1 text-center">Quantidade</h3>
                                <h3 className="font-semibold text-sm text-gray-600 uppercase flex-1">Subtotal</h3>
                                <h3 className="font-semibold text-sm text-gray-600 uppercase flex-1">Excluir</h3>
                            </div> */}

                            {items.map((product, index) => (
                                <>
                                <div className="flex py-4 px-2 border-b items-center gap-2 sm:gap-0" key={index}>
                                    <div className="flex-0">
                                        <img className="h-16" src={product.image} alt=""/>
                                    </div>
                                    {!isMobile ? (
                                        <>
                                        <div className="flex-1 ml-4">
                                            <span className="font-semibold">{product.name}</span>
                                        </div>
                                        <div className="flex-1">
                                            <span className="text-sm">{product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}</span>
                                        </div>
                                        <div className="flex-1">
                                            <input type="number" value={product.quantity} className="text-center w-8" readOnly={true}/>
                                        </div>
                                        <div className="flex-1">
                                            <span className="text-sm">{(product.price * product.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}</span>
                                        </div>
                                        </>

                                    ) : (
                                        <>
                                        <div className="flex-2 text-sm">
                                            {product.quantity}x <span className="font-semibold">{product.name}</span>
                                        </div>
                                        <div className="flex-1 flex flex-wrap">
                                            <span className="text-sm">{product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}</span>
                                            <span className="text-sm font-semibold">{(product.price * product.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}</span>
                                        </div>
                                        </>
                                    )}
                                    
                                    <div className="flex-1">
                                        <button onClick={() => handleRemoveItem(product.name)}>
                                            <Image
                                                src="./trash.svg"
                                                alt="Remover produto"
                                                width={20}
                                                height={20}
                                            />
                                        </button>
                                    </div>
                                </div>
                                </>
                            ))}

                            
                        </div>

                        <div className="bg-white p-0">
                            {/* <div className="flex justify-between items-center">
                                <label className="font-medium inline-block mb-3 text-sm uppercase">Cupom de Desconto</label>
                                <input type="text" className="w-32 p-2 text-sm border rounded-lg"/>
                                <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-2 px-4 text-sm text-white uppercase rounded-lg">Aplicar</button>
                            </div> */}

                            <div className="flex justify-between py-4 px-2 border-b">
                                <span className="font-semibold text-sm">Subtotal:</span>
                                <span className="font-semibold text-sm">{subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}</span>
                            </div>
                            
                            <div className="mt-4 text-right pb-4 px-2 flex gap-2 flex-wrap sm:block">
                                <a href="/" className="bg-gray-500 font-semibold hover:bg-gray-400 py-4 px-4 text-sm text-white uppercase rounded-lg block w-full text-center sm:inline-block sm:w-auto sm:mr-2">Continuar comprando</a>
                                <a href="/checkout" className="bg-green-700 font-semibold hover:bg-green-800 py-4 px-4 text-sm text-white uppercase rounded-lg block w-full text-center sm:inline-block sm:w-auto">Finalizar Compra</a>
                            </div>
                        </div>
                    </>): (
                    <>
                    <div className="flex flex-col mt-4">
                        <div className="border-b py-2 px-4">
                            <h3 className="font-semibold text-sm text-gray-600 uppercase">Seu carrinho está vazio.</h3>
                        </div>
                        
                        <div className="py-4 px-2">
                            <p className="text-gray-600 text-sm">Adicione produtos ao seu carrinho para continuar comprando.</p>
                            <a href="/" className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-2 px-4 text-sm text-white uppercase rounded-lg mt-4 inline-block">Ver Produtos</a>
                        </div>
                    </div>
                    </>)}
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default CartPage;