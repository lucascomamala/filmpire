import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  moviesContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    overflow: "auto",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
  movie: {
    padding: '10px',
  },
  title: {
    color: theme.palette.text.primary,
    textOverflow: "ellipsis",
    width: '230px',
    overflow: "hidden",
    marginTop: '10px',
    marginBottom: 0,
    textAlign: "center",
  },
  links: {
    alignItems: 'center',
    fontWeight: 'bolder',
    textDecoration: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      flexDirection: 'column',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  image: {
    borderRadius: '20px',
    height: '300px',
    marginBottom: '10px',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
}));
