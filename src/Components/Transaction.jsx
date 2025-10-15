
import { ListItemText, ListItem, styled, ListItemIcon } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const List = styled(ListItem)`
    display: flex;
    marginTop: 10px;
    border: 1px solid #F6F6F6;
`;

const Transaction = ({transaction, deleteTransaction}) => {
    
    const sign = transaction.amount >= 0 ? '฿' : '-฿';
    const amount = sign + Math.abs(transaction.amount);
    const color = transaction.amount >=0 ? 'Green' : 'Red';
     

    return (
        <List style={{background: `${color}`, color: '#fff'}}>
            <ListItemIcon>
                <DeleteIcon onClick={() => deleteTransaction(transaction._id)} />
            </ListItemIcon>
            <ListItemText primary={transaction.description} secondary={transaction.category || 'General'} />
            <ListItemText primary={amount} secondary={new Date(transaction.date).toLocaleDateString()} />
        </List>
    )
}

export default Transaction;