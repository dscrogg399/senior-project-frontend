import { useRecoilState } from "recoil";
import Panel from "../../../ui/Containers/Panel";
import PanelLabel from "../../../ui/Labels/PanelLabel";
import { aperturesAtom } from "../../../../atom/appliancesAndAperturesAtom";
import { useState } from "react";
import { Aperture } from "../../../../types/Aperture";
import SearchInput from "../SearchInput";
import Row from "../../../ui/Containers/Row";
import ToggleSwitch from "../../../ui/Buttons/ToggleSwitch";
import Image from "next/image";

const icons = {
  1: "https://cdn-icons-png.flaticon.com/512/515/515094.png",
  2: "https://cdn-icons-png.flaticon.com/512/2401/2401126.png",
};

export default function ApertureList() {
  //state
  const [apertures, setApertures] = useRecoilState(aperturesAtom);
  const [query, setQuery] = useState("");

  //filter appliances by query
  let filteredApertures =
    query === ""
      ? apertures
      : apertures.filter((aperture: Aperture) =>
          aperture.title.toLowerCase().includes(query.toLowerCase())
        );
  return (
    <Panel className="h-full">
      <PanelLabel>Aperture List</PanelLabel>
      <SearchInput id="search-apertures" query={query} setQuery={setQuery} />
      <Row className="w-full border-b-2 border-gray-800 ">
        <p className="w-3/5 p-3">Aperture</p>
        <p className="w-2/5 p-3 border-l-2 border-gray-800">Status</p>
      </Row>
      <ul className="overflow-y-auto max-h-[69vh] 2xl:max-h-[80vh]">
        {filteredApertures.map((aperture: Aperture) => (
          <li key={aperture.id}>
            <Row className="w-full border-b-2 border-gray-800 ">
              <Row className="w-3/5 p-3 space-x-4">
                <div className="bg-hPurple-400 w-8 h-8 relative rounded-full">
                  <Image
                    fill
                    src={icons[aperture.type as keyof typeof icons]}
                    alt={`${aperture.title} icon`}
                    className="p-1"
                  />
                </div>
                <span>{aperture?.title}</span>
              </Row>
              <div className="w-2/5 flex items-center justify-center">
                <ToggleSwitch
                  enabled={aperture?.status}
                  setEnabled={() => {
                    setApertures(
                      apertures.map((app) => {
                        if (app.id === aperture.id) {
                          return {
                            ...app,
                            status: !app.status,
                          };
                        } else {
                          return app;
                        }
                      })
                    );
                  }}
                />
              </div>
            </Row>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
