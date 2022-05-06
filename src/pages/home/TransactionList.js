import styles from  './Home.module.css'
import { useFirestore } from '../../hooks/useFirestore'

export default function TransactionList({ transactions }) {
    const { deleteDocument } = useFirestore('transactions')
    const handleDelete = id => {
        deleteDocument(id)
    }

  return (
    <ul className={styles.transactions}>
        {transactions.map((transaction)=>(
            <li key={transaction.id}>
                <p className={styles.name}>{transaction.name}</p>
                <p className={styles.amount}>${transaction.amount}</p>
                <button onClick={() => handleDelete(transaction.id)}>x</button>
            </li>
        ))}
    </ul>
  )
}
