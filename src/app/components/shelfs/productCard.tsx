import Image from 'next/image';
import {products} from '../../database.json';

interface product{
    name: string;
    description: string;
    priority: 0;
    image: string;
    pricing: string;
    link_purchase: string;

}

interface shelfData{
    product: string;
    key: number;
}

export default function ProductCard({product, key}: shelfData){
    const data = products.find(p=> p.name == product);

    return (
        <div key={key} className={`product card card-compact group w-full text-start hover:bg-slate-100 hover:cursor-pointer border border-zinc-200`}>
            <img 
                src={data?.image}
                alt={data?.name}
                className={`w-full`}
            />

            <div className={`flex-auto flex flex-col p-2 gap-3 lg:gap-4`}>
                <div className="flex flex-col gap-0"><div className="truncate text-base lg:text-lg text-base-content">{data?.name}</div></div>
                <div className="flex flex-col gap-0">
                    <div className="flex flex-col gap-0 prices lg:flex-row lg:gap-2 justify-start">
                        <div className="text-accent text-base lg:text-xl price">{data?.pricing}</div>
                    </div>
                </div>
                <div className="flex flex-col gap-0">
                    <button className='bg-teal-300 text-white py-2 hover:bg-teal-400'>Ver detalhes</button>
                </div>
            </div>





        </div>
    )
}