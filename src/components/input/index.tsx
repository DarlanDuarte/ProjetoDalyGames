"use client"


import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"
import {FiSearch} from 'react-icons/fi'


export function Input(){
  const [input, setInput] = useState("")
  const router = useRouter()

  async function handleSearch(e: FormEvent){
    e.preventDefault()

    if(input === '')return;

    router.push(`/game/search/${input}`)

  }

  return(
    <form onSubmit={handleSearch} className={`w-full bg-slate-200 gap-2 flex justify-between items-center my-5 rounded-lg p-2`} >
      <input className={`bg-slate-200 outline-none w-11/12`}
        type="text" 
        placeholder="Procurando algum jogo..."
        value={input}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
      />
      <button type="submit">
        <FiSearch size={24} color="#ea580c" />
      </button>
    </form>
  )
}