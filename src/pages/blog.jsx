import React from "react";
import '../styles/blog.css';
import '../componentes/NavBar.jsx';

const articles = [
  {
    title: "Dulzura y sofisticación",
    content: "Imagina un sueño que comienza en las cálidas y dulces notas florales de la vainilla, una flor exótica que se asocia con la suavidad y la sensualidad. La vainilla es originaria de México, siendo u...",
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cosmopolitan.com%2Fes%2Fbelleza%2Fnovedades-belleza%2Fg43828868%2Fmejores-perfumes-vainilla-mujer%2F&psig=AOvVaw3zEOb66e1fcrlyKTiXlF5g&ust=1741122156166000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPDh39Ln7osDFQAAAAAdAAAAABAE"
  },
  {
    title: "Nuevos Propósitos Olfativos para el 2025",
    content: "Queremos mostrarte nuestra selección de aromas para este nuevo año",
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Felpais.com%2Fsmoda%2Fbelleza%2F11-fragancias-para-ser-la-reina-de-la-fiesta.html&psig=AOvVaw0g6miR1hh36RJE2jPgFeAD&ust=1741122419235000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNDwrM3o7osDFQAAAAAdAAAAABAE"
  },
  {
    title: "Florales: El aroma de la naturaleza",
    content: "Descubre el aroma que despierta tus sentidos y revela lo más profundo de tu ser.",
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2F-%2Fes%2FFloral-Perfume-floral-Parfum-l%25C3%25ADquidas%2Fdp%2FB0CL8YYDVF&psig=AOvVaw1wGyTvkqF-Vi36idTU6aKx&ust=1741122243058000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKDsi_nn7osDFQAAAAAdAAAAABAZ"
  }
];

const Blog = () => {
  return (
    <div className="container">
      <h1 className="title">Blog de Perfumería</h1>
      <div className="articles-grid">
        {articles.map((article, index) => (
          <div key={index} className="article">
            <img src={article.image} alt={article.title} className="article-image" />
            <h2 className="article-title">{article.title}</h2>
            <p className="article-content">{article.content}</p>
            <a href="#" className="read-more">Leer más</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;