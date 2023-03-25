export default function ControlPanelPage() {
  return (
    <div className="grid grid-cols-1 w-full h-full lg:grid-cols-2">
      {/* status toggle lists */}
      <section className="grid grid-cols-2">
        {/* appliances */}
        <div className="bg-green-300">Appliance List</div>
        {/* apertures */}
        <div className="bg-yellow-300">Aperture List</div>
      </section>
      {/* event generator/air quality and event log */}
      <section className="bg-blue-300 grid grid-cols-1">
        {/* event generator/air quality */}
        <div className="w-full bg-red-300">Event Generator</div>
        {/* event log */}
        <div className="w-full bg-purple-300">Event Log</div>
      </section>
    </div>
  );
}
