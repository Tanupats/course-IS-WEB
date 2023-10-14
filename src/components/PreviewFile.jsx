import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
const PreviewFile = (props) => {
    const {filePath} = props;
  return (
    <>
      <DocViewer
        style={{height:'500px'}}
        documents={[{ uri: "http://localhost:3000/" +filePath }]}
        pluginRenderers={DocViewerRenderers}
      />
    </>
  );
};

export default PreviewFile;
