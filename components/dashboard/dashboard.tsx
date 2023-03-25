export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full w-full lg:flex-row">
      {/* floor plan */}
      <section className="flex h-full bg-red-300 lg:w-2/3">Floor Plan</section>
      {/* thermo and air quality */}
      <section className="grid grid-cols-2 h-full bg-green-300 lg:grid-cols-1 lg:w-1/3">
        {/* thermostat */}
        <div className="flex flex-grow bg-blue-300">Thermostat</div>
        {/* air quality */}
        <div className="flex flex-grow w-full bg-orange-300">Air Quality</div>
      </section>
    </div>
  );
}
