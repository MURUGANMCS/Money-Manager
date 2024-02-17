import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    income: 0,
    expenses: 0,
    type: 'Income',
    transactionList: [],
  }

  onChangeType = event => {
    console.log(event.target.value)
    const typeText = event.target.value === 'INCOME' ? 'Income' : 'Expenses'
    this.setState({type: typeText})
  }

  isChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  isChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  isDeleteBtn = (id, type, intAmount) => {
    this.setState(prevState => ({
      transactionList: prevState.transactionList.filter(
        eachList => eachList.id !== id,
      ),
      income:
        type === 'Income' ? prevState.income - intAmount : prevState.income,

      expenses:
        type === 'Expenses'
          ? prevState.expenses - intAmount
          : prevState.expenses,
    }))
  }

  onClickAdd = () => {
    const {type, income, expenses, amountInput, titleInput} = this.state
    const intAmount = Number(amountInput)

    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: intAmount,
      type,
      isClick: false,
    }

    if (
      titleInput !== '' &&
      amountInput !== '' &&
      Number.isInteger(intAmount) !== ''
    ) {
      this.setState(prevState => ({
        transactionList: [...prevState.transactionList, newTransaction],
        income:
          type === 'Income' ? prevState.income + intAmount : prevState.income,

        expenses:
          type === 'Expenses'
            ? prevState.expenses + intAmount
            : prevState.expenses,
        titleInput: '',
        amountInput: '',
      }))
    }
  }

  render() {
    const {income, expenses, transactionList, titleInput, amountInput} =
      this.state

    const balance = income - expenses

    return (
      <div className="app-container">
        <div className="name-container">
          <h1 className="heading">Hi, Richard</h1>
          <p>
            Welcome back to your
            <span className="Money-manager-class"> Money Manager</span>
          </p>
        </div>

        <div>
          <MoneyDetails balance={balance} income={income} expenses={expenses} />
        </div>

        <div className="add-transaction-container">
          <h1 className="add-heading">Add Transaction</h1>
          <div>
            <label htmlFor="TITLE" className="title-label">
              TITLE
            </label>
            <br className="br" />
            <input
              type="text"
              id="TITLE"
              onChange={this.isChangeTitle}
              value={titleInput}
              placeholder="TITLE"
              className="title-input"
            />
          </div>
          <div>
            <label htmlFor="AMOUNT" className="amount-label">
              AMOUNT
            </label>
            <br className="br" />
            <input
              type="text"
              id="AMOUNT"
              onChange={this.isChangeAmount}
              value={amountInput}
              placeholder="AMOUNT"
              className="amount-input"
            />
          </div>

          <label htmlFor="TYPE" className="select-label">
            Type
          </label>
          <br className="br" />
          <select
            id="TYPE"
            onChange={this.onChangeType}
            className="select-input"
          >
            {transactionTypeOptions.map(option => (
              <option key={option.optionId} value={option.optionId}>
                {option.displayText}
              </option>
            ))}
          </select>
          <br className="br" />
          <button type="button" onClick={this.onClickAdd} className="add-btn">
            Add
          </button>
        </div>

        <div className="add-transaction-container">
          <h1 className="history-heading">History</h1>

          <ul className="ul-list">
            <li className="history-item1">
              <p className="tabel-cell">Title</p>
              <p className="tabel-cell">Amount</p>
              <p className="tabel-cell">Type</p>
              <p className="tabel-cell" />
            </li>{' '}
            {transactionList.map(eachList => (
              <TransactionItem
                key={eachList.id}
                transactionData={eachList}
                isDeleteBtn={this.isDeleteBtn}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default MoneyManager
