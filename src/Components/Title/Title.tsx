import React from "react";
import "./Title.css";

const Title: React.FC = () => {
    return(
        <div className="days_box">
            <div className="day">ND</div>
            <div className="day">PON</div>
            <div className="day">WT</div>
            <div className="day">ŚR</div>
            <div className="day">CZW</div>
            <div className="day">PT</div>
            <div className="day">SOB</div>
        </div>
    )
}

export default Title;