
require('dotenv').config()
const instaTouch = require('instatouch')
const fs = require('fs')

async function pegaTodosParticipantes() {
    try {
        const options = {             
            count: 200,
            session: 'id',
        }
        const likers = await instaTouch.likers('id', options)
        return likers.collector
    } catch (error) {
        console.log(error)
    }
}

function escolheVencedor(participantes) {
    const todosParticipantes = participantes.length
    const bilheteEscolhido = Math.floor(Math.random() * todosParticipantes)
    const vencedorEscolhido = participantes[bilheteEscolhido]
    return vencedorEscolhido
}

function pegaVencedor(vencedor) {
    fs.writeFile('GanhadorDoSorteio.json', 
    JSON.stringify(vencedor, null, 2), 
    function (error) {
        if (error) console.log(error)
    })
}

async function final() {
    const participantes = await pegaTodosParticipantes()
    const resultado = escolheVencedor(participantes)
    pegaVencedor(resultado)
}

final()