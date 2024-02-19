import Image from "next/image"
import Link from "next/link"

import {info} from '../../database.json';

export default function Footer(){
    return (
        <footer className="text-center p-2 flex items-center justify-center text-stone-500 flex-wrap">
            {info.title} &copy; 2024 - 
                <Link
                href={"https://github.com/tsalesproductions/lista-do-mathias/"} target="_blank" className="ml-1 flex gap-2 underline">
                    <Image 
                        src="/github.svg"
                        alt='Projeto disponível para download no github'
                        width={18}
                        height={18}
                        className='m-auto'
                        />
                     Available on github
                </Link>
        </footer>
    )
}