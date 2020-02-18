import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import DaysSheet from "./DaysSheet/DaysSheet";
import ReservationSheet from "./reservationSheet/ReservationSheet";
import randomColor from "./reservationSheet/randomColor";
import setMonthName from "./monthSwitcher/setMonthName";
import "./Query.css";
import MonthSwitcher from "./monthSwitcher/MonthSwitcher";
import Reservation from "./reservationSheet/reservation.interface";
const GET_RESERVATIONS = gql`
  {
    rezerwacjes {
      przyjazd
      wyjazd
      kwota
      imieINazwiskoGoscia
      iloscGosci
    }
  }
`;
interface response {
  przyjazd: Date;
  wyjazd: Date;
  kwota: Number;
  imieINazwiskoGoscia: string;
  iloscGosci: Number;
  color: string;
  iloscNocy: number;
  booking: string;
  mail: string;
  uwagi: string;
}

const QueryComponent: React.FC = () => {
  const { loading, error, data } = useQuery(GET_RESERVATIONS);
  const [month, setMonth] = useState({
    monthInt: new Date().getUTCMonth(),
    monthName: setMonthName(new Date().getUTCMonth())
  });
  if (loading) return <p>Loading...</p>;
  if (error) {
    return <p>Error :(</p>;
  }
  if (data)
    data.rezerwacjes.map((item: response) => (item.color = `${randomColor()}`));
  const monthReservation = data.rezerwacjes.filter((item: Reservation) => {
    if (new Date(item.przyjazd).getUTCMonth() == month.monthInt) return item;
    if (new Date(item.wyjazd).getUTCMonth() == month.monthInt) return item;
  });
  return (
    <>
      <MonthSwitcher month={month} setMonth={setMonth} />
      <div className="boxOfLayers">
        <DaysSheet monthInt={month.monthInt} />
        <ReservationSheet
          reservations={monthReservation}
          monthInt={month.monthInt}
        />
        )
      </div>
      {monthReservation.map(
        ({
          przyjazd,
          wyjazd,
          kwota,
          imieINazwiskoGoscia,
          iloscGosci,
          color,
          iloscNocy,
          booking,
          mail,
          uwagi
        }: response) => (
          <div key={imieINazwiskoGoscia}>
            <div
              className={"reservationList"}
              style={{ backgroundColor: `${color}` }}
            >
              <div className="option">
                Przyjazd: {new Date(przyjazd).toDateString()}
              </div>
              <div className="option">
                Wyjazd: {new Date(wyjazd).toDateString()}
              </div>
              <div className="option">Ilość nocy: {iloscNocy}</div>
              <div className="option">Kwota: {kwota}PLN</div>
              <div className="option">
                Imię i Nazwisko: {imieINazwiskoGoscia}
              </div>
              <div className="option">Ilość gości: {iloscGosci}</div>
              <div className="option">Z : {booking}</div>
              <div className="option">Mail: {mail}</div>
              <div className="option">Uwagi: {uwagi}</div>
            </div>
          </div>
        )
      )}
    </>
  );
};
export default QueryComponent;
