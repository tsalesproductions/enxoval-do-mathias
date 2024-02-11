"use client"

import { useEffect, useState } from 'react'


export default function DetailsProduct(){
    return (
        <>
            <div className="details-product">
                <div className="overlay"></div>
                <div className="data">
                    <div className="close absolute right-5 top-5">x</div>
                    <div className="images">
                    <img src="https://blog.singularbaby.com.br/wp-content/uploads/2022/05/como-fazer-a-Check-list-enxoval-bebe-scaled.jpg"/>
                    </div>

                    <div className="details">
                        <h4 className="name text-3xl mb-5">Dragozinho</h4>
                        <p className="description text-base-300 text-sm lg:text-base mb-5">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus beatae autem deserunt natus. Ea, consequuntur quam, ad, soluta pariatur maiores vitae porro id nostrum dolores laboriosam atque quaerat repudiandae. Architecto.
                            <br/>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam reiciendis placeat impedit ut nemo laudantium, cumque atque? Rerum quia perspiciatis magni? Ipsum consequatur consequuntur exercitationem alias repellendus odio pariatur et?
                        </p>
                        <div className="cta">
                            <input type="number" name="qtd" id="qtd" min={1} className='border-2 border-teal-300 text-center text-2xl outline-none' />
                            <button type="button" className='bg-teal-300 text-white py-2 hover:bg-teal-400'>Adicionar a sacola</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}