import PricingSection from "@/components/PricingSection";

export default function Home({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  return (
    <>
      <PricingSection params={{ locale }} />
    </>
  );
}
