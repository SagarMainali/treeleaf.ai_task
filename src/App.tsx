import { useState } from "react"
import { Routes, Route } from 'react-router-dom'

import { UserType } from "./types/userType"
import Home from "./Components/Home"
import Profiles from "./Components/Profiles"

export default function App() {

  // when the app first renders, the data from localstorage will be set to 'users', if it is null then '[]' will be set
  const [users, setUsers] = useState<UserType[]>(JSON.parse(localStorage.getItem('users')!) || [])

  return (
    <div className="font-poppins max-w-[1000px] mx-auto">

      <Routes>
        <Route path="/" element={<Home users={users} setUsers={setUsers} />} />
        <Route path="profiles" element={<Profiles users={users} />} />
      </Routes>

    </div>
  )
}