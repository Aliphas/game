import styles from "./leftBarUnit.module.css"
import { LeftBarUnitProps } from "../interfaces"
import { Box, Button, Tooltip, tooltipClasses, TooltipProps } from "@mui/material"
import { styled } from '@mui/material/styles';
import React from "react";

const LeftBarUnit = (props: LeftBarUnitProps) => {
  const { unit, tile, isActivePlayer, buyUnit, gold, playerIndex, color } = props
  const handleClick = (count: number) => {
    buyUnit({ count, unitId: unit.id, tile, gold })
  }
  return <div className={styles.leftBarUnit}>
    <HtmlTooltip title={
      <React.Fragment>
        <h3>{unit.name}</h3>
        <div>
          <p>Attack: {unit.attack}</p>
          <p>Armor: {unit.armor}</p>
          <p>HP: {unit.hp}</p>
          <p>Cost: {unit.cost}</p>
          <p>Power: {unit.power}</p>
        </div>
      </React.Fragment>
    }>
      <Box
        className={styles.unitBox}
        sx={{ bgcolor: color, color: 'background.paper', p: 1, border: `1px solid ${color}` }}
      >
        {unit && `${unit.name}: ${unit.count}`}
        {tile.building === "castle" && playerIndex === 0 && isActivePlayer &&
          <div className={styles.buttons}>
            <Button className={styles.plusButton}
              sx={{
                backgroundColor: "black",
                color: "white",
                minWidth: "0px",
                outline: "1px solid black",
                '&:hover': {
                  backgroundColor: tile.owner.color
                }
              }}
              onClick={() => handleClick(1)}>+</Button>
            <Button className={styles.plusButton} sx={{
              backgroundColor: "black",
              color: "white",
              minWidth: "0px",
              outline: "1px solid black",
              '&:hover': {
                backgroundColor: tile.owner.color
              }
            }}
              onClick={() => handleClick(10)}>+10</Button>
          </div>
        }

      </Box>
    </HtmlTooltip>
  </div>
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} placement="bottom-start" followCursor />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    backgroundColor: '#404040',
    borderRadius: '5px',
    outline: '2px solid #f7912b',
    color: '#f7912b'
  },
  [`& .${tooltipClasses.tooltip} h3`]: {
    borderBottom: '1px solid black',
    margin: "10px 0"
  },
  [`& .${tooltipClasses.tooltip} .descr`]: {
    borderBottom: '1px solid black'
  },
}));

export default LeftBarUnit