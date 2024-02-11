"use client";

interface productInfo{
    product: string;
}


const producstInCart = [];

export default function MiniCart(){
    function toggleMiniCart(hide = false){
        document.querySelector(".mini-cart")?.classList.toggle("open");
        document.body.classList.toggle("overflow-hidden")
        
    }

    return(
        <div className={`mini-cart`}>
            <div className="overlay cursor-pointer" onClick={() => toggleMiniCart()}></div>
            <div className="content">
                <div className='text-lg border-b'>Meu carrinho</div>
                <span className="close cursor-pointer" onClick={() => toggleMiniCart()}>X</span>
                
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