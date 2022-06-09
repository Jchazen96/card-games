import { useEffect, useState } from 'react'


const War = () => {

    const [deckId, setDeckId] = useState('')
    const [player1Deck, setPlayer1Deck] = useState([])
    const [player2Deck, setPlayer2Deck] = useState([])
    const [player1CurrentCard, setPlayer1CurrentCard] = useState({cards: [{image: ''}]})
    const [player2CurrentCard, setPlayer2CurrentCard] = useState({cards: [{image: ''}]})

    useEffect(()=>{
        (async()=>{
            let req = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            let res = await req.json()
            setDeckId(res.deck_id)
        })()
    },[])


    const splitDeck = async() => {
        let req = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=26`)
        let res = await req.json()
        setPlayer1Deck(res)
        let req2 = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=26`)
        let res2 = await req2.json()
        setPlayer2Deck(res2)
        console.log('Deck was split')
    }
    
    const addCardToPile = async () => {
        let player1Codes = player1Deck.cards.map((element)=>{return(element.code)})
        let player2Codes = player2Deck.cards.map((element)=>{return(element.code)})
        player1Codes = player1Codes.join()
        player2Codes = player2Codes.join()
        let req =  await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/pile/player1/add/?cards=${player1Codes}`)
        let res =  await req.json()
        let req2 =  await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/pile/player2/add/?cards=${player2Codes}`)
        let res2 =  await req2.json()
        console.log(deckId)
    }
    
    const battle = async () => {
        let req = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/pile/player1/draw/?count=1`)
        let res = await req.json()
        let req2 = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/pile/player2/draw/?count=1`)
        let res2 = await req2.json()
        setPlayer1CurrentCard(res)
        setPlayer2CurrentCard(res2)
    }
    console.log('p1', player1CurrentCard)
    console.log('p2', player2CurrentCard)
    
    let player1CurrentImage = player1CurrentCard ? player1CurrentCard.cards[0].image : null
    let player2CurrentImage = player2CurrentCard ? player2CurrentCard.cards[0].image : null

    const log = () => {
        console.log(player1CurrentCard.cards[0].image)
        console.log(player2CurrentCard)
    }

    return(
        <div>
            <h1>War</h1>
            <button onClick={splitDeck}>Split Deck</button>
            <button onClick={addCardToPile}>Add to Pile</button>
            <button onClick={battle}>Battle</button> <br />
            <button onClick={log}>Log</button> 
            {
                player1CurrentImage ? <img src={player1CurrentImage} /> : null
            }{
            player2CurrentImage ? <img src={player2CurrentImage} /> : null
            }
        </div>
    )
}

export default War;