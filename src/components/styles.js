import { makeStyles } from "@mui/styles";

const drawerWidth = 240;

export default makeStyles((theme) => ({
  toolbar: {
    height: '80px',
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '240px',
    [theme.breakpoints.down('lg')]: {
      marginLeft: 0,
      flexWrap: 'wrap',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  linkButton: {
    '&hover': {
      color: 'white !important',
      textDecoration: 'none',
    }
  },
  imageLink: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10% 0',
  },
  image: {
    width: '70%',
  },
  links: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  genreImage: {
    filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'dark',
  },
  searchContainer: {
    [theme.breakpoints.down('lg')]: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
  },
  input: {
    color: theme.palette.mode === 'light' && 'black',
    filter: theme.palette.mode === 'light' && 'invert(1)',
    [theme.breakpoints.down('lg')]: {
      marginTop: '-10px',
      marginBottom: '10px',
    },
  },
}));
