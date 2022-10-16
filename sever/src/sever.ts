import express from "express";
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from "./utils/convert-hours-string-to-minutes";
import { convertMinutesToHoursString } from "./utils/convert-minutes-to-hours-string";

const app = express();

const prisma = new PrismaClient({
    log: ['query']
});

app.use(express.json());
app.use(cors());

app.get('/games', async (request, response) => {
    // metodo assincrono/ Ta procurando todos os jogos (joins) e vai selecionar eles
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select:{
                    ads: true,
                }
            }
        }
    });


    return response.json(games);
});

app.post('/games/:id/ads', async (request, response) => { //Sempre que for criar o ad precisa passar o id
    const gameId = request.params.id;
    const body = request.body;



    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel
        },
    });

    return response.status(201).json(ad);
})


// Rota de listagem de anuncio
app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({ 
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        }, 
        where: { 
            gameId 
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    
    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHoursString(ad.hourStart),
            hourEnd: convertMinutesToHoursString(ad.hourEnd),
        }
    }));
})

app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id;
    
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId,
        }
    })

    return response.json({
        discord: ad.discord
    });
})





app.listen(3333, () => {
    console.log('Sever on');
    console.log('PORT: http://localhost:3333/games');
});

























