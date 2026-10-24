import { useState , useEffect } from 'react'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems]             = useState([]);
  const [totalPages, setTotalPages]   = useState(1);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);

  const itemPerPage = 10;

  useEffect(()=>{
    setLoading(true);
    setError(null);

        fetch(`https://fakestoreapi.com/products`)
        .then((res) => res.json())
        .then((data) => {
          setItems(data)
          setTotalPages(1)
        })
        .catch((err)=>{setError("Data can't be Loaded!")})
        .finally(()=>{setLoading(false)})
  },[])        // yaha currentPage ki need nhi bcz API always gives same data 

  if(loading) return <p>Loading...</p>
  if(error) return <p>{error}</p>

  const TotalPages = Math.ceil(items.length / itemPerPage)
  const startIndex = (currentPage - 1) * itemPerPage;
  const PaginatefItems = items.slice(startIndex , startIndex + itemPerPage)

  return (
    <div>
      {items.map((item)=>{
       return  <div key={item.id}>{item.title}</div>
      })}

      <button
      disabled = {currentPage == 1}
      onClick = { () => setCurrentPage((p) => p - 1)} > Previous </button>

      <span> Page {currentPage} of {totalPages} </span>

      <button 
      disabled = {currentPage == totalPages}
      onClick={ () => setCurrentPage((p) => p + 1)}> Next </button>
    </div>
  )
}

export default App
  