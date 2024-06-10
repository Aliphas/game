import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { AboutProps } from '../../interfaces';
import styles from './about.module.css'

const About = (props: AboutProps) => {
  const {handleExit} = props
  return <div>
    <ArrowBackOutlinedIcon className={styles.backArrowIcon}
      sx={{
        width: "50px",
        height: "auto"
      }}
      onClick={handleExit}
    />
  </div>
}

export default About