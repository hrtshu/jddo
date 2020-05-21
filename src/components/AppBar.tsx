import { CircularProgress, AppBar as MuiAppBar, AppBarProps as MuiAppBarProps, Toolbar, IconButton, Typography, makeStyles, createStyles, Theme } from '@material-ui/core'
import { Menu as MenuIcon, Done as DoneIcon } from '@material-ui/icons'

export type AppBarProps = {
  loading: boolean
} & MuiAppBarProps

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
)

export const AppBar = (props: AppBarProps) => {
  const { loading, ...otherProps } = props
  const classes = useStyles()

  return (
    <MuiAppBar {...otherProps} >
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="secondary" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title} color="secondary">
          JDDO
        </Typography>
        { loading ? <CircularProgress size={30} color="secondary" /> : <DoneIcon color="secondary" /> }
      </Toolbar>
    </MuiAppBar>
  )
}

export default AppBar