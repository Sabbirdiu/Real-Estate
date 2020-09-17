import React, { useState,useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ListingForm from '../components/ListingForm';
import Listings from '../components/Listings'; 
import Pagination from '../components/Pagination';
import axios from 'axios'
import Card from '../components/Card';
const Home = () => {
    const [listings, setListings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [listingsPerPage, setListingsPerPage] = useState(3);
    const [active, setActive] = useState(1);
    const [count, setCount] = useState(0);
    const [previous, setPrevious] = useState('');
    const [next, setNext] = useState('');

    const indexOfLastListing = currentPage * listingsPerPage;
    const indexOfFirstListing = indexOfLastListing - listingsPerPage;
    const currentListings = listings.slice(indexOfFirstListing, indexOfLastListing);

    // const visitPage = (page) => {
    //     setCurrentPage(page);
    //     setActive(page);
    // };

    // const previous_number = () => {
    //     if (currentPage !== 1) {
    //         setCurrentPage(currentPage-1);
    //         setActive(currentPage-1);
    //     }
    // };

    // const next_number = () => {
    //     if (currentPage !== Math.ceil(listings.length/3)) {
    //         setCurrentPage(currentPage+1);
    //         setActive(currentPage+1);
    //     }
    // };
    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/listings/?page=1`);

                setListings(res.data.results);
                setCount(res.data.count);
                setPrevious(res.data.previous);
                setNext(res.data.next);
            }
            catch (err) {

            }
        }

        fetchData();
    }, []);
    
    const displayListings = () => {
        let display = [];
        let result = [];

        listings.map(listing => {
            return display.push(
                <Card
                    title={listing.title}
                    address={listing.address}
                    city={listing.city}
                    state={listing.state}
                    price={listing.price}
                    sale_type={listing.sale_type}
                    home_type={listing.home_type}
                    bedrooms={listing.bedrooms}
                    bathrooms={listing.bathrooms}
                    sqft={listing.sqft}
                    photo_main={listing.photo_main}
                    slug={listing.slug}
                />
            );
        });

        for (let i = 0; i < listings.length; i += 3) {
            result.push(
                <div key={i} className='row'>
                    <div className='col-1-of-3'>
                        {display[i]}
                    </div>
                    <div className='col-1-of-3'>
                        {display[i+1] ? display[i+1] : null}
                    </div>
                    <div className='col-1-of-3'>
                        {display[i+2] ? display[i+2] : null}
                    </div>
                </div>
            );
        }

        return result;
    };

    const visitPage = (page) => {
        axios.get(`http://localhost:8000/api/listings/?page=${page}`)
        .then(res => {
            setListings(res.data.results);
            setPrevious(res.data.previous);
            setNext(res.data.next);
            setActive(page);
        })
        .catch(err => {

        });
    };

    const previous_number = () => {
        axios.get(previous)
        .then(res => {
            setListings(res.data.results);
            setPrevious(res.data.previous);
            setNext(res.data.next);
            if (previous)
                setActive(active-1);
        })
        .catch(err => {

        });
    };

    const next_number = () => {
        axios.get(next)
        .then(res => {
            setListings(res.data.results);
            setPrevious(res.data.previous);
            setNext(res.data.next);
            if (next)
                setActive(active+1);
        })
        .catch(err => {

        });
    };

    return (
        <main className='home'>
            <Helmet>
                <title>Realest Estate - Home</title>
                <meta
                    name='description'
                    content='Realest Estate Home Page'
                />
            </Helmet>
            <section className='home__form'>
                <ListingForm setListings={setListings} />
            </section>
             <section className='home__listings'>
                {/* <Listings listings={currentListings} /> */}
                {displayListings()}
            </section>
            
            <section className='listings__pagination'>
                <div className='row'>
                    <Pagination
                        itemsPerPage={6}
                        count={count}
                        visitPage={visitPage}
                        previous={previous_number}
                        next={next_number}
                        active={active}
                        setActive={setActive}
                    />
                </div>
            </section> 
         </main>
        
    
        );
};

export default Home;