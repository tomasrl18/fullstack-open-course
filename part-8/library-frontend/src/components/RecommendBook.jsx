/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { CURRENT_USER, ALL_BOOKS } from "../queries";

import '../styles/recommend-book.css'

const RecommendBook = ({ show }) => {
    const [genre, setGenre] = useState("");
    const { data, loading, error } = useQuery(CURRENT_USER, {
        skip: !localStorage.getItem("library-user-token"),
    });
    
    useEffect(() => {
        if (data && data.me) {
            setGenre(data.me.favoriteGenre);
        }
    }, [data]);
    
    const data_books = useQuery(ALL_BOOKS, {
        variables: { genre: genre }
    })

    if (loading) return <p className="loading">Loading...</p>;

    if (error) return <p className="loading">Error: {error.message}</p>;

    if (!show) return null

    const books = data_books.data.allBooks
    
    return (
        <div className="recommendations-container">
            <h2 className="recommendations-title">Recommendations</h2>
            <p>Books in your favorite genre: <strong>{genre.charAt(0).toUpperCase() + genre.slice(1)}</strong></p>
            <table className="recommendations-table">
                <tbody>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published</th>
                    </tr>
                    {books.map((book => (
                        <tr key={book.title}>
                            <td>{book.title}</td>
                            <td>{book.author.name}</td>
                            <td>{book.published}</td>
                        </tr>
                    )))}
                </tbody>
            </table>
        </div>
    )
}

export default RecommendBook