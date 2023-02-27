
function Pagination(props) {
  const totalPages = Math.ceil(props.total/10)
  const prev = (
    <button
      data-testid="prev-page"
      disabled={props.page <= 1}
      onClick={()=>props.setPage(props.page - 1)}
    >
      Prev
    </button>
  );
  const currentPage = <button data-testid="current-page">{props.page}</button>;
  const next = (
    <button
      data-testid="next-page"
      disabled={props.page == totalPages}
      onClick={()=>props.setPage(props.page + 1)}
    >
      Next
    </button>
  );
  return (
  <div data-testid="page-container">
      <div>
      {prev}
      {currentPage}
      {next}
      </div>
      <div>
        Total Pages: <b data-testid="total-pages">{totalPages}</b>
      </div>
    </div>
  );
}

export default Pagination;
