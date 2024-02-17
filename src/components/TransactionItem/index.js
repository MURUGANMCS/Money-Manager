// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionData, isDeleteBtn} = props
  const {id, title, amount, type} = transactionData
  const intAmount = Number(amount)

  const onClickDeletebtn = () => {
    isDeleteBtn(id, type, intAmount)
  }

  return (
    <li className="history-item2">
      <p className="title">{title}</p>
      <p className="amount">Rs {amount}</p>
      <p className="type">{type}</p>

      <button
        type="button"
        onClick={onClickDeletebtn}
        data-testid="delete"
        className="delete-btn"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}
export default TransactionItem
