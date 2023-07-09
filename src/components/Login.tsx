"use client"
import { auth, db } from "../utils/firebase";
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Login = () => {
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const GoogleSignIn = async() => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log(result.user);
            await setDoc(doc(db, "users", result.user.uid ), {
                uid: result.user.uid,
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
            })

            // router.push('/')
            window.location.href = '/'
        } catch (error) {
            console.log(error);
        }
    }
    const GithubSignIn = async() => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            console.log(result.user);
            await setDoc(doc(db, "users", result.user.uid ), {
                uid: result.user.uid,
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
            })

            // router.push('/')
            window.location.href = '/'
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="w-[250px] h-[230px] flex flex-col gap-5 items-center shadow-md shadow-gray-600 border rounded-lg px-2 py-3 border-solid border-slate-100">
            <div className='text-5xl flex-grow text-slate-300 font-medium py-3 px-2 '><BsFillShieldLockFill /></div>
            <button className='text-warm-gray-800 bg-[#202124] hover:border-none hover:outline hover:outline-2 hover:shadow-md hover:shadow-slate-300 border border-solid flex justify-center items-center gap-2 p-2 rounded-lg' onClick={GoogleSignIn}> 
                <FcGoogle className='text-2xl'/> Sign in With Google
            </button>
            <button className='text-warm-gray-800 bg-[#202124] hover:border-none hover:outline hover:outline-2 hover:shadow-md hover:shadow-slate-300 border border-solid flex justify-center items-center gap-2 p-2 rounded-lg' onClick={GithubSignIn}> 
                <BsGithub className='text-2xl text-white'/> Sign in With Github
            </button>
        </div>
    )
}

export default Login;