import { useState } from "react";
import PrimaryButton from "../components/ui/Buttons/PrimaryButton";
import SecondaryButton from "../components/ui/Buttons/SecondaryButton";

export default function Test() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-6 w-[500px]">
        <PrimaryButton
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 3000);
          }}
          disabled={loading}
          loading={loading}
        >
          Button Text
        </PrimaryButton>
        <SecondaryButton disabled={loading} loading={loading}>
          Button Text
        </SecondaryButton>
      </div>
    </div>
  );
}
