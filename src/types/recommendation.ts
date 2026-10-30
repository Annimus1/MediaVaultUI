export interface Recommendation {
  name: string;
  mediaType: string;
  reason: string;
  matchPercentage: number;
  poster: string;
  isbn?: string;
}
