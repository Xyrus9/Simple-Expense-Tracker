import { Card, CardContent, Typography, Box, styled } from '@mui/material';

const SummaryContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`;

const SummaryCard = styled(Card)`
  flex: 1;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  background: linear-gradient(135deg, #e0f7fa 0%, #fff 100%);
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: scale(1.06);
    box-shadow: 0 8px 32px rgba(44,62,80,0.18);
    background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  }
`;

function getCategorySummary(transactions) {
  const summary = {};
  transactions.forEach(tx => {
    const cat = tx.category || 'General';
    if (!summary[cat]) summary[cat] = 0;
    summary[cat] += tx.amount;
  });
  return summary;
}

function getPeriodSummary(transactions) {
  const now = new Date();
  let monthTotal = 0, yearTotal = 0;
  transactions.forEach(tx => {
    const txDate = new Date(tx.date);
    if (txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear()) {
      monthTotal += tx.amount;
    }
    if (txDate.getFullYear() === now.getFullYear()) {
      yearTotal += tx.amount;
    }
  });
  return { monthTotal, yearTotal };
}

const SummaryCards = ({ transactions }) => {
  const categorySummary = getCategorySummary(transactions);
  const periodSummary = getPeriodSummary(transactions);

  // Prepare cards array: first 3 are period/bonus, rest are categories
  const cards = [
    { label: 'This Month', value: periodSummary.monthTotal, color: '#009688' },
    { label: 'This Year', value: periodSummary.yearTotal, color: '#3f51b5' },
    { label: 'Bonus', value: categorySummary['Bonus'] || 0, color: '#ff9800' },
    ...Object.entries(categorySummary)
      .filter(([cat]) => cat !== 'Bonus')
      .map(([cat, total]) => ({ label: cat, value: total, color: '#ff9800' }))
  ];

  return (
    <SummaryContainer>
      {cards.map((card, idx) => (
        <SummaryCard key={card.label + idx}>
          <CardContent>
            <Typography variant="h6">{card.label}</Typography>
            <Typography variant="h4" style={{ color: card.color }}>฿{card.value.toFixed(2)}</Typography>
          </CardContent>
        </SummaryCard>
      ))}
    </SummaryContainer>
  );
};

export default SummaryCards;
