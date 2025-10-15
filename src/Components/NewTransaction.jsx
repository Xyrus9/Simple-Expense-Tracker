import { useState } from 'react';
import { Typography, Box, TextField, Button, styled, Divider } from '@mui/material';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    & > h5, & > div, & > button {
        margin-top: 30px
    }
`;

const StyledButton = styled(Button)`
    background: #445A6F;
    color: #fff;
`;

const NewTransaction = ({ addTransaction }) => {
    // Expense form state
    const [expenseText, setExpenseText] = useState('');
    const [expenseAmount, setExpenseAmount] = useState();
    const expenseCategories = ['Food', 'Shopping', 'Bills', 'Other'];
    const [expenseCategory, setExpenseCategory] = useState(expenseCategories[0]);
    const [expenseDate, setExpenseDate] = useState(new Date().toISOString().slice(0, 10));

    // Income form state
    const [incomeText, setIncomeText] = useState('');
    const [incomeAmount, setIncomeAmount] = useState();
    const incomeCategories = ['Salary', 'Bonus', 'Other Income'];
    const [incomeCategory, setIncomeCategory] = useState(incomeCategories[0]);
    const [incomeDate, setIncomeDate] = useState(new Date().toISOString().slice(0, 10));

    const addExpense = () => {
        const transaction = {
            description: expenseText,
            amount: -Math.abs(Number(expenseAmount)),
            category: expenseCategory,
            date: new Date(expenseDate)
        };
        addTransaction(transaction);
        setExpenseText('');
        setExpenseAmount('');
        setExpenseCategory(expenseCategories[0]);
        setExpenseDate(new Date().toISOString().slice(0, 10));
    };

    const addIncome = () => {
        const transaction = {
            description: incomeText,
            amount: Math.abs(Number(incomeAmount)),
            category: incomeCategory,
            date: new Date(incomeDate)
        };
        addTransaction(transaction);
        setIncomeText('');
        setIncomeAmount('');
        setIncomeCategory(incomeCategories[0]);
        setIncomeDate(new Date().toISOString().slice(0, 10));
    };

    return (
        <Container>
            <Typography variant="h5">Add Expense</Typography>
            <TextField value={expenseText} label="Expense Message" onChange = {(e) => setExpenseText(e.target.value)} sx={{mb:2}} />
            <TextField value={expenseAmount} label="Amount" type="number" onChange = {(e) => setExpenseAmount(e.target.value)} sx={{mb:2}} />
            <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Category</Typography>
                <select value={expenseCategory} onChange={e => setExpenseCategory(e.target.value)} style={{width:'100%',padding:'8px',borderRadius:'8px'}}>
                    {expenseCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </Box>
            <TextField
                label="Date"
                type="date"
                value={expenseDate}
                onChange={e => setExpenseDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{mt:2}}
            />
            <StyledButton variant="contained" onClick={addExpense} sx={{mt:2}}>Add Expense</StyledButton>

            <Divider sx={{my:4}} />

            <Typography variant="h5">Add Income</Typography>
            <TextField value={incomeText} label="Income Message" onChange = {(e) => setIncomeText(e.target.value)} sx={{mb:2}} />
            <TextField value={incomeAmount} label="Amount" type="number" onChange = {(e) => setIncomeAmount(e.target.value)} sx={{mb:2}} />
            <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Category</Typography>
                <select value={incomeCategory} onChange={e => setIncomeCategory(e.target.value)} style={{width:'100%',padding:'8px',borderRadius:'8px'}}>
                    {incomeCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </Box>
            <TextField
                label="Date"
                type="date"
                value={incomeDate}
                onChange={e => setIncomeDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{mt:2}}
            />
            <StyledButton variant="contained" onClick={addIncome} sx={{mt:2}}>Add Income</StyledButton>
        </Container>
    );
}

export default NewTransaction;