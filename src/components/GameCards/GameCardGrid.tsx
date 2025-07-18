import React from 'react'
import { WordollCard } from './WordollCard'
import { LockPickrCard } from './LockPickrCard'
import { GiveawayCard } from './GiveawayCard'
import { PlayBookCard } from './PlayBookCard'
import { LoginButton } from '../LoginButton'
export function GameCardGrid() {
    // Check if mobile
    const isMobile = window.innerWidth <= 768
    if (isMobile) {
        return (
            <div className="flex-1 px-4 pb-10 game-card-grid">
                {/* Online status for mobile view - positioned above the cards */}
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm font-bold">1,568 Online</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                    {/* Ensure Wordoll is first (top-left) */}
                    <WordollCard isMobile={true} />
                    <LockPickrCard isMobile={true} />
                    <GiveawayCard isMobile={true} />
                    <PlayBookCard isMobile={true} />
                </div>
                <LoginButton />
            </div>
        )
    }

    return (
        <div className="flex-1 flex justify-center items-center pt-0 game-card-grid">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full">
                <WordollCard />
                <LockPickrCard />
                <GiveawayCard />
            </div>
        </div>
    )
}
