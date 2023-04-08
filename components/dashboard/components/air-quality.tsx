import Panel from "../../ui/Containers/Panel";
import Row from "../../ui/Containers/Row";
import PanelLabel from "../../ui/Labels/PanelLabel";

export default function AirQuality() {
  const air_quality = {
    co_level: 20,
    co2_level: 566,
    humidity: 0.55,
    pm_level: 20,
  };

  const headingStyle = "text-2xl font-semibold";
  const measureStyle = "font-semibold";
  const panelStyle = "p-4 items-center justify-center";
  return (
    <Panel>
      <PanelLabel>Air Quality</PanelLabel>
      <div className="grid grid-cols-2 w-full h-full">
        {/* CO */}
        <Panel
          className={`${panelStyle} ${
            air_quality.co_level > 150
              ? "bg-hError"
              : air_quality.co_level > 50
              ? "bg-hWarning"
              : "bg-gray-600"
          }`}
        >
          <Row className="w-full h-full items-center justify-between">
            <h2 className={headingStyle}>CO</h2>
            <p className={measureStyle}>{air_quality.co_level} PPM</p>
          </Row>
        </Panel>
        {/* CO2 */}
        <Panel
          className={`${panelStyle} ${
            air_quality.co2_level > 5000
              ? "bg-hError"
              : air_quality.co2_level > 1000
              ? "bg-hWarning"
              : "bg-gray-600"
          }`}
        >
          <Row className="w-full h-full items-center justify-between">
            <h2 className={headingStyle}>
              CO<sub>2</sub>
            </h2>
            <p className={measureStyle}>{air_quality.co2_level} PPM</p>
          </Row>
        </Panel>
        {/* humidity */}
        <Panel
          className={`${panelStyle} ${
            air_quality.humidity > 0.7
              ? "bg-hError"
              : air_quality.humidity > 0.6
              ? "bg-hWarning"
              : air_quality.humidity < 0.3
              ? "bg-hWarning"
              : "bg-gray-600"
          }`}
        >
          <Row className="w-full h-full items-center justify-between">
            <h2 className={headingStyle}>
              H<sub>2</sub>O
            </h2>
            <p className={measureStyle}>
              {air_quality.humidity.toLocaleString(undefined, {
                style: "percent",
                maximumFractionDigits: 1,
              })}
            </p>
          </Row>
        </Panel>
        {/* pm */}
        <Panel
          className={`${panelStyle} ${
            air_quality.pm_level > 50
              ? "bg-hError"
              : air_quality.pm_level > 35
              ? "bg-hWarning"
              : "bg-gray-600"
          }`}
        >
          <Row className="w-full h-full items-center justify-between">
            <h2 className={headingStyle}>PM2.5</h2>
            <p className={measureStyle}>
              {air_quality.pm_level} &#181;g/m<sup>3</sup>
            </p>
          </Row>
        </Panel>
      </div>
    </Panel>
  );
}
