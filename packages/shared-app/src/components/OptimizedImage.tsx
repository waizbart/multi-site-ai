import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
    src: string
    alt: string
    width?: number
    height?: number
    className?: string
    priority?: boolean
    fill?: boolean
    sizes?: string
    placeholder?: 'blur' | 'empty'
    blurDataURL?: string
}

export function OptimizedImage({
    src,
    alt,
    width,
    height,
    className = '',
    priority = false,
    fill = false,
    sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    placeholder = 'empty',
    blurDataURL
}: OptimizedImageProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    
    if (hasError) {
        return (
            <div 
                className={`bg-gray-200 dark:bg-gray-800 flex items-center justify-center ${className}`}
                style={{ width, height }}
            >
                <span className="text-gray-500 text-sm">Imagem não disponível</span>
            </div>
        )
    }
    
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                fill={fill}
                sizes={sizes}
                priority={priority}
                placeholder={placeholder}
                blurDataURL={blurDataURL}
                loading={priority ? 'eager' : 'lazy'}
                className={`transition-opacity duration-300 ${
                    isLoading ? 'opacity-0' : 'opacity-100'
                } ${fill ? 'object-cover' : ''}`}
                onLoad={() => setIsLoading(false)}
                onError={() => setHasError(true)}
                quality={85}
            />
            {isLoading && (
                <div 
                    className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse"
                    style={{ width, height }}
                />
            )}
        </div>
    )
}