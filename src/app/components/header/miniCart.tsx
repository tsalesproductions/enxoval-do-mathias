"use client";

import { useState, useEffect } from "react";

import storage from "../storage/storage";

interface productInfo{
    product: string;
}


const producstInCart = [];

export default function MiniCart(){

    function toggleMiniCart(hide = false){
        document.querySelector(".mini-cart")?.classList.toggle("open");
        document.body.classList.toggle("overflow-hidden")
        
    }

    const [productsInCart, setProductsInCart] = useState<any[]>(storage().get());

    useEffect(() => {
        // Função para lidar com o evento de atualização do carrinho
        const handleCartUpdate = (event: Event) => {
            const customEvent = event as CustomEvent;
            if (customEvent.detail) {
                const products = customEvent.detail.cartData;
                setProductsInCart(products); // Adiciona o novo produto ao carrinho

                document.body.classList.remove("overflow-hidden")
                const a = document.querySelector(".cart .qtd") as HTMLElement | null;
                const b = document.querySelector(".details-product .data .close") as HTMLElement | null;
                if (a && b) {
                    const element = document.querySelector(".cart .qtd>span");
                    if (element) {
                        element.innerHTML = String(products.length);
                    }

                    b.click();
                    setTimeout(() => a.click(), 200)
                }
            }
        };

        // Registrar o ouvinte do evento quando o componente é montado
        window.addEventListener('cartUpdated', handleCartUpdate);

        // Remover o ouvinte do evento quando o componente é desmontado
        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, [productsInCart]);

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

            setProductsInCart(storageData);
        }
    }

    return(
        <div className={`mini-cart`}>
            <div className="overlay cursor-pointer" onClick={() => toggleMiniCart()}></div>
            <div className="content">
                <div className='text-lg border-b'>Meu carrinho</div>
                <span className="close cursor-pointer" onClick={() => toggleMiniCart()}>X</span>
                
                <div className={`products ${producstInCart.length == 0 ? "without-products" : "empty"}`}>
                    {
                        productsInCart.map((product, index) => (
                            <div className="product" key={index}>
                                <img src={product.image} alt={product.name} />
                                <div className="details">
                                    <h4 className="name">{product.name}</h4>
                                    <p>Quantidade: {product.quantity}</p>
                                </div>
                                <button className="remover" onClick={() => handleRemoveItem(product.name)}>X</button>
                            </div>
                        ))
                    }
                </div>
                <div className="actions">
                    {productsInCart.length > 0 ? (
                    <button className="finish">Finalizar pedido</button>
                    ) : ""}
                    <button className="continue">Continuar comprando</button>
                </div>
            </div>
        </div>
    )
}