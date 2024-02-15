import Image from "next/image"
import Link from "next/link"

export default function Footer(){
    return (
        <footer className="text-center p-2 flex items-center justify-center text-stone-500">
            Enxoval do Mathias &copy; 2024 - 
                <Link
                href={"https://github.com/tsalesproductions/enxoval-do-mathias"} target="_blank" className="ml-1 flex gap-2 underline">
                    <Image 
                        src="/github.svg"
                        alt='Available on github'
                        width={18}
                        height={18}
                        className='m-auto'
                        />
                     Available on github
                </Link>
        </footer>
    )
}