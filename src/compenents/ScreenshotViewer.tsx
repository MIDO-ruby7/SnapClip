// Responsibility(責務)：スクリーンショット画像を表示すること

import React from 'react';

type ScreenshotViewerProps = {
  screenshotUrl: string;
}

const ScreenshotViewer = ({ screenshotUrl }: ScreenshotViewerProps) => {
  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Screenshot</title>
        <style>
          {`
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
            img {
              max-width: 100%;
              max-height: 100%;
              border: 1px solid #ccc;
            }
          `}
        </style>
      </head>
      <body>
        <img src={screenshotUrl} alt="Captured Screenshot" />
      </body>
    </>
  );
};

export default ScreenshotViewer;
