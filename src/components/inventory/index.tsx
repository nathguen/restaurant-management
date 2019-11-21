import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Order, Recipe, Item } from '../../types';
import { RecipesState } from '../../reducers/recipes';
import { Table, TableHead, TableCell, TableRow, TableBody, Input } from '@material-ui/core';
import { ItemsState } from '../../reducers/items';
import Title from '../orders/orders-title';


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

interface InventoryComponentProps {
    items: ItemsState
}

export default function InventoryComponent(props: InventoryComponentProps) {
    const classes = useStyles();
    const [filter, setFilter] = useState('');

    if (Object.keys(props.items).length === 0) {
        return null;
    }

    const items = Object.keys(props.items).map(itemId => {
        return props.items[Number(itemId)];
    }).filter(item => {
        if (filter.length) {
            const colors = item.colors ? item.colors.join().toLowerCase() : '';
            return (
                item.qty.toString().includes(filter) ||
                item.name.toLowerCase().includes(filter.toLowerCase()) ||
                colors.includes(filter.toLowerCase())
            );
        }
        return true;
    });

    return (
        <div className={classes.root}>
            <Title>Inventory</Title>
            <Input type="text" onChange={e => setFilter(e.target.value)} />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Colors</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.qty}</TableCell>
                            <TableCell>{item.colors ? item.colors.join(', ') : ''}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
