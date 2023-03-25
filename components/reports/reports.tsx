import Row from "../ui/Containers/Row";

export default function ReportsPage() {
  return (
    <div className="flex flex-col h-full w-full">
      {/* selecter, edit budget button, and warnings */}
      <section className="bg-red-300 flex flex-row justify-between items-center px-4 w-full h-[8%]">
        {/* selector and edit budget button */}
        <Row>
          {/* month selector */}
          <div className="bg-green-300 flex h-full">Month</div>
          {/* year selector */}
          <div className="bg-purple-300 flex h-full">Year</div>
          {/* edit budget button */}
          <div className="bg-yellow-300 flex h-full">Edit Budget</div>
        </Row>
        {/* warnings */}
        <Row>
          <div className="bg-blue-300 flex h-full">Warning</div>
        </Row>
      </section>
      {/* graph */}
      <section className="flex flex-grow flex-col">
        {/* data */}
        <div className="bg-blue-300 flex flex-grow w-full px-4">Graph</div>
        {/* legend */}
        <div className="bg-orange-300 flex w-full h-[5%] px-4">
          {/* legend items */}
          <Row>
            <div className="bg-green-300 flex h-full">Legend</div>
            <div className="bg-purple-300 flex h-full">Legend</div>
            <div className="bg-yellow-300 flex h-full">Legend</div>
          </Row>
        </div>
      </section>
    </div>
  );
}
