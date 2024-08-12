import { UseFormSetError, UseFormClearErrors } from 'react-hook-form'

import { UserType } from '../types/userType';

export const handleValidation = (fieldName: keyof UserType, value: string, setError: UseFormSetError<UserType>, clearErrors: UseFormClearErrors<UserType>) => {

    const valueErased = value.length === 0 ? true : false
    // move to check conditios only if the field contains any value - this specifically avoids showing errors when the filed values are all erased

    switch (fieldName) {

        case 'username':
            if (!valueErased) {
                clearErrors('username')
            }
            return value

        case 'email':
            const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
            if (emailRegex.test(value) || valueErased) {
                clearErrors('email');

            } else {
                setError('email', { type: 'manual', message: 'Invalid email format!' });

            }
            return value

        case 'phone':
            const acceptedValue = value.replace(/[^0-9]/g, ''); // filter out everything except numbers
            if (valueErased || acceptedValue.length >= 7) {
                clearErrors('phone');
            }
            else {
                if (!acceptedValue) {
                    setError('phone', { type: 'manual', message: 'Only numbers are allowed!' });
                }
                else {
                    setError('phone', { type: 'manual', message: 'Phone must be at least 7 characters!' });
                }

            }
            return acceptedValue

        default:
            return ''
    }
}