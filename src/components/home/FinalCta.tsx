import { PuffMascot } from "@/components/brand/PuffMascot";
import { CallButton } from "@/components/location/CallButton";
import { DirectionsButton } from "@/components/location/DirectionsButton";
import { StoreStatus } from "@/components/location/StoreStatus";
import { business } from "@/data/business";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div
        aria-hidden
        className="glow-field bottom-0 left-1/2 h-72 w-[42rem] -translate-x-1/2 opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(128,91,241,0.5) 0%, rgba(98,210,249,0.22) 48%, transparent 72%)",
        }}
      />

      <div className="container-vp relative text-center">
        <PuffMascot
          variant="neon"
          decorative
          className="mx-auto w-36 sm:w-44"
        />

        <h2 className="font-display mt-6 text-4xl uppercase leading-[0.92] tracking-tight sm:text-5xl lg:text-6xl">
          Stop by and
          <br />
          <span className="text-neon-cyan">feel the pulse</span>
        </h2>

        <p className="text-fog-400 mx-auto mt-5 max-w-xl text-base leading-relaxed sm:text-lg">
          {business.address.street}, {business.address.cityLine}. Come talk to
          us — that is still the fastest way to find the right thing.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <DirectionsButton size="lg" className="w-full sm:w-auto" location="final_cta" />
          <CallButton
            size="lg"
            className="w-full sm:w-auto"
            label="Call Store"
            showNumber
            location="final_cta"
          />
        </div>

        <div className="mt-7 flex justify-center">
          <StoreStatus />
        </div>
      </div>
    </section>
  );
}
