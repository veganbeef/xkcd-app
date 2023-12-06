"use client";
import Head from 'next/head';
import Comic from './components/Comic';
import {useEffect, useState} from "react";

const BASE_URL = 'http://localhost:8000/api/comics/'

const HomePage = () => {
  const [comics, setComics] = useState([]);
  const [random, setRandom] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleRandomClick = () => {
    setCurrentPage(1);
    setRandom(true);
    fetchComics(true);
  }

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    setRandom(false);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
    setRandom(false);
  };

  const fetchComics = async (random = false) => {
    try {
      const url = random
        ? BASE_URL + 'random/'
        : `${BASE_URL}?page=${currentPage}${searchTerm.length ? `&search=${searchTerm}` : ''}`;
      const response = await fetch(url);
      const data = await response.json();

      if (random) {
        setComics(data);
      } else {
        setComics(data.results);
        setTotalPages(data.total_pages);
      }
    } catch (error) {
      console.error('error fetching comics: ', error);
      setComics([]);
    }
  }

  useEffect(() => {
    fetchComics();
  }, []);

  useEffect(() => {
    fetchComics();
  }, [searchTerm, currentPage]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Head>
        <title>XKCD Viewer</title>
      </Head>
      <header className="bg-blue-500 p-4 text-white">
        <h1 className="text-2xl font-bold">XKCD Viewer</h1>
      </header>
      <main className="container mx-auto p-4 flex-grow">
        <Comic comics={comics} />
        <div className="mt-4 flex items-center">
          <div className="mt-4 p-4">
            <button
              onClick={handleRandomClick}
              className="bg-blue-500 text-white px-2 py-1 rounded-md"
            >
              Get Random Comics
            </button>
          </div>
          <div className="mt-4 w-50">
            <input
              type="text"
              placeholder="Search by title, alt-text, or upload date"
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-400 rounded-md p-2 w-100"
            />
          </div>
          <div className="ml-auto flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || random}
              className={`${
                  currentPage === 1 || random ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              } text-white px-2 py-1 rounded-md`}
            >
              &lt;
            </button>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              disabled={random}
              onChange={event => handlePageChange(Number(event.target.value))}
              className="border border-gray-400 rounded-md p-2 w-12 text-center"
            />
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || random}
              className={`${
                  currentPage === totalPages || random ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              } text-white px-2 py-1 rounded-md`}
            >
              &gt;
            </button>
          </div>
        </div>
      </main>
      <footer className="bg-blue-500 p-4 text-white text-right">
        <a href="https://github.com/veganbeef" className="text-sm">
          github.com/veganbeef
        </a>
      </footer>
    </div>
  );
};

export default HomePage;