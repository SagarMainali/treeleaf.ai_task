type UserType = {
    id: number,
    username: string,
    email: string,
    phone: string,
    dob: string,
    city: string,
    district: string,
    province: string,
    country: string,
    profilePic: string,
    onEditMode: boolean
}

type PropsType = {
    users: UserType[],
    setUsers?: React.Dispatch<React.SetStateAction<UserType[]>>
}

export type {UserType, PropsType}