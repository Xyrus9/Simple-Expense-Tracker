import { useState, useEffect } from 'react';
import axios from 'axios';

import { Typography, Box, styled } from '@mui/material';
import './App.css';

import Balance from './Components/Balance';
import ExpenseCard from './Components/ExpenseCard';
import Transactions from './Components/Transactions';
import NewTransaction from './Components/NewTransaction';
import SummaryCards from './Components/SummaryCards';

const Header = styled(Typography)`
  margin: 32px 0 24px 0;
  color: #1a237e;
  font-size: 56px;
  font-family: 'Poppins', 'Montserrat', 'Segoe UI', Arial, sans-serif;
  font-weight: 900;
  letter-spacing: 3px;
  text-transform: uppercase;
  text-align: center;
  text-shadow: 0 4px 24px rgba(26,35,126,0.18);
`;

const DashboardContainer = styled(Box)`
  background: #f6f8fa;
  padding: 30px;
  border-radius: 20px;
  display: flex;
  gap: 30px;
  width: 1100px;
  min-height: 80vh;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
`;

const Sidebar = styled(Box)`
  width: 250px;
  background: #f4f6fa;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const MainContent = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

function App() {
  
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const deleteTransaction = async (id) => {
  await axios.delete(`/api/expenses/${id}`);
    setTransactions(transactions.filter(transaction => transaction._id !== id));
  }

  const addTransaction = async (transaction) => {
    try {
      const newTransaction = {
        ...transaction,
        category: transaction.category || 'General',
        date: transaction.date || new Date()
      };
  const res = await axios.post('/api/expenses', newTransaction);
      console.log('Add response:', res.data);
      // Refetch transactions to ensure dashboard updates
  const fetchRes = await axios.get('/api/expenses');
      setTransactions(fetchRes.data.reverse());
    } catch (err) {
      console.error('Error adding transaction:', err);
    }
  }
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
  const res = await axios.get('/api/expenses');
        console.log('Fetched expenses:', res.data);
        setTransactions(res.data.reverse());
        setFetchError(null);
      } catch (err) {
        console.error('Error fetching expenses:', err);
        setFetchError(err.message || 'Failed to fetch expenses');
      }
      setLoading(false);
    };
    fetchTransactions();
  }, []);


  // Filtering state
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterPeriod, setFilterPeriod] = useState('All');

  // Filter logic
  const filteredTransactions = transactions.filter(tx => {
    let match = true;
    if (filterCategory !== 'All') match = match && tx.category === filterCategory;
    if (filterPeriod !== 'All') {
      const now = new Date();
      const txDate = new Date(tx.date);
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      const lastWeekStart = new Date(startOfWeek);
      lastWeekStart.setDate(startOfWeek.getDate() - 7);
      const lastWeekEnd = new Date(startOfWeek);
      lastWeekEnd.setDate(startOfWeek.getDate() - 1);
      if (filterPeriod === 'This Week') {
        match = match && txDate >= startOfWeek && txDate <= endOfWeek;
      } else if (filterPeriod === 'Last Week') {
        match = match && txDate >= lastWeekStart && txDate <= lastWeekEnd;
      } else if (filterPeriod === 'This Month') {
        match = match && (txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear());
      } else if (filterPeriod === 'Last Month') {
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        match = match && (txDate.getMonth() === lastMonth.getMonth() && txDate.getFullYear() === lastMonth.getFullYear());
      } else if (filterPeriod === 'This Year') {
        match = match && (txDate.getFullYear() === now.getFullYear());
      } else if (filterPeriod === 'Last Year') {
        match = match && (txDate.getFullYear() === now.getFullYear() - 1);
      }
    }
    return match;
  });

  // Unique categories for filter dropdown
  const categories = ['All', ...Array.from(new Set(transactions.map(tx => tx.category || 'General')))].filter(Boolean);

  return (
    <div className="App">
      <Header>Expense Tracker</Header>
      <DashboardContainer>
        <Sidebar>
          <Typography variant="h6">Filters</Typography>
          <Box>
            <Typography variant="subtitle2">Category</Typography>
            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={{width:'100%',padding:'8px',borderRadius:'8px'}}>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </Box>
          <Box>
            <Typography variant="subtitle2">Time Period</Typography>
            <select value={filterPeriod} onChange={e => setFilterPeriod(e.target.value)} style={{width:'100%',padding:'8px',borderRadius:'8px'}}>
              <option value="All">All</option>
              <option value="This Week">This Week</option>
              <option value="Last Week">Last Week</option>
              <option value="This Month">This Month</option>
              <option value="Last Month">Last Month</option>
              <option value="This Year">This Year</option>
              <option value="Last Year">Last Year</option>
            </select>
          </Box>
        </Sidebar>
        <MainContent>
          <SummaryCards transactions={filteredTransactions} />
          <Balance transactions={filteredTransactions} />
          <ExpenseCard transactions={filteredTransactions} />
          <NewTransaction addTransaction={addTransaction}/>
          {loading ? <div>Loading...</div> :
            fetchError ? <div style={{color:'red',margin:'20px 0'}}>{fetchError}</div> :
            filteredTransactions.length === 0 ? <div style={{margin:'20px 0'}}>No transactions found.</div> :
            <Transactions transactions={filteredTransactions} deleteTransaction={deleteTransaction}/>
          }
        </MainContent>
      </DashboardContainer>
      <footer style={{marginTop:40, textAlign:'center', color:'#1a237e', fontFamily:'Poppins, Montserrat, Segoe UI, Arial, sans-serif', fontWeight:600, fontSize:18, letterSpacing:1}}>
        &copy; saiaungbhonekhant 2025 Oct
      </footer>
    </div>
  );
}

export default App;
