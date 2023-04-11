import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";

import { AudioRecorder } from "../components/AudioRecorder";

// const { Cart } = dynamic(() => import("cart").then((mod) => mod.Cart), {
//   suspense: true,
// });
import "../firebase.config";
import { database } from "../firebase.config";
import { get, onValue, ref } from "firebase/database";

export default function Web() {
  const read = () => {
    const rootRef = ref(database);
    onValue(rootRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
    get(rootRef).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    });
  };
  useEffect(() => {
    read();
  }, []);
  return (
    <div>
      <h1>Web</h1>

      <audio id="audio" src=""></audio>
      <Suspense fallback="...Loading">{/* <Cart /> */}</Suspense>
      <AudioRecorder />
    </div>
  );
}
