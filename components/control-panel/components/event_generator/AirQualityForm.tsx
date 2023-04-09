import { useRecoilState } from "recoil";
import { airQualityAtom } from "../../../../atom/thermoAndAirAtom";
import { SubmitHandler, useForm } from "react-hook-form";
import Col from "../../../ui/Containers/Col";
import Select from "../../../ui/Forms/Select";
import { useEffect, useState } from "react";
import PrimaryButton from "../../../ui/Buttons/PrimaryButton";
import Panel from "../../../ui/Containers/Panel";
import AirQualInput from "../../../ui/Forms/AirQualInput";
import { AirQuality } from "../../../../types/AirQuality";
import { Tooltip } from "react-tooltip";

interface IFormInput {
  value: number;
}

let selectItems = [
  { title: "CO", value: "co_level" },
  { title: "CO2", value: "co2_level" },
  { title: "Humidity", value: "humidity" },
  { title: "PM 2.5", value: "pm_level" },
];

export default function AppliancesForm() {
  //state
  const [airQuality, setAirQuality] = useRecoilState(airQualityAtom);
  const [selectedValue, setSelectedValue] = useState(selectItems[0]);

  //styles
  const headingStyle = "text-lg font-semibold";
  const measureStyle = "text-sm font-semibold";
  const panelStyle = "p-2 items-center justify-center";

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      value: airQuality[selectedValue.value as keyof AirQuality],
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    let payload;
    if (selectedValue.value === "co_level") {
      payload = { ...airQuality, co_level: data.value };
      setAirQuality(payload);
      return;
    }
    if (selectedValue.value === "co2_level") {
      payload = { ...airQuality, co2_level: data.value };
      setAirQuality(payload);
      return;
    }
    if (selectedValue.value === "pm_level") {
      payload = { ...airQuality, pm_level: data.value };
      setAirQuality(payload);
      return;
    }
    if (selectedValue.value === "humidity") {
      payload = { ...airQuality, humidity: data.value / 100 };
      setAirQuality(payload);
      return;
    }
  };

  //on select change, change default value
  useEffect(() => {
    if (selectedValue.value === "humidity") {
      let currVal = airQuality[selectedValue.value as keyof AirQuality] * 100;

      setValue("value", Math.round(currVal));
      return;
    }
    setValue("value", airQuality[selectedValue.value as keyof AirQuality]);
  }, [selectedValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex flex-row items-center mx-4"
    >
      <Col className="w-3/5 ml-4 pr-8 h-full justify-evenly">
        <div className="grid grid-cols-2 w-full h-full">
          {/* CO */}
          <Panel
            className={`${panelStyle} ${
              airQuality.co_level > 150
                ? "bg-hError"
                : airQuality.co_level > 50
                ? "bg-hWarning"
                : "bg-gray-600"
            }`}
          >
            <div
              data-tooltip-id="co"
              data-tooltip-content={`${
                airQuality.co_level > 150
                  ? "CO level is dangerously high."
                  : `${
                      airQuality.co_level > 50
                        ? "CO level is higher than acceptable levels."
                        : "CO level is acceptable."
                    }`
              }`}
              className="flex flex-col w-full h-full items-center justify-evenly"
            >
              <h2 className={headingStyle}>CO</h2>
              <p className={measureStyle}>{airQuality.co_level} PPM</p>
              <Tooltip id="co" place="top" />
            </div>
          </Panel>
          {/* CO2 */}
          <Panel
            className={`${panelStyle} ${
              airQuality.co2_level > 5000
                ? "bg-hError"
                : airQuality.co2_level > 1000
                ? "bg-hWarning"
                : "bg-gray-600"
            }`}
          >
            <div
              className="flex flex-col w-full h-full items-center justify-evenly"
              data-tooltip-id="co2"
              data-tooltip-content={`${
                airQuality.co2_level > 5000
                  ? "CO2 level is dangerously high."
                  : `${
                      airQuality.co2_level > 1000
                        ? "CO2 level is higher than acceptable levels."
                        : "CO2 level is acceptable."
                    }`
              }`}
            >
              <h2 className={headingStyle}>
                CO<sub>2</sub>
              </h2>
              <p className={measureStyle}>{airQuality.co2_level} PPM</p>
              <Tooltip id="co2" place="top" />
            </div>
          </Panel>
          {/* humidity */}
          <Panel
            className={`${panelStyle} ${
              airQuality.humidity > 0.7
                ? "bg-hError"
                : airQuality.humidity > 0.6
                ? "bg-hWarning"
                : airQuality.humidity < 0.3
                ? "bg-hWarning"
                : "bg-gray-600"
            }`}
          >
            <div
              className="flex flex-col w-full h-full items-center justify-evenly"
              data-tooltip-id="humidity"
              data-tooltip-content={`${
                airQuality.humidity > 0.7
                  ? "Humidity level is too high."
                  : airQuality.humidity > 0.6
                  ? "Humidity level is higher than acceptable levels."
                  : airQuality.humidity < 0.3
                  ? "Humidity level is lower than acceptable levels."
                  : "Humidity level is acceptable."
              }`}
            >
              <h2 className={headingStyle}>
                H<sub>2</sub>O
              </h2>
              <p className={measureStyle}>
                {airQuality.humidity.toLocaleString(undefined, {
                  style: "percent",
                  maximumFractionDigits: 1,
                })}
              </p>
              <Tooltip id="humidity" place="top" />
            </div>
          </Panel>
          {/* pm */}
          <Panel
            className={`${panelStyle} ${
              airQuality.pm_level > 50
                ? "bg-hError"
                : airQuality.pm_level > 35
                ? "bg-hWarning"
                : "bg-gray-600"
            }`}
          >
            <div
              className="flex flex-col w-full h-full items-center justify-evenly"
              data-tooltip-id="pm"
              data-tooltip-content={`${
                airQuality.pm_level > 50
                  ? "Particulate matter level is dangerously high."
                  : `${
                      airQuality.pm_level > 35
                        ? "Particulate matter level is higher than acceptable levels."
                        : "Particulate matter level is acceptable."
                    }`
              }`}
            >
              <h2 className={headingStyle}>PM2.5</h2>
              <p className={measureStyle}>
                {airQuality.pm_level} &#181;g/m<sup>3</sup>
              </p>
              <Tooltip id="pm" place="top" />
            </div>
          </Panel>
        </div>
      </Col>
      <Col className="w-2/5 h-full mr-12 pl-8 justify-evenly">
        <Select
          items={selectItems}
          setSelected={setSelectedValue}
          label={"Category"}
          selected={selectedValue}
        />
        <AirQualInput
          id="value"
          label="Value"
          register={register}
          errors={errors}
          units={
            selectedValue.value === "co_level" ? (
              <span>PPM</span>
            ) : selectedValue.value === "co2_level" ? (
              <span>PPM</span>
            ) : selectedValue.value === "humidity" ? (
              <span>%</span>
            ) : selectedValue.value === "pm_level" ? (
              <span>
                &#181;g/m<sup>3</sup>
              </span>
            ) : (
              ""
            )
          }
          min={0}
          max={selectedValue.value === "humidity" ? 100 : undefined}
        />
        <div className="mt-2">
          <PrimaryButton type="submit">Set Value</PrimaryButton>
        </div>
      </Col>
    </form>
  );
}
