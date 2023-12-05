import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
const PreviewFile = (props) => {
    const {path} = props;
    
  return (
    <>
      <DocViewer
        style={{height:'500px'}}
        documents={[{ uri:`${import.meta.env.VITE_BASE_URL}/${path}`}]}
        pluginRenderers={DocViewerRenderers}
      />
    </>
  );
};

export default PreviewFile;
