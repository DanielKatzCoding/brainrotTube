export interface IVideoData {
  title: string;
  videoId: string;
  description: string;
  likesCount: number;
  commentsCount: number;
}

export interface IVideo {
  data: IVideoData,
  blobURL: string;
}

export interface IMediaHistory {
  videoId: string;
  mediaHistory: string[];
}
