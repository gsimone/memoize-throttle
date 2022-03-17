import { useEffect, useRef, useState } from "react";
import { useControls } from "leva";
import "./App.css";

import { memoizedThrottle } from "@gsimone/memoize-throttle";

function App() {
  const ghost = useRef<HTMLDivElement>(null!);
  const div = useRef<HTMLDivElement>(null!);

  const { throttle } = useControls({
    throttle: {
      min: 0,
      max: 10000,
      value: 32 * 4,
    },
  });

  // now the getBoundingClientRect fetch only happens once every 300ms
  const debouncedThing = memoizedThrottle(() => {
    ghost.current!.style.width = `${
      div.current!.getBoundingClientRect().width
    }px`;

    return Math.floor(performance.now());
  }, throttle);

  const anim = () => {
    div.current!.style.width = `${
      (Math.sin(performance.now() / 1000) + 1 * 0.5) * 200 + 200
    }px`;
    debouncedThing();
  };

  useEffect(() => {
    // @todo need to make this a thing that works :)
    const loop = () => {
      window.requestAnimationFrame(() => {
        anim();
        loop();
      });
    };

    window.cancelAnimationFrame(loop);

    loop();
  }, [debouncedThing]);

  return (
    <div className="App">
      <div className="ghost" ref={ghost} />
      <div className="div" ref={div} />
    </div>
  );
}

export default App;
