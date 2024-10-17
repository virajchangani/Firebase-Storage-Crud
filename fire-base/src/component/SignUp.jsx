import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig'; 
import { Link, useNavigate } from 'react-router-dom';  
import { doc, setDoc } from 'firebase/firestore';  
import './SignUp.css';

const SignUp = () => {
    const [name, setName] = useState('');  
    const [city, setCity] = useState('');  
    const [email, setEmail] = useState('');  
    const [password, setPassword] = useState(''); 
    const [gender, setGender] = useState('');  
    const [mobile, setMobile] = useState('');  
    const [error, setError] = useState(''); 
    const navigate = useNavigate();  

    const handleSignUp = () => {
        setError(''); 

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User signed up:', user);
                setDoc(doc(db, 'users', user.uid), {
                    name: name,
                    city: city,
                    email: email,
                    gender: gender,
                    mobile: mobile 
                })
              
                .then(() => {
                    console.log('User data stored in Firestore');
                    setName("")
                    setCity("")
                    setGender("")
                    setEmail("")
                    setPassword("")
                    setMobile("")
                })
                .catch((error) => {
                    console.error('Error storing user data:', error);
                    setError(error.message);
                });
            })
            .catch((error) => {
                setError(error.message);  
            });
    };

    return (
        <div style={{width:"600px"}}>
            <h1>Sign Up</h1>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <div>
                <label className='l1' htmlFor="">Gender</label> <br /><br />
                <label>
                    <input style={{marginLeft:"30px"}}
                        type="radio"
                        value="Male"
                        checked={gender === 'Male'}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    Male
                </label> <br />
                <label>
                    <input  style={{marginLeft:"30px"}}
                        type="radio"
                        value="Female"
                        checked={gender === 'Female'}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    Female
                </label>
            </div>

            <input
                type="text"
                placeholder="Mobile Number" 
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
            />

            <button onClick={handleSignUp}>Sign Up</button>
            {error && <p style={{color: 'red'}}>{error}</p>} 
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default SignUp;
