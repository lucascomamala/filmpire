import { useEffect, useState } from "react"
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from "@mui/material"
import { Menu, AccountCircle, Brightness4, Brightness7 } from "@mui/icons-material"
import { Link } from "react-router-dom"
import { useTheme } from "@mui/material/styles"
import { useDispatch, useSelector } from "react-redux"

import useStyles from "./styles"
import Sidebar from "../sidebar/Sidebar"
import Search from "../search/Search"
import { fetchToken, createSessionId, moviesAPI } from "../../utils"
import { setUser, userSelector } from "../../utils/auth"

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const classes = useStyles()
  const isMobile = useMediaQuery('(max-width: 1200px)')
  const theme = useTheme()
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector(userSelector)

  const token = localStorage.getItem("request_token")
  const sessionId = localStorage.getItem("session_id")

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionId) {
          const { data: userData } = await moviesAPI.get(`/account?session_id=${sessionId}`)

          dispatch(setUser(userData))
        } else {
          const newSessionId = await createSessionId()
          const { data: userData } = await moviesAPI.get(`/account?session_id=${newSessionId}`)

          dispatch(setUser(userData))
        }
      }
    }

    logInUser()
  }, [token])

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              style={{ outline: 'none' }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton
            color='inherit'
            sx={{ ml: 1 }}
            onClick={() => { }}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
                onClick={() => { }}
              >
                {!isMobile && <>My movies &nbsp;</>}
                <Avatar
                  alt="Profile"
                  style={{ width: 30, height: 30 }}
                  src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  )
}

export default Navbar