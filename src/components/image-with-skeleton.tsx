"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type ImageProps } from "next/image";

/**
 * Pengganti next/image polos untuk gambar besar (foto hero, foto tentang,
 * kartu portofolio) -- menampilkan placeholder pulse selagi gambar dimuat,
 * lalu fade-in begitu selesai. Parent WAJIB `position: relative` (atau
 * `absolute`) karena skeleton-nya `absolute inset-0`.
 *
 * Cek `img.complete` di effect: kalau gambar sudah ada di cache browser,
 * event `onLoad` bisa terlewat karena sempat selesai sebelum handler
 * terpasang -- tanpa ini skeleton-nya bisa nyangkut selamanya.
 */
export function ImageWithSkeleton({ className = "", onLoad, alt, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-muted transition-opacity duration-300 ${
          loaded ? "opacity-0" : "animate-pulse opacity-100"
        }`}
      />
      <Image
        {...props}
        alt={alt}
        ref={imgRef}
        className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
      />
    </>
  );
}
