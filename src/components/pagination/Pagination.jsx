import { Typography, Button } from "@mui/material"

import useStyles from './styles'

const Pagination = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Button className={classes.button} variant='contained' color='primary' type='button' size="small">Prev</Button>
      <Typography variant='h5' className={classes.pageNumber}>1</Typography>
      <Button className={classes.button} variant='contained' color='primary' type='button' size="small">Next</Button>
    </div>
  )
}

export default Pagination
