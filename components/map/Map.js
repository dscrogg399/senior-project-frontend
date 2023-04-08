import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import style from "./Map.module.css";
import { MapContainer, ImageOverlay } from "react-leaflet";
import { LatLngBounds } from "leaflet";
import ApplianceIndicator from "./ApplianceIndicator";
import ApertureIndicator from "./ApertureIndicator";
import { useRecoilValue } from "recoil";
import {
  appliancesAtom,
  aperturesAtom,
} from "../../atom/appliancesAndAperturesAtom";

export default function Map() {
  const bounds = new LatLngBounds([0, 0], [13.5, 20]);

  const appliances = useRecoilValue(appliancesAtom);
  const apertures = useRecoilValue(aperturesAtom);

  return (
    <MapContainer
      center={[6.75, 10]}
      zoom={6}
      className={style.map}
      scrollWheelZoom={true}
    >
      <ImageOverlay
        url="https://i.imgur.com/DPHT5O3.png"
        bounds={bounds}
        s
        opacity={1}
        zIndex={30}
      />
      {appliances.map((appliance) => (
        <ApplianceIndicator key={appliance.id} appliance={appliance} />
      ))}
      {apertures.map((aperture) => (
        <ApertureIndicator key={aperture.id} aperture={aperture} />
      ))}
    </MapContainer>
  );
}
