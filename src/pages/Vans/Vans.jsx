import React from "react"
import { Link, useSearchParams } from 'react-router-dom'
import { getVans } from "../../api"

export default function Vans() {

    const [searchParams, setSearchParams] = useSearchParams()

    const typeFilter = searchParams.get("type")

    const [vans, setVans] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVans()
                setVans(data)
            } catch(err) {
                console.log("There was an error!")
                setError(err)
            } finally {
                setLoading(false)
            }                  
        }       
        loadVans()
    }, [])

    const displayedVans = typeFilter
    ? vans.filter(van => van.type == typeFilter)
    : vans

    const vanElements = displayedVans.map(van => (
        
            <div key={van.id} className="van-tile">
                <Link 
                    to={`/vans/${van.id}`} 
                    state={{ search: `?${searchParams.toString()}` }}
                    aria-label = {`View details for${van.name}, priced at $${van.price} per day`}
                >
                    <img src={van.imageUrl} />
                        <div className="van-info">
                            <h3>{van.name}</h3>
                            <p>${van.price}<span>/day</span></p>
                        </div>
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                </Link>
            </div>
       
    ))

    if(loading){
        return <h1 aria-live="polite">Loading...</h1>
    }

    if (error) {
        return <h1 aria-live="assertive">There was an error: {error.message}</h1>
    }

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">
                <button 
                    className={`${typeFilter === 'simple' ? 'selected': null} van-type simple`}
                    onClick= {() => setSearchParams({type: "simple"})}
                >
                    Simple
                </button>
                <button 
                    className={`${typeFilter === 'rugged' ? 'selected': null}  van-type rugged`}
                    onClick= {() => setSearchParams({type: "rugged"})}
                >   
                    Rugged
                </button>
                <button 
                    className={`${typeFilter === 'luxury' ? 'selected': null}  van-type luxury` }
                    onClick= {() => setSearchParams({type: "luxury"})}
                >
                    Luxury
                </button>
                { typeFilter && <button className="van-type clear-filters" onClick= {() => setSearchParams({})}>Clear filters</button>}
            </div>
            <div className="van-list">
                {vanElements}
            </div>
        </div>
    )
}