export interface IMediaContent {
  title: string;
  description: string;
  mediaPath: string;
  likesCount: number;
  commentsCount: number;
}

export interface IMediaHistory {
  currIndex: number;
  mediaHistory: number[];
}
