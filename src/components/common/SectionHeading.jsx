import React from 'react';
import Badge from './Badge';

export default function SectionHeading({
  badge,
  title,
  highlight,
  description,
  align = 'left',
  className = '',
}) {
  const isCenter = align === 'center';

  return (
    <div className={`space-y-4 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'} ${className}`}>
      {badge && (
        <div>
          <Badge>{badge}</Badge>
        </div>
      )}
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-[1.15]">
        {title}{' '}
        {highlight && (
          <span className="text-gradient-red block sm:inline">
            {highlight}
          </span>
        )}
      </h2>
      {description && (
        <p className="text-base text-gray-400 sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
