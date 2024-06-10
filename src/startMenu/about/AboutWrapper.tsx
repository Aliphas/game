import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { pageChange } from "../../features/start/gameSlice"
import About from "./About"

const AboutWrapper = () => {
  const dispatch: Dispatch<UnknownAction> = useDispatch()
  const handleExit: () => void = () => {
    dispatch(pageChange("menu"))
  }
  return <About handleExit={handleExit}/>
}

export default AboutWrapper