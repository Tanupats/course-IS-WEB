import React,{useEffect,useState} from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import axios from "axios";
const PreviewFile = (props) => {
    const {filePath,id} = props;

    const [src,setSrc] = useState(filePath);

    const getFile = ()=>{

      axios.get(`${import.meta.env.VITE_BASE_URL}/document/${id}`)
      .then(res=>{  
         setSrc(res.data[0].filePath)    
      })

  }
  useEffect(()=>{
      if(id){
        getFile()
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
