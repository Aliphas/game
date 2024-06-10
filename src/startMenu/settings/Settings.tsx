import { SettingsProps } from "../../interfaces"
import styles from "./settings.module.css"
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import SettingsItem from "./SettingsItem";

const Settings = (props: SettingsProps) => {
  const { handleExit, isNameField, setIsNameField, handleChangeName, handleConfirmName, name,
    isTileSizeField, setIsTileSizeField, handleChangeTileSize, handleConfirmTileSize, tileSize } = props

  return <div className={styles.settings}>
    <ArrowBackOutlinedIcon className={styles.backArrowIcon}
      sx={{
        width: "50px",
        height: "auto"
      }}
      onClick={handleExit}
    />
    <SettingsItem
      isField={isNameField}
      setIsField={setIsNameField}
      itemname="Username"
      handleChange={handleChangeName}
      handleConfirm={handleConfirmName}
      value={name}
    />
    <SettingsItem
      isField={isTileSizeField}
      setIsField={setIsTileSizeField}
      itemname="Tile size"
      handleChange={handleChangeTileSize}
      handleConfirm={handleConfirmTileSize}
      value={tileSize}
    />
  </div>
}

export default Settings