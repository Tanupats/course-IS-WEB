import React,{useEffect,useState} from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
const PreviewFile = (props) => {
    const {filePath,id} = props;
    const [src,setSrc] = useState(filePath);

  useEffect(()=>{
      if(id){
          setSrc(id)
      }
  },[])

  return (
    <>
      <DocViewer
        style={{height:'500px'}}
        documents={[{ uri:`${import.meta.env.VITE_BASE_URL}/${src}`}]}
        pluginRenderers={DocViewerRenderers}
      />
    </>
  );
};

export default PreviewFile;
