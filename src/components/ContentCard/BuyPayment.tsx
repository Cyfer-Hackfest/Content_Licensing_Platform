import React, { useEffect, useState } from 'react'
import { Payment, PaymentOption } from '../../types'
import PaymentInputOption from '../CreateModal/PaymentInputOption'
import styled from 'styled-components'
import { Button } from './ContentCardModal'
import { useWallet } from 'useink'
import { useNotifications } from 'useink/notifications'
import { PaymentOptionRequest } from '../../types/request'
import { useAppSelector } from '../../context'
import { parsePrice } from '../../utils'
import { type } from 'os'

type Props = {
    onBuy: (op: PaymentOptionRequest) => void,
    payment: Payment
}

const BuyPayment = (props: Props) => {
    const {network} = useAppSelector(state => state.app_state)
    const {account} = useWallet();
    const { addNotification } = useNotifications();
    const {option1, option2, option3} = props.payment;

    const [showBuyOption, setShowBuyOption] = useState<boolean>(false);
    const [optionToBuy, setOptionToBuy] = useState<PaymentOptionRequest | null>(null)

    const handleBuyClick = async () => {
        if (!account) {
            addNotification({
                type: "Errored",
                message: "Please Connect your wallet first"
            })
            return;
        }
        if (!showBuyOption) {
            setShowBuyOption(true)
            return;
        }
        console.log('clicked');
        
        if (optionToBuy == null) {
            return;
        }
        
        props.onBuy(optionToBuy)
    };
    
    return (
        <div className='w-full'>
            {showBuyOption && <div className="flex flex-row w-full justify-center items-center my-2">
                {option1 && <BuyOption option={option1} identity={PaymentOptionRequest.Option1} setOptionToBuy={(op) => setOptionToBuy(op)} optionToBuy={optionToBuy}/>}
                {option2 && <BuyOption option={option2} identity={PaymentOptionRequest.Option2} setOptionToBuy={(op) => setOptionToBuy(op)} optionToBuy={optionToBuy}/>}
                {option3 && <BuyOption option={option3} identity={PaymentOptionRequest.Option3} setOptionToBuy={(op) => setOptionToBuy(op)} optionToBuy={optionToBuy}/>}

            </div>}

            <Button color="#28a745" onClick={handleBuyClick}>
                Buy
            </Button>
        </div>
    )
}

type OptionProps = {
    option: PaymentOption,
    identity: PaymentOptionRequest,
    setOptionToBuy: (op: PaymentOptionRequest) => void,
    optionToBuy: PaymentOptionRequest | null
}

const BuyOption = (props: OptionProps) => {
    const {network} = useAppSelector(state => state.app_state)
    
    return (
        <div className={`flex flex-col items-center justify-start p-3 border-blue-400 border rounded-xl hover:bg-green-400 mx-1 ${props.optionToBuy == props.identity ? 'bg-green-600' : ''}`} onClick={() => { 
            console.log('onclick');
            
            props.setOptionToBuy(props.identity)
        }}>
                    <p>{props.option.days} days</p>
                    <p>{parsePrice(props.option.price, network.decimals) } {network.currency}</p>
                </div>
    )
}

export default BuyPayment