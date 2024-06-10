import useResetGame from "../actions/resetGame"
import { WinnerWrapperProps } from "../interfaces"
import Winner from "./Winner"

const WinnerWrapper = ({ winner }: WinnerWrapperProps) => {
    const resetGame: () => void = useResetGame()
    return <Winner winnerName={winner} resetGame={resetGame} />
  }

export default WinnerWrapper