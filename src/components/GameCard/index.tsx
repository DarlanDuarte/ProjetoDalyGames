import { IGameCardProps } from "../../utils/interface/game";
import Image from "next/image";
import Link from "next/link";
import {BiRightArrowCircle} from 'react-icons/bi'







export function GameCard({data}: IGameCardProps){


  return (
    <Link href={`/game/${data.id}`}>
      <section className={`w-full bg-slate-200 rounded-lg p-4 mb-5`}>

        <div className={`w-full h-56 relative`}>
          <Image className={`rounded-lg object-cover hover:scale-105 transition-all duration-300`} 
            src={data.image_url}
            alt={data.title}
            fill={true}
            quality={100}
            sizes={`(max-width: 768px) 100vw, (max-width: 1200px) 44vw`}
          />
        </div>

        <div className={`flex items-center justify-between mt-4`}>
          <p className={`text-sm font-bold px-4 text-black 
            truncate text-ellipsis whitespace-nowrap overflow-hidden
            `
          }>{data.title}</p>
          <BiRightArrowCircle size={24} color="#000" />
        </div>

      </section>
    </Link>

  )

}