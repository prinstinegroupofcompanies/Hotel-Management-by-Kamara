import Navbar from "./Navbar";
import { useHotel } from "../context/HotelContext";

export const History = () => {
  const { history } = useHotel();

  return (
    <Navbar>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Checkout History</h1>
          <p className="text-gray-500 mt-2">
            Completed guest check-outs appear here after they are removed from
            the active lists.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="text-xl font-semibold">History Records</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left">Guest</th>
                  <th className="p-4 text-left">Room</th>
                  <th className="p-4 text-left">Check-In</th>
                  <th className="p-4 text-left">Check-Out</th>
                  <th className="p-4 text-left">Amount</th>
                  <th className="p-4 text-left">Checked Out At</th>
                </tr>
              </thead>

              <tbody>
                {history.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center p-8 text-gray-500">
                      No checkout history yet.
                    </td>
                  </tr>
                )}

                {history.map((entry) => (
                  <tr key={entry.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">
                      <p>{entry.guestName}</p>
                      <p className="text-sm text-gray-500">{entry.email}</p>
                    </td>
                    <td className="p-4">
                      <p>{entry.roomNumber}</p>
                      <p className="text-sm text-gray-500">{entry.roomType}</p>
                    </td>
                    <td className="p-4">{entry.checkInDate}</td>
                    <td className="p-4">{entry.checkOutDate}</td>
                    <td className="p-4">${entry.amount}</td>
                    <td className="p-4">
                      {new Date(entry.checkedOutAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Navbar>
  );
};
export default History;
