import mongoose from 'mongoose';

const mongoUser = 'saisaiaungbhone';
const mongoPw = 'jqN3HyKozl6wCwDz';
const mongoUri = `mongodb+srv://${mongoUser}:${mongoPw}@cluster0.ic99n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const expenseSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  category: String,
  date: { type: Date, default: Date.now }
});

const Expense = mongoose.model('Expense', expenseSchema);

async function seed() {
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

  const expenses = [
    { description: 'Lunch', amount: -50, category: 'Food', date: new Date() },
    { description: 'Salary', amount: 5000, category: 'Salary', date: new Date() },
    { description: 'Book', amount: -120, category: 'Shopping', date: new Date() },
    { description: 'Electricity Bill', amount: -800, category: 'Bills', date: new Date() },
    { description: 'Coffee', amount: -40, category: 'Food', date: new Date() }
  ];

  await Expense.insertMany(expenses);
  console.log('Sample expenses inserted!');
  mongoose.disconnect();
}

seed();
