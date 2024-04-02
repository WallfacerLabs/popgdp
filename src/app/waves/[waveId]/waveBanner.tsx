import Image from "next/image";
import globeImage from "@/images/globe.png";

import { Card, CardContent, CardTitle } from "@/components/ui/card";

export const WaveBanner = () => {
  return (
    <Card className="relative flex-row items-center gap-x-10 py-6 pl-10 pr-64">
      <CardTitle>POPGDP</CardTitle>
      <CardContent className="text-xs text-muted-foreground">
        POPGDP is <b>Proof of Personhood based Grant Distribution Platform</b>.
        In its first version it is designed to help Worldcoin Foundation review
        and distribute WLD grants to applicants by sourcing additional “signal”
        from World ID holders.
      </CardContent>
      <Image
        src={globeImage}
        alt=""
        className="absolute bottom-0 right-[32px] h-[125px] w-auto"
      />
    </Card>
  );
};
