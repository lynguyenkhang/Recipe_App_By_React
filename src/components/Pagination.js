import React from 'react';
import './Pagination.css';
import classNames from 'classnames';


const Pagination = ({ updatePage, page }) => {
    let orginalPage = page;
    page = (page < 3) ? 3 : page;
    page = (page > 5) ? 5 : page;

    let prevArrow = (orginalPage - 1 > 0) ? orginalPage - 1 : 1 ;
    let nextArrow = (orginalPage + 1 <= 7) ? orginalPage + 1 : 7;

    return(
        <ul className="Pagination">
            <li onClick={() => updatePage(prevArrow)}>
                <span className="material-icons rotate360">
                    chevron_right
                </span>
            </li>

            <li href="#" onClick={() => updatePage(page - 2)} className={classNames({"pageActive" : orginalPage === 1})}>
                    {page - 2}
            </li>

            <li onClick={() => updatePage(page - 1)} className={classNames({"pageActive" : orginalPage === 2})}>
                {page - 1}
            </li>

            <li onClick={() => updatePage(page)} className={classNames({"pageActive" : orginalPage === page})}>
                {page}
            </li>

            <li onClick={() => updatePage(page + 1)} className={classNames({"pageActive" : orginalPage === 6})}>
                {page + 1}
            </li>

            <li onClick={() => updatePage(page + 2)} className={classNames({"pageActive" : orginalPage === 7})}>
                {page + 2}
            </li>

            <li onClick={() => updatePage(nextArrow)}>
                <span className="material-icons">
                    chevron_right
                </span>
            </li>
        </ul>
    )
}



export default Pagination;