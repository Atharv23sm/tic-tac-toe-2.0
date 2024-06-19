import { useState } from 'react'

function App() {

  const [turnX, setTurnX] = useState(true)
  const [isClicked, setIsClicked] = useState(Array(9).fill(false))
  const [arr, setArr] = useState(Array(9).fill(''))
  const [winMessage, setWinMessage] = useState(null)
  const [vanishPlaceX, setVanishPlaceX] = useState([])
  const [vanishPlaceO, setVanishPlaceO] = useState([])

  const playerMove = (symb, index) => {

    const temp_arr = [...arr]
    temp_arr[index] = symb

    const temp_arr2 = [...isClicked]
    temp_arr2[index] = true

    var countX = 0;
    for (var i = 0; i < 9; i++) {
      if (temp_arr[i] == 'X') {
        countX++;
      }
    }
    var vx = vanishPlaceX
    if (countX < 4 && turnX) {
      vx.push(index)
    }
    if (countX > 3 && turnX) {
      temp_arr[vx[0]] = ''
      temp_arr2[vx[0]] = false
      vx.shift()
      vx.push(index)
    }

    var countO = 0;
    for (var j = 0; j < 9; j++) {
      if (temp_arr[j] == 'O') {
        countO++;
      }
    }
    var vo = vanishPlaceO
    if (countO < 4 && !turnX) {
      vo.push(index)
    }
    if (countO > 3 && !turnX) {
      temp_arr[vo[0]] = ''
      temp_arr2[vo[0]] = false
      vo.shift()
      vo.push(index)
    }

    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let line of lines) {
      const [a, b, c] = line;

      if (temp_arr[a] === 'X' && temp_arr[b] === 'X' && temp_arr[c] === 'X') {
        setWinMessage('Player X win.')
      }
      if (temp_arr[a] === 'O' && temp_arr[b] === 'O' && temp_arr[c] === 'O') {
        setWinMessage('Player O win.')
      }
    }

    if (!temp_arr.includes('')) {
      setWinMessage('Draw.')
    }

    setVanishPlaceX(vx)
    setVanishPlaceO(vo)

    setArr(temp_arr)
    setIsClicked(temp_arr2)

    setTurnX(!turnX)
  }

  return (
    <div className='w-full h-screen flex justify-center items-center font-[outfit]'>

      <div className='bg-[#000] grid grid-cols-3 gap-4 p-10 border-[1px] border-[#0f8] hover:shadow-[0_0_20px_#0f8] duration-500'>
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => {
            return (
              <div className={`w-[20vw] h-[20vw] md:w-[10vw] md:h-[10vw] bg-[#333]
              ${vanishPlaceO.length == 3 && vanishPlaceO[0] === index || vanishPlaceX.length == 3 && vanishPlaceX[0] === index ? 'bg-[#a33]' : null}
              flex justify-center items-center text-[12vw] md:text-[10vw] hover:bg-[#0f8] duration-300`}
                onClick={() => {
                  if (!isClicked[index]) {
                    var symb =  turnX ? 'X' : 'O'
                    playerMove(symb, index)
                  }
                }}>{arr[index]}</div>
            )
          })
        }
      </div>
      {winMessage ?
        <div className='w-full h-screen absolute backdrop-blur-sm flex justify-center items-center'>
          <div className='w-max shadow-[0_0_200px_#0f8] text-[20px] p-9 bg-[#222] flex flex-col justify-center items-center gap-10'>
            <div>{winMessage}</div>
            <div className='p-3 bg-[#0f8] text-black'
              onClick={() => {
                setWinMessage(null)
                setArr(Array(9).fill(''))
                setIsClicked(Array(9).fill(false))
                setTurnX(true)
                setVanishPlaceO([])
                setVanishPlaceX([])
              }}>New Game</div>
          </div>
        </div>
        : null
      }
    </div>
  )
}

export default App

