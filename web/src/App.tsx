import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import logoImg from './assets/logo-nlw-esports.svg'
import { CreateAdBanner } from './components/CreateAdBanner';
import { GameBanner } from './components/GameBanner'; 
import './styles/main.css';
import { CreateAdModal } from './components/CreateAdModal';


interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

// Default
function App() {

  const [games, setGames] = useState<Game[]>([]); // Essa var games é um array de objetos que tenha esse formato

  
  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => setGames(data))

  }, []) //Só vai rodar uma vez a aplicação na Api

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
        <img src={logoImg} alt="" />

        <h1 className='text-6xl text-white font-black mt-16'>
          Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
        </h1>

        <div className='grid grid-cols-6 gap-6 mt-16'>
          {games.map(game => {
            return (
              < GameBanner
                key={game.id} // Informações unicas de cada game
                title={game.title}
                bannerUrl={game.bannerUrl}
                adsCount={game._count.ads}
              />
            )
          })}

        </div>

        <Dialog.Root>
          < CreateAdBanner />
          <CreateAdModal />
        </Dialog.Root>    
      </div>
  )
}

export default App
