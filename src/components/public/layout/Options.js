import React from 'react'

export default function Options({ date, year, month, onChange }) {
    let content = null;
    if (date) {
        const dates = [];
        for (let i = 1; i <= 31; i++) {
            dates.push(i);
        }

        content =
            <select
                value={date}
                name="birthDate"
                onChange={onChange}
                className="form-control form-control-pink">
                {
                    dates.map(date =>
                        <option
                            key={date}
                            value={date}
                            className="dropdown-item"
                        >
                            {date}
                        </option>)
                }
            </select>

    }

    else if (month) {
        const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

        content =
            <select
                value={month}
                name="birthMonth"
                onChange={onChange}
                className="form-control form-control-pink">
                {
                    months.map(month =>
                        <option
                            key={month}
                            value={month}
                            className="text-capitalize dropdown-item"
                        >
                            {month}
                        </option>)
                }
            </select>

    }

    else if (year) {
        const years = [];
        const currentYear = new Date().getFullYear();
        for (let i = 1980; i <= parseInt(currentYear, 10); i++) {
            years.push(i)
        }

        content =
            <select
                value={year}
                name="birthYear"
                onChange={onChange}
                className="form-control form-control-pink">
                {
                    years.map(year =>
                        <option
                            key={year}
                            value={year}
                            className="dropdown-item"
                        >
                            {year}
                        </option>)
                }
            </select>
    }

    return content;
}
