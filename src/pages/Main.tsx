import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
    //style
import '../styles/main.css';
import styles from '../styles/pages/main.module.css';



export default function MainPage() {
    const [formData, setFormData] = useState({email: ''})
    const [{loading, error}, setState] = useState({loading: false, error: ''})
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()



    async function submitForm(event: any) {
        event.preventDefault()

        setState({loading: true, error: ''})
        const response = await fetch(`http://localhost:8000/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        await response.json()

        if(response.status === 200) {
            setIsLoggedIn(true)
            setState({loading: false, error: ''})
        } else {
            setState({loading: false, error: 'error'})
        }

        event.target.reset()
    }

    useEffect(() => {
        if(loading === false && isLoggedIn === true) {
            navigate('/map')
        } else if(loading === false && error !== '') {
            navigate('/error')
        }
    }, [isLoggedIn, loading])

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setFormData({...formData, [event.target.name]: event.target.value})
    }



    return (
        <div className={styles.main}>
            <input
                type='email'
                name='email'
                required
                placeholder='Your email...'
                onChange={handleChange}
            ></input>
            <button 
                type='button' 
                className={styles.btn} 
                onClick={submitForm}
            >
                {!loading ? 'Let\'s try it!' : 'Loading...'}
            </button>
        </div>
    )
}