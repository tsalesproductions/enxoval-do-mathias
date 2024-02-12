"use client";

import { useState, useEffect } from "react";

import storage from "../storage/storage";

interface productInfo{
    product: string;
}

export default function MiniCart(){

    function toggleMiniCart(hide = false){
        document.querySelector(".mini-cart")?.classList.toggle("open");
        document.body.classList.toggle("overflow-hidden")
        
    }

    function getSubtotal(items : any){
        let total = 0;

        for (let i = 0; i < items.length; i++) {
            total += items[i].price * items[i].quantity;
        }

        return total;
    }

    const [productsInCart, setProductsInCart] = useState<any[]>(storage().get());
    const [subTotalCart, setSubTotalCart] = useState<number>(getSubtotal(storage().get()));

    useEffect(() => {
        // Função para lidar com o evento de atualização do carrinho
        const handleCartUpdate = (event: Event) => {
            const customEvent = event as CustomEvent;
            if (customEvent.detail) {
                const products = customEvent.detail.cartData;
                setProductsInCart(products); // Adiciona o novo produto ao carrinho
                setSubTotalCart(getSubtotal(products));

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
            setSubTotalCart(getSubtotal(storageData));
        }
    }
    
    return(
        <div className={`mini-cart`}>
            <div className="overlay cursor-pointer" onClick={() => toggleMiniCart()}></div>
            <div className="content">
                <div className='text-lg border-b'>Meu carrinho</div>
                <span className="close cursor-pointer" onClick={() => toggleMiniCart()}>X</span>
                
                <div className={`products ${productsInCart.length == 0 ? "without-products" : "empty"}`}>
                    {
                        productsInCart.map((product, index) => (
                            <div className="product" key={index}>
                                <img src={product.image} alt={product.name} />
                                <div className="details">
                                    <h4 className="name font-semibold">{product.name}</h4>
                                    <p className="text-xs">Quantidade: {product.quantity}</p>
                                    <p className="font-semibold text-sm">{product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}</p>
                                </div>
                                <button className="remover" onClick={() => handleRemoveItem(product.name)}>X</button>
                            </div>
                        ))
                    }
                </div>
                <div className="actions">
                    <div className="subtotal text-center mb-2"><small>Subtotal:</small> <span>{subTotalCart.toLocaleString("pt-BR", { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}</span></div>
                    <button className="continue" onClick={() => toggleMiniCart()}>Continuar comprando</button>
                    {productsInCart.length > 0 ? (
                    <button className="finish">Finalizar pedido</button>
                    ) : ""}
                </div>
            </div>
        </div>
    )
}