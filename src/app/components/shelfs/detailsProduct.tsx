"use client"

import React, { useEffect, useState } from 'react';

import {products} from '../../database.json';

interface DetailsProductProps {
    productName: string; // Recebe o nome do produto como propriedade
}

interface product{
    name: string;
    description: string;
    priority: number;
    image: string;
    pricing: string;
    link_purchase: string;
}

export default function DetailsProduct({ productName }: DetailsProductProps) {
    const [ menuActive, setMenuState ] = useState(false);
    const [productData, setProductData] = useState<product | null>(null);

    if(typeof document !== 'undefined'){
        if(menuActive){
            document.body.classList.add("overflow-hidden")
        }else{
            document.body.classList.remove("overflow-hidden")
        }
    }

    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-product') {
                    const targetNode = mutation.target as HTMLElement;
                    const productValue = targetNode.dataset.product;

                    if(productValue){
                        const data = products.find(p=> p.name == productValue);
                        if(data){
                            setProductData(data);
                            setMenuState(true);
                        }
                    }
                }
            });
        });

        const targetNode = document.querySelector('.details-product');
        if (targetNode) {
            observer.observe(targetNode, { attributes: true });
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <div className={`details-product ${menuActive ? "open" : ""}`} data-product>
                <div className="overlay cursor-pointer" onClick={() => setMenuState(!menuActive)}></div>
                <div className="data">
                    <div className="close absolute right-5 top-5 cursor-pointer" onClick={() => setMenuState(!menuActive)}>x</div>
                    {productData ? (
                    <>
                    <div className="images">
                            <img src={productData.image}/>
                        </div>

                        <div className="details">
                            <h4 className="name text-3xl mb-5">{productData.name}</h4>
                            <p className="description text-base-300 text-sm lg:text-base mb-5">
                                {productData.description}
                            </p>
                            <div className="text-accent text-base lg:text-xl mb-5">{productData.pricing}</div>
                            <div className="cta">
                                <input type="number" name="qtd" id="qtd" min={1} defaultValue={1} max={99} className='border-2 border-teal-300 text-center text-2xl outline-none' />
                                <button type="button" className='bg-teal-300 text-white py-2 hover:bg-teal-400'>Adicionar a sacola</button>
                            </div>
                        </div>
                    </>
                    ): ""}
                </div>
            </div>
        </>
    )
}