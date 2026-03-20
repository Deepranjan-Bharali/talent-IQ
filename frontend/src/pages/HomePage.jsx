import React from 'react'
import {Show,SignInButton, SignOutButton,UserButton } from '@clerk/react';
import toast from 'react-hot-toast';

function HomePage() {
  return (
    <div>
      <button className='btn btn-primary' onClick={()=> toast.success("This is a success")}>click me</button>
      <Show when="signed-out">
        <SignInButton mode="modal">
          <button>Login</button>
        </SignInButton>
      </Show>

      <Show when="signed-in">
        <SignOutButton/>
      </Show>

      <UserButton/>
    </div>
  )
}

export default HomePage
