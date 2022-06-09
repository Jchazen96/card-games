import { useEffect, useState } from 'react'

const Blackjack = () => {

    const [deckId, setDeckId] = useState('')
    const [deck, setDeck] = useState([])

    useEffect(()=>{
        (async()=>{
            let req = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
            let res = await req.json()
            setDeckId(res.deck_id)
        })()
    },[])

    const draw1 = async () => {
        let req = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        let res = await req.json()
        console.log(res)
    }

    console.log(deckId)
    return(
        <div>
            <h1>testing blackjack</h1>
            <button onClick={draw1}>Draw 1</button>
        </div>
    )
}

export default Blackjack;