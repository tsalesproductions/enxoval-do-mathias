"use client";

interface productInfo{
    product: string;
}


const producstInCart = [];

export default function MiniCart(){
    function toggleMIniCart(){
        document.querySelector(".mini-cart")?.classList.toggle("open");
    }

    return(
        <div className={`mini-cart`}>
            <div className="overlay" onClick={() => toggleMIniCart()}></div>
            <div className="content">
                <div className='text-lg border-b'>Meu carrinho</div>
                <span className="close cursor-pointer" onClick={() => toggleMIniCart()}>X</span>
                
                <div className={`products ${producstInCart.length == 0 ? "without-products" : ""}`}>
                    
                </div>
                <div className="actions">
                    <button className="finish">Finalizar pedido</button>
                    <button className="continue">Continuar comprando</button>
                </div>
            </div>
        </div>
    )
}