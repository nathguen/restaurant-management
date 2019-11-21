import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import clsx from 'clsx';
import React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { mainListItems, secondaryListItems } from './components/list-items';
// import Chart from './Chart';
// import Deposits from './Deposits';
import Orders from './components/orders';
import Inventory from './components/inventory';
import { RootState } from './reducers';
import { getOrders } from './reducers/orders';
import { getRecipesState, RecipesState } from './reducers/recipes';
import { Order } from './types';
import { fetchOrders } from './redux/orders';
import { fetchRecipes, setRecipes } from './redux/recipes';
import { Dispatch } from 'redux';
import { fetchItems } from './redux/items';
import { ItemsState, getItemsState } from './reducers/items';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

interface DashboardProps extends 
  DashboardStateProps,
  DashboardDispatchProps {
}

function Dashboard(props: DashboardProps) {

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [ordersFetched, setOrdersFetched] = React.useState(false);
  const [recipesFetched, setRecipesFetched] = React.useState(false);
  const [itemsFetched, setItemsFetched] = React.useState(false);

  if (!ordersFetched) {
    props.fetchOrders();
    setOrdersFetched(true);
  }

  if (!recipesFetched) {
    props.fetchRecipes();
    setRecipesFetched(true);
  }

  if (!itemsFetched) {
    props.fetchItems();
    setItemsFetched(true);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer> */}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>

            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders orders={props.orders} recipes={props.recipes} items={props.items} />
              </Paper>

              <Paper className={classes.paper}>
                <Inventory items={props.items} />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

interface DashboardStateProps {
  orders: Order[]
  recipes: RecipesState
  items: ItemsState
}

function mapStateToProps(state: RootState): DashboardStateProps {
  return {
    orders: getOrders(state),
    recipes: getRecipesState(state),
    items: getItemsState(state)
  };
}

interface DashboardDispatchProps {
  fetchOrders: () => void
  fetchRecipes: () => void
  fetchItems: () => void
}

function mapDispatchToProps(dispatch: any): DashboardDispatchProps {
  return {
    fetchOrders: () => dispatch(fetchOrders()),
    fetchRecipes: () => dispatch(fetchRecipes()),
    fetchItems: () => dispatch(fetchItems())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);