import { createContext, useState, ReactNode, useEffect } from "react";
import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengeContextData {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelUp: ()=> void;
    startNewChallenge: ()=> void;
    resetChallenge: ()=> void;
    completedChallge: ()=> void;
}

interface ChallengesProviderProps{
    children: ReactNode;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({children}: ChallengesProviderProps){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0)

    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1)* 4, 2)

    useEffect(()=>{
        Notification.requestPermission();
    }, [])

    function levelUp(){
        setLevel(level + 1);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount} xp`
            })
        }
    }

    function completedChallge(){
        if(!activeChallenge){
            return;
        }
        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    function resetChallenge(){
        setActiveChallenge(null)
    }

    return(
        <ChallengeContext.Provider value={{
            level,
            currentExperience: currentExperience,
            experienceToNextLevel,
            challengesCompleted,
            levelUp,
            activeChallenge,
            startNewChallenge,
            completedChallge,
            resetChallenge,
            }}>
            {children}
        </ChallengeContext.Provider>
    )
}