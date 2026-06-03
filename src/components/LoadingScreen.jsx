import LottieCanvas from "./LottieCanvas";
import runnerAnimation from "../assets/lottie/runner.json";

export default function LoadingScreen() {
  return (
    <div className="loading-screen" role="status" aria-label="Henter side">
      <LottieCanvas
        animationData={runnerAnimation}
        className="loading-runner"
      />
    </div>
  );
}
