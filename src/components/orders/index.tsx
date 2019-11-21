import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Order, Recipe, Item } from '../../types';
import { RecipesState } from '../../reducers/recipes';
import { Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';
import { ItemsState } from '../../reducers/items';
import Title from './orders-title';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
    }),
);

interface OrdersComponentProps {
    orders: Order[]
    recipes: RecipesState
    items: ItemsState
}

export default function OrdersComponent(props: OrdersComponentProps) {
    const classes = useStyles();

    if (props.orders.length === 0 || Object.keys(props.recipes).length === 0 || Object.keys(props.items).length === 0) {
        return null;
    }


    const getRecipeFromOrder = (order: Order) => {
        return props.recipes[order.recipe];
    };

    const getItemsFromRecipe = (recipe: Recipe): Item[] => {
        return recipe.items.map(ri => {
            const item = props.items[ri.id];
            return {
                ...item,
                ...ri,
            };
        });
    };

    return (
        <div className={classes.root}>
            <Title>Orders</Title>
            {props.orders.map(order => (
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}><strong>{order.pending ? 'Pending' : 'Ordered'}:</strong> {getRecipeFromOrder(order).name}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Colors</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {getItemsFromRecipe(getRecipeFromOrder(order)).map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.qty}</TableCell>
                                        <TableCell>{item.colors ? item.colors.join(', ') : ''}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}
        </div>
    );
}
