# Back end

## Entidades

### Game

id
title
banner Url

<!-- CDN (Content delivery Network) vai servir os arquivos de imagens a serem utilizadas  EX - EC2  -->

### Ad

id
gameID
name
yearsPlaying
discord
weekdays
hourStart
hourEnd
useVoiceChannel 
createdAt

## Casos de uso

listagem de games con contagem de ad
criação de um novo ad
listagem de ad por game 
busca discord pelo id do ad



//  HTPP method / API RESTFUL / HTTP code
// Get, Post - Serve para criação, Patch - é uma edição mais ninchada e especifica, Put, Delete

// Tipos de parametros - localhost:2222/ads?page=1
// Parametros da url
// Query params -  parametros nomeados usado para odenaçção, pagina, etc
// Route params - usa identificador na propria url,  identificação de um recurso na api
// Body params - envia um conjunto de informações em uma unica requisição - usado em formulários