

import { useState } from 'react';
import { Typography, List, Divider, styled, Box } from '@mui/material';
import Transaction from './Transaction';

const Component = styled(Box)`
    & > h5 {
        margin-bottom: 10px;
    }
`;

const Transactions = ({ transactions, deleteTransaction }) => {
    const [sortType, setSortType] = useState('Newest');
    const [open, setOpen] = useState(false);
    const sortedTransactions = [...transactions].sort((a, b) => {
        if (sortType === 'Newest') {
            return new Date(b.date) - new Date(a.date);
        } else if (sortType === 'Oldest') {
            return new Date(a.date) - new Date(b.date);
        } else if (sortType === 'Income') {
            return b.amount - a.amount;
        } else if (sortType === 'Expense') {
            return a.amount - b.amount;
        }
        return 0;
    });

    return (
        <Component>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h5">Transaction History</Typography>
                <Box display="flex" alignItems="center" gap={2}>
                    <select value={sortType} onChange={e => setSortType(e.target.value)} style={{padding:'6px',borderRadius:'8px'}}>
                        <option value="Newest">Newest</option>
                        <option value="Oldest">Oldest</option>
                        <option value="Income">Income First</option>
                        <option value="Expense">Expense First</option>
                    </select>
                    <button onClick={() => setOpen(o => !o)} style={{padding:'6px 12px',borderRadius:'8px',background:'#1976d2',color:'#fff',border:'none',cursor:'pointer'}}>
                        {open ? 'Hide' : 'Show'}
                    </button>
                </Box>
            </Box>
            <Divider style={{width: '100%'}} />
            {open && (
                <List>
                    {
                        sortedTransactions.map(transaction => {
                            return <Transaction transaction={transaction} deleteTransaction={deleteTransaction} key={transaction._id || transaction.id} />
                        })
                    }
                </List>
            )}
        </Component>
    )
}

export default Transactions;