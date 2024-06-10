import { RacesList } from '../interfaces'
import unitsData from '../units.json'

const getRaceName = (id: string) => {
  const racesList: RacesList  = unitsData.map(race => ({id: race.id, name: race.race}))
  return racesList.find(race => race.id === id)?.name || "Neutral"
}

export default getRaceName