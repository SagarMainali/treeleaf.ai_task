import { Link } from "react-router-dom"
import Form from "../Components/Form"
import Table from "../Components/Table"
import { PropsType } from "../types/userType"

export default function Home({users, setUsers}: PropsType) {

  return (
    <div className="w-full flex flex-col gap-y-10 pb-5">

      <Form users={users} setUsers={setUsers} />

      <Table users={users} setUsers={setUsers}/>

      <Link to="/profiles" className="text-blue-500 text-sm">Go to Profiles Page</Link>

    </div>
  )
}