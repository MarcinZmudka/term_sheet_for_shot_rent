import React from "react";
import calendarize from "../DaysSheet/calendarize";
import "./ReservationSheet.css";
import Reservation from "./reservation.interface";
interface IProps {
  reservations: Array<any>;
  monthInt: number;
}

const ReservationSheet: React.FC<IProps> = ({ reservations, monthInt }) => {
  const daysOfMonth = calendarize(new Date(new Date().getUTCFullYear(), monthInt), 0);
  let max = 0;
  daysOfMonth.map(weekArray =>
    weekArray.map(day => {
      if (day > max) max = day;
    })
  );
  console.log(max)
  return (
    <>
      {reservations.map((reservation: Reservation) => {
        const arrivalDay = new Date(reservation.przyjazd).getUTCDate();
        const arrivalMonth = new Date(reservation.przyjazd).getMonth() + 1;
        const departureDay = new Date(reservation.wyjazd).getUTCDate();
        const departureMonth = new Date(reservation.wyjazd).getMonth() + 1;
        //console.log(arrivalDay,arrivalMonth, departureDay, departureMonth);
        if (departureMonth == arrivalMonth && departureMonth == monthInt + 1) {
          let arrayOfDivs = [];
          for (let i = 0; i < departureDay - arrivalDay + 1; i++) {
            const [column, row] = findDayInArrays(arrivalDay + i, daysOfMonth);
            const style = {
              display: "grid",
              gridColumnStart: `${column + 1}`,
              gridColumnEnd: `${column + 2}`,
              gridRowStart: `${row + 1}`,
              gridRowEnd: `${row + 2}`,
              backgroundColor: `${reservation.color}`,
              WebkitClipPath: `${firstOrLastDay(i, departureDay - arrivalDay)}`
            };
            arrayOfDivs.push(<div className="test" style={style}></div>);
          }
          return <div className="ReservationsSheet_box">{arrayOfDivs}</div>;
        }
        if (arrivalMonth == monthInt + 1) {
          let arrayOfDivs = [];
          for (let i = 0; i < max - arrivalDay + 1; i++) {
            const [column, row] = findDayInArrays(arrivalDay + i, daysOfMonth);
            const style = {
              display: "grid",
              gridColumnStart: `${column + 1}`,
              gridColumnEnd: `${column + 2}`,
              gridRowStart: `${row + 1}`,
              gridRowEnd: `${row + 2}`,
              backgroundColor: `${reservation.color}`,
              WebkitClipPath: `${firstOrLastDay(i, departureDay - arrivalDay)}`
            };
            arrayOfDivs.push(<div className="test" style={style}></div>);
          }
          return <div className="ReservationsSheet_box">{arrayOfDivs}</div>;
        }
        if(departureMonth == monthInt + 1){
          let arrayOfDivs = [];
          for (let i = 1; i < departureDay + 1; i++) {
            const [column, row] = findDayInArrays(i, daysOfMonth);
            const style = {
              display: "grid",
              gridColumnStart: `${column + 1}`,
              gridColumnEnd: `${column + 2}`,
              gridRowStart: `${row + 1}`,
              gridRowEnd: `${row + 2}`,
              backgroundColor: `${reservation.color}`,
              WebkitClipPath: `${firstOrLastDay(i, departureDay)}`
            };
            arrayOfDivs.push(<div className="test" style={style}></div>);
          }
          return <div className="ReservationsSheet_box">{arrayOfDivs}</div>;
        }
      })}
    </>
  );
};
const firstOrLastDay = (index: number, end: number) => {
  if (index == 0) return "polygon(0 0, 100% 100%, 100% 0)";
  if (index == end) return "polygon(0 0, 0% 100%, 100% 100%)";
  return "";
};
const findDayInArrays = (
  numberOfDay: number,
  daysOfMonth: Array<Array<Number>>
) => {
  let column = 0,
    row = 0;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 7; j++) {
      if (daysOfMonth[i][j] == numberOfDay) {
        column = j;
        row = i;
      }
    }
  }
  return [column, row];
};

export default ReservationSheet;
