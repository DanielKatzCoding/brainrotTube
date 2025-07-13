import VideoContent from "./videoComponents/VideoContent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Media from "./videoComponents/VideoContent/fetchData";

export const apiURL = "http://localhost:8000/api";

const MainComponent = () => {
  const queryClient = new QueryClient();
  const media = Media();

  while (true) {
    if (media.status == "loading") {
      console.log("loading");
    }

    else if (media.status == "ok") {
      console.log("ok");
      console.log(media.data?.blobURL);
      console.log(media.data?.data.videoId);
      console.log(media.data?.data.title);
      break;
    }
  
  }
  return (
    <QueryClientProvider client={queryClient}>  
      {/* <VideoContent /> */}      
    </QueryClientProvider>    
  )
}

export default MainComponent