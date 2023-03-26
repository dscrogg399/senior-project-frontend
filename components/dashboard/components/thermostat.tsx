import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Col from "../../ui/Containers/Col";
import Panel from "../../ui/Containers/Panel";
import SubPanel from "../../ui/Containers/SubPanel";
import PanelLabel from "../../ui/Labels/PanelLabel";
import Row from "../../ui/Containers/Col";
import { useState } from "react";

export default function Thermostat() {
  const [currTemp, setCurrTemp] = useState(72);
  function increment() {
    setCurrTemp(currTemp + 1);
  }
  function decrement() {
    setCurrTemp(currTemp - 1);
  }
  return (
    <Panel>
      <PanelLabel>Thermostat</PanelLabel>
      <Col className="w-full h-full mt-2 justify-start items-center">
        <SubPanel className="w-2/3 items-center p-8 bg-gray-600">
          <h3 className="text-4xl font-semibold">72</h3>
        </SubPanel>
        <form className="w-2/3">
          <Col className="items-center justify-center w-full">
            <div className="flex flex-row items-center justify-between my-1 w-full">
              <h3 className="font-semibold">Current Temp</h3>
              <div className="relative w-[100px] h-[40px] bg-transparent overflow-hidden rounded-full">
                <button
                  className="inline-block w-[50px] h-full transition ease-in-out duration-200 bg-hPurple-500 border-none text-white text-xl pr-[20px] hover:bg-hPurple-400 active:bg-hPurple-300"
                  type="button"
                  onClick={decrement}
                >
                  &minus;
                </button>
                <span className="absolute font-semibold left-1/2 -ml-[20px] inline-block bg-white h-full w-[40px] text-center leading-10 rounded-full text-base text-hPurple-500 tracking-[-1px]">
                  {currTemp}
                </span>
                <button
                  type="button"
                  onClick={increment}
                  className="inline-block w-[50px] h-full transition ease-in-out duration-200 bg-hPurple-500 border-none text-white text-xl pl-[20px] hover:bg-hPurple-400 active:bg-hPurple-300"
                >
                  &#43;
                </button>
              </div>
            </div>
          </Col>
        </form>
      </Col>
    </Panel>
  );
}
