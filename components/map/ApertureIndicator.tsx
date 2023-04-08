import Col from "../ui/Containers/Col";
import Image from "next/image";
import Row from "../ui/Containers/Row";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { Aperture } from "../../types/Aperture";
import { aperturesAtom } from "../../atom/appliancesAndAperturesAtom";
import { useRecoilState } from "recoil";

const icons = {
  1: "https://cdn-icons-png.flaticon.com/512/515/515094.png",
  2: "https://cdn-icons-png.flaticon.com/512/2401/2401126.png",
};

export default function ApertureIndicator({
  aperture,
}: {
  aperture: Aperture;
}) {
  const [apertures, setApertures] = useRecoilState(aperturesAtom);

  let apertureOff = new Icon({
    iconUrl: "https://i.imgur.com/VLWJJFc.png",
    iconSize: [30, 30],
  });

  let apertureOn = new Icon({
    iconUrl: "https://i.imgur.com/T4mLqPl.png",
    iconSize: [35, 35],
  });

  //function that finds the current aperture in the state and changes its status
  // const toggleAperture = () => {
  //   const newApertures = apertures.map((ap) => {
  //     if (ap.id === aperture.id) {
  //       return { ...ap, status: !ap.status };
  //     }
  //     return ap;
  //   });
  //   setApertures(newApertures);
  // };

  return (
    <Marker
      position={[aperture.x, aperture.y]}
      icon={aperture.status ? apertureOn : apertureOff}
    >
      <Popup closeButton={false} maxWidth={1000}>
        <div className="w-full bg-white text-black">
          <Col className="w-full items-center space-y-2">
            <div className="bg-hPurple-400 w-16 h-16 relative rounded-full">
              <Image
                fill
                src={icons[aperture.type as keyof typeof icons]}
                alt={`${aperture.title} icon`}
                className="p-3"
              />
            </div>
            <h3 className="font-semibold pt-3 text-center text-md">
              {aperture.title}
            </h3>

            {aperture.status ? (
              <Row className="space-x-2 w-full justify-center">
                <p className="bg-hPurple-400 p-1 px-2 rounded-xl font-medium">
                  On
                </p>
              </Row>
            ) : (
              <Row className="space-x-2 w-full justify-center">
                <p className="bg-gray-400 p-1 px-2 rounded-xl font-medium">
                  Off
                </p>
              </Row>
            )}
          </Col>
        </div>
      </Popup>
    </Marker>
  );
}