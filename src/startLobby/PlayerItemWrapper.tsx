import { cloneDeep } from "lodash";
import { selectColors } from "../features/start/gameSlice";
import { HandleChangePlayerInfoProps, PlayerItemWrapperProps, RacesListProps } from "../interfaces";
import { useAppSelector } from "../redux/reduxHooks";
import unitsData from "../units.json"
import PlayerItem from "./PlayerItem";

const PlayerItemWrapper = (props: PlayerItemWrapperProps) => {
  const { index, playersInfo, changePlayerInfo, deletePlayerInfo } = props
  const racesList: RacesListProps = unitsData.map(race => ({id: race.id, name: race.race}))
  const colors: string[] = useAppSelector(selectColors)
  racesList.unshift({id: "rand", name: "Random"})

  const handleChange = (props: HandleChangePlayerInfoProps) => {
    const { race, color } = props
    const newPlayerInfo = cloneDeep(playersInfo[index])
    color && (newPlayerInfo.color = color)
    race && (newPlayerInfo.raceId = race)
    changePlayerInfo(newPlayerInfo)
  }

  const handleDelete = () => deletePlayerInfo(index)

  return (
  <PlayerItem
    playerInfo={playersInfo[index]}
    racesList={racesList}
    handleChange={handleChange}
    colors={colors}
    handleDelete={handleDelete}
    index={index}/>
  )
}

export default PlayerItemWrapper