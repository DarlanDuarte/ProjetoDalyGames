import { redirect } from "next/navigation"
import { IGameProps } from "../../../utils/interface/game"
import Image from "next/image"
import { Container } from "../../../components/container"
import { Label } from "../../../components/label"
import { GameCard } from "../../../components/GameCard"
import { Metadata } from "next"


const url = `https://sujeitoprogramador.com`



export async function generateMetaData({params : {id}}: {params: {id:string}}): Promise<Metadata>{
  try{

    const response: IGameProps = await fetch(`${url}/next-api/?api=game&id=${id}`, {next: {revalidate: 60}})
    .then((res) => res.json())
    .catch(() =>{
      return {
        title: "DalyGames - Descubra jogos incriveis para se divertir"
      }
    })


    return {
      title: response.title,
      description: `${response.description.slice(0, 100)}...`,
      openGraph: {
        title: response.title,
        images: [response.image_url]
      },
      robots:{
        index: true,
        follow: true,
        nocache: true,
        googleBot:{
          index: true,
          follow:true,
          noimageindex: true
        }
      }
    }




  }catch(error){
    return {
      title: "DalyGames - Descubra jogos incriveis para se divertir"
    }
  }
}



async function getData(id: string){
  try{

    const res = await fetch(`${url}/next-api/?api=game&id=${id}`, {next: {revalidate: 60}})

    return res.json()

  }catch(error){
    throw new Error(`Failed to fetch data`)
  }
}

async function getGameSorted(){
  try{

    const res = await fetch(`${url}/next-api/?api=game_day`, {cache: 'no-cache'})

    return res.json()

  }catch(error){
    throw new Error(`Failed to fetch data`)
  }
}


export default async function Game({params: {id}}: {params: {id: string}}){
  const data: IGameProps = await getData(id)
  const sortedGame: IGameProps = await getGameSorted()
  /* const getMetaDados = await generateMetaData({id}) */

  if(!data){
    redirect('/')
  }

  return(
    <main className={`w-full text-black`}>
      <div className={`bg-black h-80 sm:h-96 w-full relative`}>
        <Image className={`object-cover h-80 sm:h-96 opacity-75`}
        src={data.image_url} 
        alt={data.title} 
        fill={true} 
        priority={true} 
        quality={100} 
        sizes={`(max-width: 768px) 100vw, (max-width: 1200px) 44vw`} />
      </div>

      <Container>
        <h1 className={`font-bold text-lg my-4`}>{data.title}</h1>
        <p>{data.description}</p>

        <h2 className={`font-bold text-lg mt-7 mb-2`}>Plataformas disponíveis</h2>
        <div className={`flex gap-2 flex-wrap`}>
          {data.platforms.map((item, index) =>(
            <Label key={item} name={item} />
          ))}
        </div>


        <h2 className={`font-bold text-lg mt-7 mb-2`}>Categorias</h2>
        <div className={`flex gap-2 flex-wrap`}>
          {data.categories.map((item, index) =>(
            <Label key={item} name={item} />
          ))}
        </div>

        <p className={`mt-7 mb-2`}><strong>Data de Lançamento</strong> {data.release} </p>

        <h2 className={`font-bold text-lg mt-7 mb-2`}> Jogo Recomendado</h2>
        <div className={`flex`}>
          <div className={`flex-grow`}>
            <GameCard data={sortedGame}/>
          </div>
        </div>

      </Container>

    </main>
  )
}