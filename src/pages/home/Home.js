import { useAuthContext } from '../../hooks/useAuthContex'
import { useCollection } from '../../hooks/useCollection'

//styles
import styles from './Home.module.css'

//components
import TransactionList from './TransactionList'
import TrnLists from './TrnLists'

export default function Home() {
    const { user } = useAuthContext()
    const { documents, error } = useCollection('transactions', 
    ['uid', '==', user.uid], ['createAt', 'desc'])

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {error && <p>{error}</p>}
                {documents && <TrnLists transactions={documents} />}
            </div>
            <div className={styles.sidebar}>
                <TransactionList uid={user.uid} />
            </div>
        </div>
    )
}
