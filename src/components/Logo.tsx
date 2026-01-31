import React from 'react';
import { useBrandingStore } from '../lib/store';

interface LogoProps {
    className?: string;
    variant?: 'light' | 'dark' | 'yellow' | 'blue' | 'white';
}

const Logo: React.FC<LogoProps> = ({ className = "", variant = 'dark' }) => {
    const { logoUrl } = useBrandingStore();

    if (logoUrl) {
        return (
            <div className={`flex items-center justify-center ${className}`}>
                <img src={logoUrl} alt="Neuromind Logo" className="w-full h-auto max-h-14" />
            </div>
        );
    }

    const colors = {
        dark: {
            bg: 'transparent',
            tree: '#001B2E',
            text: '#001B2E',
            school: '#001B2E'
        },
        light: {
            bg: 'transparent',
            tree: '#FAF9F5',
            text: '#FAF9F5',
            school: '#FAF9F5'
        },
        yellow: {
            bg: '#FAB015',
            tree: '#001B2E',
            text: '#001B2E',
            school: '#001B2E'
        },
        blue: {
            bg: '#6190E8',
            tree: '#FAF9F5',
            text: '#FAF9F5',
            school: '#FAF9F5'
        },
        white: {
            bg: '#FAF9F5',
            tree: '#001B2E',
            text: '#001B2E',
            school: '#001B2E'
        }
    };

    const current = colors[variant];

    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <svg
                viewBox="0 0 100 100"
                className="w-10 h-10 mb-2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M50 85V45M50 45C45 45 40 42 38 38C35 34 35 28 38 24C41 20 47 18 50 20C53 18 59 20 62 24C65 28 65 34 62 38C60 42 55 45 50 45Z"
                    stroke={current.tree}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M50 65C40 65 30 58 30 45C30 32 40 25 50 25C60 25 70 32 70 45C70 58 60 65 50 65Z"
                    stroke={current.tree}
                    strokeWidth="4"
                    strokeOpacity="0.2"
                />
                <path
                    d="M50 45L40 55M50 55L60 65M50 65V85"
                    stroke={current.tree}
                    strokeWidth="6"
                    strokeLinecap="round"
                />
                {/* Simplified Brain-Tree representation */}
                <path
                    d="M50 75V40M50 40C40 40 32 30 32 20C32 10 40 5 50 5C60 5 68 10 68 20C68 30 60 40 50 40Z"
                    stroke={current.tree}
                    strokeWidth="5"
                    className="opacity-20"
                />
                {/* Real Tree from Image Mimic */}
                <path
                    d="M50 75V35M50 35L42 27M50 45L58 37M45 80H55"
                    stroke={current.tree}
                    strokeWidth="6"
                    strokeLinecap="round"
                />
                <path
                    d="M50 40C40 40 33 33 33 24C33 15 40 8 50 8C60 8 67 15 67 24C67 33 60 40 50 40ZM33 24C28 24 24 28 24 33C24 38 28 42 33 42ZM67 24C72 24 76 28 76 33C76 38 72 42 67 42Z"
                    stroke={current.tree}
                    strokeWidth="5"
                    strokeLinecap="round"
                />
            </svg>
            <div className="flex flex-col items-center leading-none">
                <span
                    className="text-xl font-bold tracking-tight"
                    style={{ color: current.text, fontFamily: 'serif' }}
                >
                    neuromind
                </span>
                <span
                    className="text-[10px] font-bold tracking-[0.2em] mt-1"
                    style={{ color: current.school }}
                >
                    SCHOOL
                </span>
            </div>
        </div>
    );
};

export default Logo;

