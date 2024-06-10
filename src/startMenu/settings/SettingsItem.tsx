import { TextField, Button } from "@mui/material"
import { SettingsItemProps } from "../../interfaces"
import styles from "./settings.module.css"

const SettingsItem = (props: SettingsItemProps) => {
  const { isField, setIsField, itemname, handleChange, handleConfirm, value } = props
  return <div className={styles.item}>
    <div className={styles.itemField}>
      {isField ?
        <TextField variant="outlined" defaultValue={value} onChange={handleChange} />
        : <div className={styles.itemValue}>{itemname}: <b>{value}</b></div>
      }
    </div>
    <div className={styles.itemButton}>
      {isField ?
        <Button variant="contained" onClick={handleConfirm}>OK</Button>
        : <Button variant="contained" onClick={() => setIsField(true)}>
          Change name
        </Button>
      }
    </div>
  </div>
}

export default SettingsItem