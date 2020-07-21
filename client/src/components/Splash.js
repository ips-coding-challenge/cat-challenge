import React from "react";

function Splash() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center max-h-screen">
        <div className="w-3/4 h-auto">
          <img
            className="w-auto max-w-full h-64 object-cover"
            src="https://media.giphy.com/media/v6aOjy0Qo1fIA/giphy.gif"
          />
        </div>
        <span className="block">Loading...</span>
      </div>
    </div>
  );
}

export default Splash;
