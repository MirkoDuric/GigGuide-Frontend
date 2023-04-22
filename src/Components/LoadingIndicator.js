import { RotatingLines } from "react-loader-spinner";

export default function LoadingIndicator() {
  return (
    //displays three dots loader
    <div
      style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RotatingLines
        strokeColor="ivory"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
}
