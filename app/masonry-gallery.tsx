/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LoadingImage } from "./loading-image";

type MasonryGalleryItem = {
  alt: string;
  aspectRatio?: number;
  href?: string;
  height?: number;
  src: string;
  width?: number;
};

type MasonryGalleryProps = {
  ariaLabel: string;
  className?: string;
  items: MasonryGalleryItem[];
};

type IndexedGalleryItem = MasonryGalleryItem & {
  index: number;
};

type JustifiedRow = {
  height: number;
  items: IndexedGalleryItem[];
};

const fallbackRatio = 1.45;
const gap = 10;
const maxItemsPerRow = 3;

function getImageRatio(image: HTMLImageElement) {
  const ratio = image.naturalWidth / image.naturalHeight;

  return Number.isFinite(ratio) && ratio > 0 ? ratio : null;
}

function getItemRatio(item: MasonryGalleryItem) {
  const ratio =
    item.aspectRatio ??
    (item.width && item.height && item.width > 0 && item.height > 0 ? item.width / item.height : undefined);

  return ratio && Number.isFinite(ratio) && ratio > 0 ? ratio : null;
}

function getTargetHeight(containerWidth: number, className: string) {
  if (containerWidth < 700) {
    return 300;
  }

  return className.includes("nadon-home-masonry") ? 315 : 270;
}

function buildJustifiedRows(
  items: IndexedGalleryItem[],
  ratios: Record<string, number>,
  containerWidth: number,
  targetHeight: number
) {
  if (containerWidth <= 0) {
    return [];
  }

  const rows: JustifiedRow[] = [];
  let rowItems: IndexedGalleryItem[] = [];
  let rowRatio = 0;

  items.forEach((item) => {
    const ratio = ratios[item.src] ?? fallbackRatio;

    rowItems.push(item);
    rowRatio += ratio;

    const rowGap = gap * Math.max(0, rowItems.length - 1);
    if (rowItems.length >= maxItemsPerRow || rowRatio * targetHeight + rowGap >= containerWidth) {
      rows.push({
        height: (containerWidth - rowGap) / rowRatio,
        items: rowItems
      });
      rowItems = [];
      rowRatio = 0;
    }
  });

  if (rowItems.length > 0) {
    const rowGap = gap * Math.max(0, rowItems.length - 1);
    rows.push({
      height: (containerWidth - rowGap) / rowRatio,
      items: rowItems
    });
  }

  return rows;
}

export function MasonryGallery({ ariaLabel, className = "", items: sourceItems }: MasonryGalleryProps) {
  const [mobile,setMobile]=useState(false);
  const items=useMemo(()=>mobile && className.includes('nadon-home-masonry') ? sourceItems.slice(0,Math.ceil(sourceItems.length/2)) : sourceItems,[sourceItems,mobile,className]);
  useEffect(()=>{
    const media=window.matchMedia('(max-width:640px)');
    const update=()=>{setMobile(media.matches);setSelected(null);};
    update();media.addEventListener('change',update);
    return()=>media.removeEventListener('change',update);
  },[]);
  const galleryRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected,setSelected]=useState<number|null>(null);
  const lastTrigger=useRef<HTMLButtonElement|null>(null);
  useEffect(()=>{
    if(selected===null)return;
    const dialog=dialogRef.current;if(!dialog)return;
    dialog.showModal();
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow="hidden";
    return()=>{dialog.close();document.body.style.overflow=previousOverflow;lastTrigger.current?.focus({preventScroll:true});};
  },[selected!==null]);
  const close=()=>setSelected(null);
  const move=(offset:number)=>setSelected(current=>current===null?null:(current+offset+items.length)%items.length);
  const [containerWidth, setContainerWidth] = useState(0);
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const indexedItems = useMemo(() => items.map((item, index) => ({ ...item, index })), [items]);
  const itemRatios = useMemo(
    () =>
      indexedItems.reduce<Record<string, number>>((nextRatios, item) => {
        const ratio = getItemRatio(item);

        if (ratio) {
          nextRatios[item.src] = ratio;
        }

        return nextRatios;
      }, {}),
    [indexedItems]
  );
  const targetHeight = getTargetHeight(containerWidth, className);
  const resolvedRatios = useMemo(() => ({ ...itemRatios, ...ratios }), [itemRatios, ratios]);
  const rows = useMemo(
    () => buildJustifiedRows(indexedItems, resolvedRatios, containerWidth, targetHeight),
    [containerWidth, indexedItems, resolvedRatios, targetHeight]
  );

  useEffect(() => {
    const gallery = galleryRef.current;

    if (!gallery) {
      return;
    }

    const updateWidth = () => setContainerWidth(gallery.clientWidth);
    const resizeObserver = new ResizeObserver(updateWidth);

    updateWidth();
    resizeObserver.observe(gallery);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    let isCurrent = true;

    indexedItems.forEach((item) => {
      if (resolvedRatios[item.src]) {
        return;
      }

      const image = new Image();
      image.onload = () => {
        if (!isCurrent) {
          return;
        }

        const nextRatio = getImageRatio(image);

        if (!nextRatio) {
          return;
        }

        setRatios((currentRatios) => {
          if (currentRatios[item.src] === nextRatio) {
            return currentRatios;
          }

          return { ...currentRatios, [item.src]: nextRatio };
        });
      };
      image.src = item.src;
    });

    return () => {
      isCurrent = false;
    };
  }, [indexedItems, resolvedRatios]);

  return (
    <div className={`nadon-masonry ${className}`.trim()} aria-label={ariaLabel} ref={galleryRef}>
      {rows.length === 0 && (
        <div className="nadon-masonry-skeleton" aria-hidden="true">
          {Array.from({ length: 3 }).map((_, rowIndex) => (
            <div className="nadon-masonry-row nadon-masonry-skeleton-row" key={`skeleton-row-${rowIndex}`}>
              {Array.from({ length: 3 }).map((__, itemIndex) => (
                <span className="nadon-masonry-item nadon-masonry-skeleton-item" key={`skeleton-${rowIndex}-${itemIndex}`} />
              ))}
            </div>
          ))}
        </div>
      )}
      {rows.map((row, rowIndex) => (
        <div className="nadon-masonry-row" key={`row-${rowIndex}`} style={{ height: row.height }}>
          {row.items.map((item) => {
            const ratio = resolvedRatios[item.src] ?? fallbackRatio;
            const image = (
              <LoadingImage
                src={item.src}
                alt={item.alt}
                height={item.height}
                loading={item.index < 9 ? "eager" : "lazy"}
                width={item.width}
                onLoad={(event) => {
                  const imageElement = event.currentTarget;
                  const nextRatio = getImageRatio(imageElement);

                  if (!nextRatio) {
                    return;
                  }

                  setRatios((currentRatios) => {
                    if (currentRatios[item.src] === nextRatio) {
                      return currentRatios;
                    }

                    return { ...currentRatios, [item.src]: nextRatio };
                  });
                }}
              />
            );
            const itemStyle = { width: row.height * ratio };

            if (item.href) {
              return (
                <a
                  className="nadon-masonry-item"
                  href={item.href}
                  key={`${item.src}-${item.index}`}
                  rel="noreferrer"
                  style={itemStyle}
                  target="_blank"
                >
                  {image}
                </a>
              );
            }

            return (
              <button type="button" aria-label={"View "+item.alt} onClick={e=>{lastTrigger.current=e.currentTarget;setSelected(item.index)}} className="nadon-masonry-item nadon-photo-button" key={`${item.src}-${item.index}`} style={itemStyle}>
                {image}
                </button>
            );
          })}
        </div>
      ))}
      <dialog className="nadon-lightbox" ref={dialogRef} aria-label="Photograph viewer" onCancel={close} onClick={e=>{if(e.target===e.currentTarget)close()}} onKeyDown={e=>{if(e.key==="ArrowRight"){e.preventDefault();move(1)}if(e.key==="ArrowLeft"){e.preventDefault();move(-1)}}}>
        {selected!==null&&<><header><span>NADON KLINTON / SELECTED FRAME</span><button type="button" autoFocus onClick={close}>Close</button></header><figure><img key={items[selected].src} src={items[selected].src} alt={items[selected].alt}/><figcaption>{items[selected].alt}</figcaption></figure><footer><button type="button" onClick={()=>move(-1)}>Previous</button><span aria-live="polite">{selected+1} / {items.length}</span><button type="button" onClick={()=>move(1)}>Next</button></footer></>}
      </dialog>    </div>
  );
}


