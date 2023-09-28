import React, { useState } from 'react';
import { ConnectWallet } from '../ConnectWallet';
import { SwitchNetwork } from '../SwitchNetwork';
import Head from 'next/head';

const Header = () => {
    const [showUserSwitch, setShowUserSwitch] = useState(false);
    const [showNetworkSwitch, setShowNetworkSwitch] = useState(false);

    const toggleUserSwitch = () => {
        setShowUserSwitch(!showUserSwitch);
        setShowNetworkSwitch(false);
    };

    const toggleNetworkSwitch = () => {
        setShowNetworkSwitch(!showNetworkSwitch);
        setShowUserSwitch(false);
    };

    return (
        <>
        <Head>
        <title>Usage License</title>
        <meta name='description' content='Usage License' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/squink.svg' />
      </Head>
        
        <header className="bg-blue-500 p-4 flex justify-between items-center">
            {/* Left Side - Logo */}
            <div className="text-white text-lg font-semibold">
                Your Logo
            </div>

            {/* Right Side - User and Network */}
            <div className="flex items-center space-x-4">
                <SwitchNetwork />
                <ConnectWallet />
            </div>
        </header>
        </>
    );
};

export default Header;
