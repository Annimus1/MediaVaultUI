import React from "react";

/**
 * Represents a media item in the application.
 * @typedef {Object} Media
 * @property {string} _id - Unique identifier for the media.
 * @property {string} owner - Owner of the media item.
 * @property {string} name - Name or title of the media.
 * @property {string} completedDate - Date when the media was completed.
 * @property {number} score - Score or rating of the media.
 * @property {string} poster - URL to the poster image.
 * @property {string} mediaType - Type of media (e.g., movie, series, etc.).
 * @property {string} language - Language of the media.
 * @property {string} [comment] - Optional comment about the media.
 */
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

/**
 * Context type for managing media state and pagination.
 * @typedef {Object} MediaContextType
 * @property {Media[]} media - Array of media items.
 * @property {React.ReactNode} children - Child components.
 * @property {(newMedia: Media[]) => void} updateMedia - Function to update the media array.
 * @property {number} currentAmount - Current page or amount for pagination.
 * @property {number} totalAmount - Total number of pages or items.
 * @property {(amount: number) => void} setTotalAmount - Function to set the total amount.
 * @property {(amount: number) => void} setCurrentAmount - Function to set the current amount.
 */
interface MediaContextType {
    media: Media[];
    children: React.ReactNode;
    updateMedia: (newMedia: Media[]) => void;
    currentAmount: number;
    totalAmount: number;
    setTotalAmount: (amount: number) => void;
    setCurrentAmount: (amount: number) => void;
}

/**
 * Props for the MediaProvider component.
 * @typedef {Object} MediaContextProps
 * @property {React.ReactNode} children - Child components to be wrapped by the provider.
 */
interface MediaContextProps {
    children: React.ReactNode;
}

/**
 * React context for media state management.
 * @type {React.Context<MediaContextType | null>}
 */
export const MediaContext = React.createContext<MediaContextType | null>(null);

/**
 * MediaProvider component that supplies media state and actions to its children via context.
 * @param {MediaContextProps} props - The props for the provider.
 * @returns {JSX.Element} The provider component wrapping its children.
 */
export const MediaProvider: React.FC<MediaContextProps> = ({ children }) => {
    const [media, setMedia] = React.useState<Media[]>([]);
    const [currentAmount, setCurrentAmount] = React.useState<number>(1);
    const [totalAmount, setTotalAmount] = React.useState<number>(1);

    /**
     * Updates the media array in state.
     * @param {Media[]} newMedia - The new media array to set.
     */
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