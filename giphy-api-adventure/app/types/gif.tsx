export  type Gif = {
  id: string;
  title: string;
  url: string
  images: {
    fixed_width: {
      url: string;
    };
    original_mp4:{
      mp4:string;
    }
  };
};