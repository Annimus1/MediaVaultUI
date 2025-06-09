import React from "react";

export interface Media {
    _id: string;
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

export const MediaProvider: React.FC<MediaContextProps> = ({ children }) => {
    const [media, setMedia] = React.useState<Media[]>([]);
    const [currentAmount, setCurrentAmount] = React.useState<number>(0);
    const [totalAmount, setTotalAmount] = React.useState<number>(0);

    const updateMedia = (newMedia: Media[]) => {
        setMedia(newMedia)
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