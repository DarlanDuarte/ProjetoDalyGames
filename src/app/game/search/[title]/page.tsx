import { GameCard } from "../../../../components/GameCard"
import { Container } from "../../../../components/container"
import { Input } from "../../../../components/input"
import { IGameProps } from "../../../../utils/interface/game"


async function getData(title: string){

  try{
    const url = `https://sujeitoprogramador.com`

    const decodeTitle = decodeURI(title)
    console.log(title, '=>', decodeTitle)

    const res = await fetch(`${url}/next-api/?api=game&title=${title}`)

    return res.json()
  }catch(e){
    return null
  } 

}



export default async function Search(
  {params: {title}}: {params: {title: string}}
){

  const games: IGameProps[] = await getData(title)

  return(
    <main className={`w-full text-black`}>
      <Container>
        <Input />

        {!games && (
          <p>Esse jogo não foi encontrado...</p>
        )}

        <section className={` grid gap-7 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
          `}>
            {games && games.map((item, index) =>(
              <GameCard key={item.id} data={item} />
            ))}
        </section>

        <h1 className={`font-bold text-lg mt-8 mb-5`}>Veja o que encontramos na nossa base:</h1>
      </Container>
    </main>
  )
}