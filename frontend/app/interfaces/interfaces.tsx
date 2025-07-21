export interface IVideoData {
  title: string;
  description: string;
  videoUrl: string;
  likesCount: number;
  commentsCount: number;
}

export interface IMediaHistory {
  currIndex: number;
  mediaHistory: IVideoData[];
}
