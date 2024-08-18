import Script from "next/script";

export default function AnalysisScript() {
  if (process.env.NODE_ENV === "development") {
    return null;
  }

  return (
    <>
      <Script />
    </>
  );
}
