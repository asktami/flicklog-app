import React from 'react';
import './Pagination.css';

const Pagination = ({
	handleChangePage,
	currentPage,
	totalPages,
	loadMore,
}) => {
	const pageNumbers = [];

	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	return (
		<section>
			<ul className="pagination">
				{totalPages && currentPage !== 1 ? (
					<li>
						<button
							onClick={() => handleChangePage(currentPage - 1)}
							className="page-link"
						>
							«
						</button>
					</li>
				) : null}
				{pageNumbers.map((nbr) => (
					<li key={nbr}>
						<button
							onClick={() => handleChangePage(nbr)}
							className={`page-link ${currentPage === nbr ? ' active' : ''}`}
						>
							{nbr}
						</button>
					</li>
				))}
				{pageNumbers.length && currentPage !== pageNumbers.length ? (
					<li>
						<button
							onClick={() => handleChangePage(currentPage + 1)}
							className="page-link"
						>
							»
						</button>
					</li>
				) : null}
			</ul>
		</section>
	);
};

export default Pagination;
