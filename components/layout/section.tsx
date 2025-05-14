import { FC, ReactNode } from "react";

type BackgroundPosition = "center" | "split" | "diagonal" | "none" | "bottom";

interface BackgroundClass { 
    primaryClass: string, 
    secondaryClass: string 
};

const CLASSES: Record<BackgroundPosition, BackgroundClass> = {
    center: {
      // both circles dead-center
      primaryClass: "shape-primary-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 lg:scale-150 scale-75",
      secondaryClass: "hidden",
    },
    split: {
      // one center-left, one center-right
      primaryClass: "shape-primary-sm top-1/2 left-0 -translate-y-1/2",
      secondaryClass: "shape-secondary-sm top-1/2 right-0 -translate-y-1/2",
    },
    diagonal: {
      // primary in the top-left corner, secondary in the bottom-right
      primaryClass: "shape-primary-md top-0 left-80 -translate-x-1/2 -translate-y-1/2",
      secondaryClass: "shape-secondary-md bottom-0 right-80 translate-x-1/2 translate-y-1/2",
    },
    bottom: {
        primaryClass: "hidden",
        secondaryClass: "shape-secondary-lg -bottom-full right-1/2 translate-x-1/2",
    },
    none: {
        primaryClass: "hidden",
        secondaryClass: "hidden"
    }
  };

interface SectionProps { 
    children: ReactNode, 
    backgroundPosition: BackgroundPosition,
    id: string
};

export const Section: FC<SectionProps> = ({ children, backgroundPosition, id }) => {
    const { primaryClass, secondaryClass } = CLASSES[backgroundPosition];

    return (
        <section id={id} className="section-container border-x-container relative overflow-hidden">
            {children}
            <div className="backdrop-blur-[100px] absolute inset-0 -z-10"/>
            <div className={`${primaryClass} opacity-10`} />
            <div className={`${secondaryClass} opacity-10`} />
        </section>
    )
}