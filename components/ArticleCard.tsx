import React from 'react';
import { ExternalArticle } from '../types';

interface ArticleCardProps {
  article: ExternalArticle;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-surface-light dark:bg-surface-dark rounded-lg shadow-soft hover:shadow-md-soft dark:hover:shadow-md-soft transform hover:-translate-y-1 transition-all duration-300 ease-in-out border border-border-light dark:border-border-dark"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-md font-semibold text-primary dark:text-primary mb-1 leading-tight">{article.title}</h3>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full text-white ${
            article.source === 'NEJM' ? 'bg-blue-500' :
            article.source === 'Medscape' ? 'bg-green-500' :
            article.source === 'UpToDate' ? 'bg-purple-500' : 'bg-gray-500'
        }`}>
          {article.source}
        </span>
      </div>
      {article.summary && <p className="text-sm text-text-secondary-light dark:text-gray-400 mb-2 leading-relaxed line-clamp-2">{article.summary}</p>}
      <p className="text-xs text-gray-500 dark:text-gray-500">{formatDate(article.publishDate)}</p>
    </a>
  );
};

export default ArticleCard;