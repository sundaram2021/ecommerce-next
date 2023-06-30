"use client"

import React from 'react'
import { auth, db } from "../../utils/firebase";
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
function page() {
    const router = useRouter();
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

            router.push('/')
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

            router.push('/')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='w-full h-[100vh] flex justify-center items-center'>
            <div className="w-[250px] h-[230px] flex flex-col gap-3 items-center shadow-xl border rounded-lg px-2 py-3 border-solid border-slate-100">
                <h1 className='text-5xl flex-grow text-blue-600 font-medium py-3 px-2'><BsFillShieldLockFill /></h1>
                <button className='text-warm-gray-800 bg-blue-100 hover:bg-blue-200 hover:border hover:border-solid hover:border-blue-400 flex justify-center items-center gap-2 p-2 rounded-lg' onClick={GoogleSignIn}> 
                    <FcGoogle className='text-2xl'/> Sign in With Google
                </button>
                <button className='text-warm-gray-800 bg-blue-100 hover:bg-blue-200 hover:border hover:border-solid hover:border-blue-400 flex justify-center items-center gap-2 p-2 rounded-lg' onClick={GithubSignIn}> 
                    <BsGithub className='text-2xl text-black'/> Sign in With Github
                </button>
            </div>
        </div>
    )
}

export default page