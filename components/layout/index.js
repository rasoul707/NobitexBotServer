import styles from './style.module.css'
import cn from 'classnames'


export default function Layout({ children }) {

    const type = 'success'

    // let cs = styles[rr]

    return <div className={cn({
        [styles.success]: type === 'success',
        [styles.error]: type === 'error'
    })}>{children}</div>
}


