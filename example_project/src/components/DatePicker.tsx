import React, { useState } from "react";

type Range = {
  start: Date | null;
  end: Date | null;
};

const RangeDatePicker: React.FC = () => {
  const [show, setShow] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [appliedRange, setAppliedRange] = useState<Range>({
    start: null,
    end: null,
  });

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  };

  const getDisplayText = () => {
    if (appliedRange.start && appliedRange.end) {
      return `${formatDate(appliedRange.start)} - ${formatDate(
        appliedRange.end
      )}`;
    }
    return "Select Date Range";
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const dates: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) dates.push(null);
    for (let i = 1; i <= totalDays; i++) dates.push(i);

    return dates;
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const handleSelect = (day: number) => {
    const clickedDate = new Date(currentDate);
    clickedDate.setDate(day);

    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
    } else {
      if (clickedDate < startDate) {
        setEndDate(startDate);
        setStartDate(clickedDate);
      } else {
        setEndDate(clickedDate);
      }
    }
  };

  const isSameDay = (d1: Date | null, d2: Date) => {
    return (
      d1 &&
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  const isInRange = (day: number) => {
    if (!startDate || !endDate) return false;

    const date = new Date(currentDate);
    date.setDate(day);

    return date >= startDate && date <= endDate;
  };

  const handleApply = () => {
    setAppliedRange({ start: startDate, end: endDate });
    setShow(false);
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setAppliedRange({ start: null, end: null });
  };

  const dates = getDaysInMonth(currentDate);

  return (
    <div style={{ position: "relative" }}>
      {/* Button */}
      <button onClick={() => setShow(!show)}>
        {getDisplayText()}
      </button>

      {show && (
        <div className="calendar">
          {/* Header */}
          <div className="header">
            <span>
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <div>
              <button onClick={() => changeMonth(-1)}>◀</button>
              <button onClick={() => changeMonth(1)}>▶</button>
            </div>
          </div>

          {/* Days */}
          <div className="grid header-days">
            {days.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Dates */}
          <div className="grid">
            {dates.map((d, i) => {
              if (!d) return <div key={i}></div>;

              const dateObj = new Date(currentDate);
              dateObj.setDate(d);

              const isStart = isSameDay(startDate, dateObj);
              const isEnd = isSameDay(endDate, dateObj);
              const inRange = isInRange(d);

              return (
                <div
                  key={i}
                  className={`cell 
                    ${isStart ? "start" : ""} 
                    ${isEnd ? "end" : ""} 
                    ${inRange ? "range" : ""}`}
                  onClick={() => handleSelect(d)}
                >
                  {d}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="footer">
            <button onClick={handleReset}>Reset</button>
            <button className="apply" onClick={handleApply}>
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .calendar {
          position: absolute;
          top: 40px;
          width: 280px;
          background: #fff;
          border-radius: 12px;
          padding: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 6px;
        }

        .header-days {
          font-size: 12px;
          color: #777;
        }

        .cell {
          text-align: center;
          padding: 8px;
          border-radius: 50%;
          cursor: pointer;
        }

        .cell:hover {
          background: #f2f2f2;
        }

        .start, .end {
          background: #ffc107;
          font-weight: bold;
        }

        .range {
          background: #fff3cd;
          border-radius: 0;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          margin-top: 12px;
        }

        .apply {
          background: #ffc107;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default RangeDatePicker;
