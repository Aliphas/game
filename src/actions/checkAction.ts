import { selectActivePlayer } from './../features/players/playersSlice';
import { selectPlayerActionCount } from './../features/players/playersSlice';
import useMoveAction from './moveAction';
import useAttackAction from './attackAction';
import { ActionProps, CheckActionProps, PlayerProps } from '../interfaces';
import { useAppSelector } from '../redux/reduxHooks';
import { useState } from 'react';
import compareTiles from './compareTiles';

const useCheckAction = () => {
  const moveAction: (props: ActionProps) => void = useMoveAction()
  const attackAction: (props: ActionProps) => void = useAttackAction()
  const playerActionCount: number = useAppSelector(selectPlayerActionCount)
  const activePlayer: PlayerProps = useAppSelector(selectActivePlayer)
  const [isMoving, setIsMoving] = useState<boolean>(false)

  const handleAction = (props: CheckActionProps) => {
    const { activeTile, targetTile } = props
    compareTiles(activeTile, targetTile) && !isMoving && moving()
      && setTimeout(() => checkAction({ activeTile, targetTile }), 350)
    setTimeout(() => setIsMoving(false), 350)
  }
  const moving: () => boolean = () => {
    setIsMoving(true)
    return true
  }

  const checkAction = (props: CheckActionProps) => {
    const { activeTile, targetTile } = props
    playerActionCount > 0 && (activeTile && activeTile.owner.id === activePlayer.id
      && activeTile.army.filter(unit => unit.count > 0).length > 0
      && targetTile &&
      (activeTile.owner?.id === targetTile.owner?.id ?
        moveAction({ activeTile, targetTile })
        : attackAction({ activeTile, targetTile })
      ))
  }

  return handleAction
}

export default useCheckAction