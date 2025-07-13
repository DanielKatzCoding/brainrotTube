"use client"
import { useQuery } from "@tanstack/react-query";
import { IVideoData, IVideo } from "@/app/interfaces/interfaces";
import axios from "axios";
import { apiURL } from "../../MainComponent";

function Media() {
  const { data, isLoading, error } = useQuery<IVideo>({
    queryKey: ['video'],
    queryFn: async () => {
      const videoData = await axios.get<IVideoData>(apiURL+"/get_video");
      const blobRes = await axios.get<Blob>(apiURL+"/media", { responseType: "blob" });
      const blobUrl = URL.createObjectURL(blobRes.data);
      const video: IVideo = {
        data: videoData.data,
        blobURL: blobUrl
      }

      return video;
    }
  });

  if (isLoading) return {status: "loading", data: null};
  if (error) return {status: "error", data: null}

  return (
    {status: "ok", data: data}
  );
}

export default Media;