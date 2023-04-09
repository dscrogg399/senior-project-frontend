import { useMemo, useEffect } from "react";
import Panel from "../../../ui/Containers/Panel";
import PanelLabel from "../../../ui/Labels/PanelLabel";
import { useTable, useSortBy } from "react-table";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useRecoilValue } from "recoil";
import { eventsAtom } from "../../../../atom/eventsAtom";

export default function EventLog() {
  const events = useRecoilValue(eventsAtom);
  const data = useMemo(() => events, [events]);
  const columns = useMemo(
    () => [
      {
        Header: "Appliance",
        accessor: "appliance_name",
      },
      {
        Header: "On At",
        accessor: "on_at",
      },
      {
        Header: "Off At",
        accessor: "off_at",
      },
      {
        Header: "Watts Used",
        accessor: "wattage_used",
      },
      {
        Header: "Water Used",
        accessor: "water_used",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    toggleSortBy,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  useEffect(() => {
    toggleSortBy("on_at", true);
  }, [events]);

  return (
    <Panel className="h-full">
      <PanelLabel>Event Log</PanelLabel>
      <div className="mx-3 my-2 pr-6 flex w-full h-[35vh] rounded-md 2xl:h-[40vh]">
        <table
          {...getTableProps()}
          className="min-w-full divide-y overflow-y-auto border-gray-800 border-2 divide-gray-400 flex flex-col items-center"
        >
          <thead className="bg-gray-700 w-full">
            {headerGroups.map((headerGroup) => (
              <tr
                key={headerGroup.id}
                {...headerGroup.getHeaderGroupProps()}
                className="w-full flex flex-row justify-around"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-3 py-3.5 text-left inline-flex space-x-2 text-sm font-semibold text-white"
                  >
                    <span>{column.render("Header")}</span>
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ChevronDownIcon className="text-white h-5 w-5" />
                        ) : (
                          <ChevronUpIcon className="text-white h-5 w-5" />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-gray-600 w-full">
            {rows.map((row, rowIdx) => {
              prepareRow(row);
              return (
                <tr
                  key={row.id}
                  {...row.getRowProps()}
                  className={
                    (rowIdx % 2 === 0 ? undefined : "bg-gray-700 ") +
                    "w-full flex flex-row justify-around"
                  }
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        {...cell.getCellProps()}
                        className="px-3 py-4 text-sm text-left w-full text-white"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
