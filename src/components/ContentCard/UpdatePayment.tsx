import React, { useEffect, useState } from 'react'
import { Payment, PaymentOption } from '../../types'
import PaymentInputOption from '../CreateModal/PaymentInputOption'
import styled from 'styled-components'
import { Button } from './ContentCardModal'

type Props = {
    onUpdate: (payment: Payment) => void,
    payment: Payment
}

const UpdatePayment = (props: Props) => {
    const [showUpdatePriceOption, setShowUpdatePriceOption] = useState<boolean>(false)
    const [payment, setPayment] = useState<Payment>({
        option1: {
            days: undefined,
            price: undefined
        },
        option2: {
            days: undefined,
            price: undefined
        },
        option3: {
            days: undefined,
            price: undefined
        },
    })

    useEffect(() => {
        setPayment(props.payment)
    }, [])

    const onUpdateButtonClick = () => {
        if (!showUpdatePriceOption) {
            setShowUpdatePriceOption(true)
            return;
        }
        
        props.onUpdate(payment)
    }

    const handleOptionChange = (optionName: keyof typeof payment, newOption: PaymentOption) => {
        setPayment({ ...payment, [optionName]: newOption });
    };

    return (
        <div className='w-full'>
            {showUpdatePriceOption && (
                <div className='border bg-blue-200 rounded-lg p-2 my-2'>
            <h2>Option 1:</h2>
            <PaymentInputOption option={payment.option1} onChange={(newOption) => handleOptionChange('option1', newOption)} placeHolder={{
                day: '30',
                price: '1'
            }}/>

            <h2>Option 2:</h2>
            <PaymentInputOption option={payment.option2} onChange={(newOption) => handleOptionChange('option2', newOption)} placeHolder={{
                day: '60',
                price: '2'
            }}/>

            <h2>Option 3:</h2>
            <PaymentInputOption option={payment.option3} onChange={(newOption) => handleOptionChange('option3', newOption)} placeHolder={{
                day: '180',
                price: '5'
            }}/>
                </div>
            )}
            <div className='w-full'>
                <Button color="#28a745" onClick={onUpdateButtonClick}>
                Update Price
            </Button>
            </div>
        </div>
    )
}

export default UpdatePayment