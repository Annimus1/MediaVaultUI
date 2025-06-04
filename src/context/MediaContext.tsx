import React from "react";

export interface Media {
    id: string;
    owner: string;
    name: string;
    completedDate: string;
    score: number;
    poster: string;
    mediaType: string;
    language: string;
    comment?: string;
}

interface MediaContextType {
    media: Media[];
    children: React.ReactNode;
    updateMedia: (newMedia: Media[]) => void;
    currentAmount: number;
    totalAmount: number;
    setTotalAmount: (amount: number) => void;
    setCurrentAmount: (amount: number) => void;
}

interface MediaContextProps {
    children: React.ReactNode;
}

export const MediaContext = React.createContext<MediaContextType | null>(null);

const testMedia: Media[] = [
    {
        id: "1",
        owner: "John Doe",
        name: "Example Media",
        completedDate: "2023-10-01",
        score: 5,
        poster: "https://example.com/poster.jpg",
        mediaType: "movie",
        language: "english",
        comment: "Great movie!",
    },
    {
        id: "10",
        owner: "John Doe",
        name: "Example Media 2",
        completedDate: "2023-10-01",
        score: 5,
        poster: "https://example.com/poster.jpg",
        mediaType: "movie",
        language: "english",
        comment: "Great movie!",
    },
    {
        id: "2",
        owner: "John Doe",
        name: "Example Media 2",
        completedDate: "2023-10-01",
        score: 5,
        poster: "https://example.com/poster.jpg",
        mediaType: "movie",
        language: "english",
        comment: "Great movie!",
    },
    {
        id: "3",
        owner: "John Doe",
        name: "Example Media 2",
        completedDate: "2023-10-01",
        score: 5,
        poster: "https://example.com/poster.jpg",
        mediaType: "movie",
        language: "english",
        comment: "Great movie!",
    },
    {
        id: "4",
        owner: "John Doe",
        name: "Example Media 2",
        completedDate: "2023-10-01",
        score: 5,
        poster: "https://example.com/poster.jpg",
        mediaType: "movie",
        language: "english",
        comment: "Great movie!",
    },
    {
        id: "5",
        owner: "John Doe",
        name: "Example Media 2",
        completedDate: "2023-10-01",
        score: 5,
        poster: "https://example.com/poster.jpg",
        mediaType: "movie",
        language: "english",
        comment: "Great movie!",
    },
    {
        id: "6",
        owner: "John Doe",
        name: "Example Media 2",
        completedDate: "2023-10-01",
        score: 5,
        poster: "https://example.com/poster.jpg",
        mediaType: "movie",
        language: "english",
        comment: "Great movie!",
    },
    {
        id: "7",
        owner: "John Doe",
        name: "Example Media 2",
        completedDate: "2023-10-01",
        score: 5,
        poster: "https://example.com/poster.jpg",
        mediaType: "movie",
        language: "english",
        comment: "Great movie!",
    },
    {
        id: "8",
        owner: "John Doe",
        name: "Example Media 2",
        completedDate: "2023-10-01",
        score: 5,
        poster: "https://example.com/poster.jpg",
        mediaType: "movie",
        language: "english",
        comment: "Great movie!",
    },
    {
        id: "9",
        owner: "John Doe",
        name: "Example Media 2",
        completedDate: "2023-10-01",
        score: 5,
        poster: "https://example.com/poster.jpg",
        mediaType: "movie",
        language: "english",
        comment: "Great movie!",
    }
];

export const MediaProvider: React.FC<MediaContextProps> = ({ children }) => {
    const [media, setMedia] = React.useState<Media[]>(testMedia);
    const [currentAmount, setCurrentAmount] = React.useState<number>(0);
    const [totalAmount, setTotalAmount] = React.useState<number>(0);

    const updateMedia = (newMedia: Media[]) => {
        console.log("actual Media", media)
        // Logic to update media
        // This is a placeholder for the actual implementation
        setMedia(newMedia)
        console.log("updated Media", newMedia);
    };

    const value: MediaContextType = {
        media,
        children,
        updateMedia,
        currentAmount,
        totalAmount,
        setCurrentAmount,
        setTotalAmount
    };

    return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>;
}