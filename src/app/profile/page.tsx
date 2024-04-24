import { Container } from "../../components/container";
import Image from "next/image";
import {FaShareAlt} from 'react-icons/fa'
import userImg from '/public/user.png'
import { FavoriteCard } from "./components/favorite";


export default async function Profile(){

  return(
    <main className={`w-full text-black`}>
      <Container>

        <section className={`mt-8 mb-6 flex flex-col items-center justify-between relative gap-3 sm:flex-row`}>
          <div className={`w-full flex flex-col items-center gap-4 text-lg sm:flex-row justify-center sm:justify-normal  `}>
            <Image className={`rounded-full h-56 w-56 object-cover`} 
              src={userImg} 
              alt="Imagem perfil do usuário"
            />
            <h1 className={`font-bold text-2xl`}>Programador</h1>
          </div>

          <div className="sm:absolute top-0 right-0 flex justify-center items-center gap-3 mt-2">
            <button className="bg-gray-700 px-4 py-3 rounded-lg text-white">Configurações</button>
            <button className="bg-gray-700 px-4 py-3 rounded-lg">
              <FaShareAlt size={24} color="#fff" />
            </button>
          </div>


        </section>


        <section className="flex flex-wrap gap-5 flex-col md:flex-row">
          <div className="flex-grow flex-wrap">
            <FavoriteCard />
          </div>

          <div className="flex-grow flex-wrap">
            <FavoriteCard />
          </div>

          <div className="flex-grow flex-wrap">
            <FavoriteCard />
          </div>

        </section>


      </Container>
    </main>
  )
}