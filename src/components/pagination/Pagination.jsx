import { Typography, Button } from "@mui/material"

import useStyles from './styles'

const Pagination = ({ currentPage, totalPages, setPage }) => {
  const classes = useStyles()

  const handlePrev = () => {
    if(currentPage === 1) return
    setPage((prevPage) => prevPage - 1)
  }
  
  const handleNext = () => {
    if(currentPage === totalPages) return
    setPage((prevPage) => prevPage + 1)
  }
  
  if(!totalPages || totalPages === 0) return null

  return (
    <div className={classes.container}>
      <Button onClick={handlePrev} className={classes.button} variant='contained' color='primary' type='button' size="small">Prev</Button>
      <Typography variant='h5' className={classes.pageNumber}>{currentPage}</Typography>
      <Button onClick={handleNext} className={classes.button} variant='contained' color='primary' type='button' size="small">Next</Button>
    </div>
  )
}

export default Pagination
