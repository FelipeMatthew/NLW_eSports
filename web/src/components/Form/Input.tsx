import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{} 
// Vai puxar todas as propriedades que o input tem

export function Input(Props : InputProps){
    return (
        <input 
            {...Props}
            className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
        />
        )
}