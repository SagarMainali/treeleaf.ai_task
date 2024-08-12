import { SubmitHandler, useForm } from 'react-hook-form'

import { UserType } from '../types/userType'
import { PropsType } from '../types/userType'
import { handleValidation } from '../utils/handleValidation'
import { useEffect, useState } from 'react'

export default function Form({ users, setUsers }: PropsType) {

    const {
        register,
        setValue,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors }
    } = useForm<UserType>()

    const addToTable: SubmitHandler<UserType> = (formData: UserType) => {
        console.log(formData)
        if (setUsers) {
            setUsers((prevUsers: UserType[]) => (
                [
                    {
                        ...formData,
                        id: Date.now()
                    },
                    ...prevUsers
                ]
            ))
        }
    }

    const [countriesOption, setCountriesOption] = useState<string[]>([])

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                const countryOptions = data.map((country: any) => country.name.common);
                setCountriesOption(countryOptions);
            })
            .catch(error => {
                console.error('Error fetching country options:', error);
            });
    }, []);

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users))
    }, [users])

    return (
        <form className='w-[750px] mx-auto' onSubmit={handleSubmit(addToTable)}>

            <h2 className='sub-title'>User Form</h2>

            <div className='form-field-group'>

                <div>
                    <input type="text" placeholder='Username*' {...register('username'
                        , { required: ('Username is required!') }
                    )
                    }
                        onChange={(e) => {
                            setValue('username', handleValidation('username', e.target.value, setError, clearErrors));
                        }}
                    />
                    {errors.username && <p className='errorMsg'>{`${errors.username.message}`}</p>}
                </div>

                <div>
                    <input type="text" placeholder='Email*' {...register('email'
                        , { required: ('Email is required!') }
                    )}
                        onChange={(e) => {
                            setValue('email', handleValidation('email', e.target.value, setError, clearErrors));
                        }}
                    />
                    {errors.email && <p className='errorMsg'>{`${errors.email.message}`}</p>}
                </div>

                <div>
                    {/* the type of the input field is controlled from the handleValidation() */}
                    <input type="text" placeholder='Phone*' {...register('phone'
                        , { required: ('Phone is required!') }
                    )}
                        onChange={(e) => {
                            setValue('phone', handleValidation('phone', e.target.value, setError, clearErrors));
                        }}
                    />
                    {errors.phone && <p className='errorMsg'>{`${errors.phone.message}`}</p>}
                </div>

                <input type="date" placeholder='DOB' {...register('dob')}
                    onChange={(e) => {
                        setValue('dob', e.target.value);
                    }}
                />

                <input type="text" placeholder='City' {...register('city')}
                    onChange={(e) => {
                        setValue('city', e.target.value);
                    }}
                />

                <input type="text" placeholder='District' {...register('district')}
                    onChange={(e) => {
                        setValue('district', e.target.value);
                    }}
                />

                <input type="text" placeholder='Province' {...register('province')}
                    onChange={(e) => {
                        setValue('province', e.target.value);
                    }}
                />

                <select {...register('country')}>
                    <option value="">Country</option>
                    {countriesOption.map((country, index) => (
                        <option key={index} value={country}>{country}</option>
                    ))}
                </select>

                <div>
                    <input type="file" placeholder='Profile picture' {...register('profilePic')}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    if (reader.result) {
                                        setValue('profilePic', reader.result as string);
                                    }
                                };
                            }
                        }}
                    />
                    {errors.profilePic && <p className='errorMsg'>{`${errors.profilePic.message}`}</p>}
                </div>

                <button type='submit' className='col-span-full bg-slate-200'>Add to table</button>

            </div>

        </form>
    )
}
