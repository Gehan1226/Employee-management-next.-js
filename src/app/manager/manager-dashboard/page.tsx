"use client"
import { User } from '@/lib/class/user';
import React from 'react'

export default function page() {
  const user = User.getInstance().getUser();
  console.log(user?.userName);
  return (
    <div>Dashboard ! {user?.userName} </div>
  )
}