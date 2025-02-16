"use client";

import NextImage, { ImageProps as NextImageProps } from "next/image";
import { useState } from "react";

interface ImageProps extends NextImageProps {
  fallback?: string;
}

export function Image({ fallback = "/assets/hospitals/default.jpg", ...props }: ImageProps) {
  const [error, setError] = useState(false);

  return (
    <NextImage
      {...props}
      src={error ? fallback : props.src}
      onError={() => setError(true)}
    />
  );
} 