import LoadingIndicator from "./LoadingIndicator";
import { useEffect, useState } from "react";
import styles from './CountriesCard.module.css'
import Pagination from "./Pagination";

function Countries() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCountries, setIsCountries] = useState([]);
  const [paginatedData, setPaginatedData] = useState([])
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const data = await fetch('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries')
      const countriesData = await data.json();
      setIsCountries(countriesData?.data)
    }
    fetchData();
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const filteredData = isCountries?.filter((country, i) => { if (i <= page * 10 && i > (page - 1) * 10) return country });
    setPaginatedData(filteredData)
  }, [page, isCountries])
  return (
    <> {isLoading ? <LoadingIndicator /> : <div>
      <h1 data-testid="countries-header">Countries List</h1>
      <div data-testid="countries-container">
        {paginatedData?.map((country) => {
          return <div className={styles.container} key={country.id}>
            <div>Country: <span className='medium-font'>{country.country}</span></div>
            <div>Population: <span className='medium-font'>{country.population}</span></div>
          </div>
        })}

      </div>
      <div>
        <Pagination total={isCountries?.length} page={page} setPage={setPage} />
      </div>
    </div>}
    </>
  );
}

export default Countries;
