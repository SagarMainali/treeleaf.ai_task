import { Link } from "react-router-dom"
import { PropsType, UserType } from "../types/userType"

export default function Profiles({ users }: PropsType) {
    return (
        <div>

            <h2 className='sub-title'>All user data</h2>
            {
                users.length < 1
                    ? <h4 className="my-2 text-sm">'No user data at the moment'</h4>
                    : <table className='w-full mb-4'>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>DOB</th>
                                <th>City</th>
                                <th>District</th>
                                <th>Province</th>
                                <th>Country</th>
                            </tr>
                        </thead>

                        <tbody>

                            {
                                users.map((user: UserType) => {
                                    const entries = Object.entries(user).filter(([key]) => key !== 'id' && key !== 'profilePic')

                                    return <tr key={user.id}>
                                        {
                                            entries.map(([key, value]) => (
                                                (
                                                    <td key={key}>{value}</td>
                                                )
                                            )
                                            )
                                        }
                                    </tr>
                                }
                                )
                            }
                        </tbody>
                    </table>
            }

            <Link to="/" className="text-blue-500">Go to Home Page</Link>

        </div>
    )
}
