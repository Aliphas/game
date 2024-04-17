import useNextTurn from "./nexTurn"

const useEnemyTurn = () => {
  const endTurn: () => void = useNextTurn()

  const enemyTurn = () => {
    endTurn()
  }
  return enemyTurn

}

export default useEnemyTurn