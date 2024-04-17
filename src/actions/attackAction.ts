import { useDispatch } from 'react-redux';
import { cloneDeep } from 'lodash';
import { changeTileData } from '../features/map/mapSlice';
import { ActionProps, HitProps } from './../interfaces';
import { changePlayerActiveTile, changePlayerAlive, playerActionCounter } from '../features/players/playersSlice';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';

const useAttackAction = () => {
  const dispatch: Dispatch<UnknownAction> = useDispatch()

  const hit = (props: HitProps) => {
    const { attacker, targetArmy} = props
    let index = Math.floor(Math.random() * targetArmy.length)
    do{
      index = Math.floor(Math.random() * targetArmy.length)
    }while(targetArmy[index].count === 0 && (targetArmy.filter(unit => unit.count > 0).length > 0))
    const defender = targetArmy[index]
    const damage: number = Math.max((attacker.attack - defender.armor) * attacker.count, 0)

    defender.totalHP > 0 && (defender.totalHP = Math.max(defender.totalHP - damage, 0))
    defender.count = Math.ceil(defender.totalHP / defender.hp)
  }

  const attackAction = (props: ActionProps) => {
    const { activeTile, targetTile } = props
    const activeTileClone = cloneDeep(activeTile)
    const targetTileClone = cloneDeep(targetTile)
    let activeTileArmy = activeTileClone.army
    let targetTileArmy = targetTileClone.army

    targetTileArmy.filter(unit => unit.count > 0).length > 0 && activeTileArmy.filter(unit => unit.count > 0).map(unit => {
      hit({attacker: unit, targetArmy: targetTileArmy})
    })

    targetTileArmy.filter(unit => unit.count > 0).length > 0 &&  activeTileArmy.filter(unit => unit.count > 0).length > 0 
    && targetTileArmy.filter(unit => unit.count > 0).map(unit => {
      hit({attacker: unit, targetArmy: activeTileArmy})
    })
    
    targetTileClone.army.filter(unit => unit.count > 0).length === 0 && targetTile.building === "castle" 
      && dispatch(changePlayerAlive(targetTile.owner.id))

    targetTileClone.army.filter(unit => unit.count > 0).length === 0
    && (targetTileClone.owner = cloneDeep(activeTile.owner))
      && (targetTileClone.army = cloneDeep(activeTileClone.army))
      && (activeTileClone.army.map((_, index) => {
        activeTileClone.army[index].count = 0
      }))
      && (targetTileClone.building = "none")
      && dispatch(changePlayerActiveTile(targetTileClone.coords))
    dispatch(changeTileData(activeTileClone))
    dispatch(changeTileData(targetTileClone))
    dispatch(playerActionCounter())
  }

  return attackAction
}

export default useAttackAction